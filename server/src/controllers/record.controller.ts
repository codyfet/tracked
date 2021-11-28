import {IClientRecord} from "./../../../client/src/Interfaces/ClientRecord";
import {RecordModel} from "../models/Record";
import {Request, Response} from "express";
import {FilterQuery} from "mongoose";
import {IRecordDocument} from "../interfaces/Record";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import async from "async";
import {ERecordType} from "../enums";

/**
 * Query параметры запроса для сервиса getRecords.
 *
 * @prop {string} [year] Год, за который запрашиваются записи.
 * @prop {string} [userId] Идентификатор пользователя.
 * @prop {ERecordType[]} [types] Массив типов записей (movie, tvseries).
 * @prop {string} [sortBy] Параметр сортировать по (-viewdate).
 */
export interface IGetRecordsQueryParams {
    year?: number;
    userId?: string;
    types?: ERecordType[];
    sortBy?: string;
}

/**
 * Body ответа для сервиса getUsers.
 */
export type IGetRecordsResponseBody = IRecordDocument[];

/**
 * @desc    Возвращает список записей.
 * @route   GET /api/record.
 * @access  Public
 */
const getRecords = asyncHandler(
    async (
        req: Request<{}, {}, {}, IGetRecordsQueryParams>,
        res: Response<IGetRecordsResponseBody>
    ) => {
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
    }
);

/**
 * Body запроса для сервиса createRecord.
 */
export interface ICreateRecordRequestBody extends IClientRecord {}

/**
 * Body ответа для сервиса createRecord.
 */
export interface ICreateRecordResponseBody extends IRecordDocument {}

/**
 * @desc    Создает запись.
 * @route   POST /api/record.
 * @access  Private
 */
const createRecord = asyncHandler(
    async (
        req: Request<{}, {}, ICreateRecordRequestBody>,
        res: Response<ICreateRecordResponseBody>
    ) => {
        const record = new RecordModel(req.body);
        const result = await record.save();

        /**
         * Сохраняем record и в модели User.
         */
        const user = await User.findOne({_id: record.userId});

        if (user) {
            user?.records.push(record);
            await user?.save();
            res.status(201).json(result);
        } else {
            throw new Error("Не найден пользователь.");
        }
    }
);

/**
 * Параметры запроса для сервиса deleteRecord.
 *
 * @prop {string} [id] ObjectId удаляемой записи.
 */
export interface IDeleteRecordRequestParams {
    id?: string;
}

/**
 * Body ответа для сервиса deleteRecord.
 *
 * @prop {"Запись успешно удалена"} message Текст с сообщением о успешном удалении записи.
 */
export interface IDeleteRecordResponseBody {
    message: "Запись успешно удалена";
}

/**
 * @desc    Удаляет запись.
 * @route   DELETE /api/record.
 * @access  Private
 */
const deleteRecord = asyncHandler(
    async (req: Request<IDeleteRecordRequestParams>, res: Response<IDeleteRecordResponseBody>) => {
        const user = await (await User.findById(req.user._id))
            .populate({path: "records"})
            .execPopulate();

        if (user) {
            user.records = user.records.filter((record) => record._id.toString() !== req.params.id);

            await user.save();
            await RecordModel.findOneAndDelete({_id: req.params.id}).exec(); // TODO: Уйти от хранения этих записей в двух местах.

            res.status(201).json({message: "Запись успешно удалена"});
        }
    }
);

/**
 * Параметры запроса для сервиса updateRecord.
 *
 * @prop {string} [id] ObjectId изменяемой записи.
 */
export interface IUpdateRecordRequestParams {
    id?: string;
}

/**
 * Body запроса для сервиса updateRecord.
 */
export interface IUpdateRecordRequestBody {}

/**
 * Body ответа для сервиса updateRecord.
 */
export interface IUpdateRecordResponseBody extends IRecordDocument {}

/**
 * @desc    Изменяет запись.
 * @route   PUT /api/record.
 * @access  Private
 */
const updateRecord = asyncHandler(
    async (
        req: Request<IUpdateRecordRequestParams, {}, IUpdateRecordRequestBody>,
        res: Response<IUpdateRecordResponseBody>
    ) => {
        const record = await RecordModel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {useFindAndModify: false, new: true}
        ).exec();
        // TODO: Нужно ли обновлять в массиве user.records ?
        res.status(201).json(record);
    }
);

/**
 * Body запроса для сервиса updateRecords.
 */
export type IUpdateRecordsRequestBody = IRecordDocument[];

/**
 * Body ответа для сервиса updateRecords.
 */
export type IUpdateRecordsResponseBody = IRecordDocument[];

/**
 * @desc    Изменяет массив записей.
 * @route   PUT /api/record/many.
 * @access  Private
 */
const updateRecords = asyncHandler(
    async (
        req: Request<{}, {}, IUpdateRecordsRequestBody>,
        res: Response<IUpdateRecordsResponseBody>
    ) => {
        /**
         * Единовременно обновляется только один запрос к бд.
         */
        async.eachSeries(
            req.body,
            async function iteratee(item: IRecordDocument, callback) {
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
                    const filter: FilterQuery<IRecordDocument> = {
                        userId,
                        viewdate: {$gte: new Date(year, 0, 1), $lt: new Date(year, 11, 31)},
                    };
                    const records = await RecordModel.find(filter).exec();
                    res.status(201).json(records);
                }
                console.log("Обновление закончено.");
                if (err) {
                    console.log("Ошибка: ", err);
                }
            }
        );
    }
);

export {getRecords, createRecord, deleteRecord, updateRecord, updateRecords};
