import {RecordModel} from "../models/Record";
import User from "../models/User";
import {verifyToken} from "../utils/tokenUtils";
import {NotAuthorizedError} from "../utils/errorUtils";
import jwt, {JwtPayload} from "jsonwebtoken";
import async from "async";
import express, {Request, Response, Router} from "express";
import {FilterQuery} from "mongoose";
import {IRecordModel} from "../interfaces/Record";
import asyncHandler from "express-async-handler";

const router: Router = express.Router();

// /api/record/create
router.post("/create", verifyToken, async (req: Request, res: Response) => {
    try {
        const decoded: JwtPayload = (await jwt.verify(
            req.token,
            process.env.JWT_SECRET
        )) as JwtPayload;

        if (decoded.userId !== req.body.userId) {
            throw new NotAuthorizedError();
        }

        const record = new RecordModel(req.body);
        const result = await record.save();

        /**
         * Сохраняем record и в модели User.
         */
        const user = await User.findOne({_id: record.userId});
        user?.records.push(record);
        await user?.save();

        res.status(201).json(result);
    } catch (error) {
        console.log("Error:", error.message);

        if (error.name === "TokenExpiredError") {
            res.status(403).json({message: "Сессия истекла."});
        } else if (error.name === "NotAuthorizedError") {
            res.status(403).json({message: error.message});
        } else {
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
        }
    }
});

// /api/record/:id/update
router.put("/:id/update", verifyToken, async (req: Request, res: Response) => {
    try {
        // TODO: Временно убираю, т.к. здесь эта логика не работает.
        // const decoded = await jwt.verify(req.token, process.env.JWT_SECRET);

        // if (decoded.userId !== req.body.userId) {
        //     throw new NotAuthorizedError();
        // }

        const record = await RecordModel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {useFindAndModify: false, new: true}
        ).exec();

        res.status(201).json(record);
    } catch (error) {
        console.log("Error:", error.message);

        if (error.name === "TokenExpiredError") {
            res.status(403).json({message: "Сессия истекла."});
        } else if (error.name === "NotAuthorizedError") {
            res.status(403).json({message: error.message});
        } else {
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
        }
    }
});

// Обновление массива записей.
// /api/record/update
router.put("/update", verifyToken, async (req: Request, res: Response) => {
    try {
        /**
         * Единовременно обновляется только один запрос к бд.
         */
        async.eachSeries(
            req.body,
            async function iteratee(item: IRecordModel, callback) {
                await RecordModel.findByIdAndUpdate(
                    item._id,
                    {position: item.position},
                    {useFindAndModify: false}
                ).exec();
                callback();
            },
            async function allDone(err) {
                if (!err) {
                    const userId = req.body[0].userId;
                    const year = new Date(req.body[0].viewdate).getFullYear();
                    const filter: FilterQuery<IRecordModel> = {
                        userId,
                        viewdate: {$gte: new Date(year, 0, 1), $lt: new Date(year, 11, 31)},
                    };
                    try {
                        const records = await RecordModel.find(filter).exec();
                        res.status(201).json(records);
                    } catch (errorF) {
                        res.status(403).json({message: errorF.message});
                    }
                }
                console.log("Обновление закончено.");
                if (err) {
                    console.log("Ошибка: ", err);
                }
            }
        );
    } catch (error) {
        console.log("Error:", error.message);

        if (error.name === "TokenExpiredError") {
            res.status(403).json({message: "Сессия истекла."});
        } else if (error.name === "NotAuthorizedError") {
            res.status(403).json({message: error.message});
        } else {
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
        }
    }
});

// /api/record/:id/delete
router.delete("/:id/delete", verifyToken, async (req: Request, res: Response) => {
    try {
        // TODO: Временно убираю, т.к. здесь эта логика не работает.
        // const decoded = await jwt.verify(req.token, process.env.JWT_SECRET);

        // if (decoded.userId !== req.body.userId) {
        //     throw new NotAuthorizedError();
        // }

        await RecordModel.findOneAndDelete({_id: req.params.id}).exec();

        res.status(201).json({message: "Запись успешно удалена"});
    } catch (error) {
        console.log("Error:", error.message);

        if (error.name === "TokenExpiredError") {
            res.status(403).json({message: "Сессия истекла."});
        } else if (error.name === "NotAuthorizedError") {
            res.status(403).json({message: error.message});
        } else {
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
        }
    }
});

/**
 * @desc    Возвращает список записей.
 * @route   GET /api/record.
 * @access  Public
 */
router.get(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const filter: FilterQuery<IRecordModel> = {
            userId: req.query.userId as string,
            viewdate: {
                $gte: new Date(req.query.year ? +req.query.year : 0, 0, 1),
                $lt: new Date(req.query.year ? +req.query.year : 0, 11, 31),
            },
        };

        if (req.query.types) {
            filter.type = {$in: req.query.types as string[]};
        }

        const records = await RecordModel.find(filter).sort(req.query.sortBy).exec();

        if (records) {
            // res.status(401);
            // throw new Error("Not Authorized");
            res.status(201).json(records);
        } else {
            /**
             * Достаточно просто выкинуть ошибку и asyncHandler прокинет ее в кастомную middleware (см. errorMiddleware),
             * которая отправит ошибку на ui в формате json. По дефолту отправится 500 ошибка, если нужно переопределить номер,
             * то достаточно добавить перед выкидыванием ошибки
             * res.status(404).
             */
            throw new Error("Что-то пошло не так...");
        }
    })
);

module.exports = router;
