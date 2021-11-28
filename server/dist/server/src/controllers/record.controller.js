"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecords = exports.updateRecord = exports.deleteRecord = exports.createRecord = exports.getRecords = void 0;
const Record_1 = require("../models/Record");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const async_1 = __importDefault(require("async"));
/**
 * @desc    Возвращает список записей.
 * @route   GET /api/record.
 * @access  Public
 */
const getRecords = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        userId: req.query.userId,
        viewdate: {
            $gte: new Date(req.query.year ? +req.query.year : 0, 0, 1),
            $lt: new Date(req.query.year ? +req.query.year : 0, 11, 31),
        },
    };
    if (req.query.types) {
        filter.type = { $in: req.query.types };
    }
    const records = yield Record_1.RecordModel.find(filter).sort(req.query.sortBy).exec();
    if (records) {
        // res.status(401);
        // throw new Error("Not Authorized");
        res.status(201).json(records);
    }
    else {
        /**
         * Достаточно просто выкинуть ошибку и asyncHandler прокинет ее в кастомную middleware (см. errorMiddleware),
         * которая отправит ошибку на ui в формате json. По дефолту отправится 500 ошибка, если нужно переопределить номер,
         * то достаточно добавить перед выкидыванием ошибки
         * res.status(404).
         */
        throw new Error("Что-то пошло не так...");
    }
}));
exports.getRecords = getRecords;
/**
 * @desc    Создает запись.
 * @route   POST /api/record.
 * @access  Private
 */
const createRecord = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const record = new Record_1.RecordModel(req.body);
    const result = yield record.save();
    /**
     * Сохраняем record и в модели User.
     */
    const user = yield User_1.default.findOne({ _id: record.userId });
    if (user) {
        user === null || user === void 0 ? void 0 : user.records.push(record);
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(201).json(result);
    }
    else {
        throw new Error("Не найден пользователь.");
    }
}));
exports.createRecord = createRecord;
/**
 * @desc    Удаляет запись.
 * @route   DELETE /api/record.
 * @access  Private
 */
const deleteRecord = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (yield User_1.default.findById(req.user._id))
        .populate({ path: "records" })
        .execPopulate();
    if (user) {
        user.records = user.records.filter((record) => record._id.toString() !== req.params.id);
        yield user.save();
        yield Record_1.RecordModel.findOneAndDelete({ _id: req.params.id }).exec(); // TODO: Уйти от хранения этих записей в двух местах.
        res.status(201).json({ message: "Запись успешно удалена" });
    }
}));
exports.deleteRecord = deleteRecord;
/**
 * @desc    Изменяет запись.
 * @route   PUT /api/record.
 * @access  Private
 */
const updateRecord = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield Record_1.RecordModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { useFindAndModify: false, new: true }).exec();
    // TODO: Нужно ли обновлять в массиве user.records ?
    res.status(201).json(record);
}));
exports.updateRecord = updateRecord;
/**
 * @desc    Изменяет массив записей.
 * @route   PUT /api/record/many.
 * @access  Private
 */
const updateRecords = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Единовременно обновляется только один запрос к бд.
     */
    async_1.default.eachSeries(req.body, function iteratee(item, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Record_1.RecordModel.findByIdAndUpdate(item._id, { position: item.position }, { useFindAndModify: false }).exec();
            callback();
        });
    }, function allDone(err) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!err) {
                const userId = req.body[0].userId;
                const year = new Date(req.body[0].viewdate).getFullYear();
                const filter = {
                    userId,
                    viewdate: { $gte: new Date(year, 0, 1), $lt: new Date(year, 11, 31) },
                };
                const records = yield Record_1.RecordModel.find(filter).exec();
                res.status(201).json(records);
            }
            console.log("Обновление закончено.");
            if (err) {
                console.log("Ошибка: ", err);
            }
        });
    });
}));
exports.updateRecords = updateRecords;
