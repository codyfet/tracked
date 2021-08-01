import express, {Request, Response, Router} from "express";
import {FilterQuery} from "mongoose";
import {IUser} from "../interfaces/User";
import User from "../models/User";
import {verifyToken} from "../utils/tokenUtils";

const {NotAuthorizedError} = require("../utils/errorUtils");
const jwt = require("jsonwebtoken");
const config = require("config");

const router: Router = express.Router();

// /api/users
router.get("/", async (req: Request, res: Response) => {
    try {
        const filter: FilterQuery<IUser> = {};
        const limit: number = req.query.limit ? +req.query.limit : 0;
        const page: number = req.query.page ? +req.query.page : 0;

        if (req.query.userId) {
            filter._id = req.query.userId;
        }

        const total = await User.countDocuments();
        const users = await User.find(filter)
            .skip(page * limit)
            .limit(limit)
            /**
             * Отключено за ненадобностью.
             */
            // .populate({
            //     path: 'records',
            //     select: 'viewdate -_id'
            // })
            .exec();

        res.status(201).json({
            items: users,
            total,
            page,
            limit,
            hasNext: total - limit * (page + 1) > 0,
        });
    } catch (error) {
        console.log("Error:", error.message);

        res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
    }
});

// /api/users/:id/update
router.put("/:id/update", verifyToken, async (req: Request, res: Response) => {
    try {
        const decoded = await jwt.verify(req.token, config.get("jwtSecret"));

        if (decoded.userId !== req.params.id) {
            throw new NotAuthorizedError();
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {useFindAndModify: false, new: true}
        ).exec();
        res.status(201).json(user);
    } catch (error) {
        console.log("Error:", error);

        if (error.name === "TokenExpiredError") {
            res.status(403).json({message: "Сессия истекла."});
        } else if (error.name === "NotAuthorizedError") {
            res.status(403).json({message: error.message});
        } else {
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
        }
    }
});

module.exports = router;
