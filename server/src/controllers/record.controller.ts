import {RecordModel} from "../models/Record";
import {Request, Response} from "express";
import {FilterQuery} from "mongoose";
import {IRecordDocument} from "../interfaces/Record";
import asyncHandler from "express-async-handler";

/**
 * @desc    Возвращает список записей.
 * @route   GET /api/record.
 * @access  Public
 */
const getRecords = asyncHandler(async (req: Request, res: Response) => {
    const filter: FilterQuery<IRecordDocument> = {
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
});

export {getRecords};
