import express, {Request, Response, Router} from "express";
import {FilterQuery} from "mongoose";
import {IUserModel} from "../interfaces/User";
import User from "../models/User";

const router: Router = express.Router();

// /api/users
router.get("/", async (req: Request, res: Response) => {
    try {
        const filter: FilterQuery<IUserModel> = {};
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

module.exports = router;
