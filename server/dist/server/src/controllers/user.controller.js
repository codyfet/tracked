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
exports.getUsers = exports.updateUserProfile = exports.getUserProfile = exports.registerUser = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const tokenUtils_1 = require("../utils/tokenUtils");
const groupBy_1 = __importDefault(require("lodash/groupBy"));
const Record_1 = require("../models/Record");
const express_validator_1 = require("express-validator");
const FavouriteMovie_1 = __importDefault(require("../models/FavouriteMovie"));
/**
 * @desc    Авторизация пользователя и создание токена.
 * @route   POST /api/user/login.
 * @access  Public
 */
const authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400);
        throw new Error(errors.array()[0].msg);
    }
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        const filter = {
            userId: user.id,
        };
        const records = yield Record_1.RecordModel.find(filter).exec();
        const groupedRecordsByYears = (0, groupBy_1.default)(records, (r) => new Date(r.viewdate).getFullYear());
        const years = Object.keys(groupedRecordsByYears).sort((a, b) => b.localeCompare(a));
        res.json({
            userId: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, tokenUtils_1.createToken)(user._id),
            years,
            favouriteMovies: user.favouriteMovies,
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
}));
exports.authUser = authUser;
/**
 * @desc    Регистрация нового пользователя.
 * @route   POST /api/user.
 * @access  Public
 */
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400);
        throw new Error(errors.array()[0].msg);
    }
    const { username, email, password } = req.body;
    const userExists = yield User_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = yield User_1.default.create({ username, email, password });
    if (user) {
        res.status(201).json({
            userId: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, tokenUtils_1.createToken)(user._id),
            years: [],
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}));
exports.registerUser = registerUser;
/**
 * @desc    Получить данные пользователя (профиль).
 * @route   GET /api/user/profile.
 * @access  Private
 */
const getUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(req.user._id);
    const filter = {
        userId: user === null || user === void 0 ? void 0 : user.id,
    };
    const records = yield Record_1.RecordModel.find(filter).exec();
    const groupedRecordsByYears = (0, groupBy_1.default)(records, (record) => new Date(record.viewdate).getFullYear());
    const years = Object.keys(groupedRecordsByYears).sort((a, b) => b.localeCompare(a));
    if (user) {
        res.json({
            userId: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            years,
            favouriteMovies: user === null || user === void 0 ? void 0 : user.favouriteMovies,
            image: user.image,
        });
    }
    else {
        res.status(401);
        throw new Error("User not found");
    }
}));
exports.getUserProfile = getUserProfile;
/**
 * @desc    Изменить данные пользователя (профиль).
 * @route   PUT /api/user/profile.
 * @access  Private
 */
const updateUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = yield (yield User_1.default.findById(req.user._id))
        .populate({ path: "favouriteMovies" })
        .execPopulate();
    if (user) {
        user.username = (_a = req.body.username) !== null && _a !== void 0 ? _a : user.username;
        user.email = (_b = req.body.email) !== null && _b !== void 0 ? _b : user.email;
        if (req.body.favouriteMovies) {
            const newFavouriteMovie = req.body.favouriteMovies.find((item) => !(item === null || item === void 0 ? void 0 : item._id));
            // Добавление записи.
            if (newFavouriteMovie) {
                const newDocument = yield FavouriteMovie_1.default.create(newFavouriteMovie);
                user.favouriteMovies.push(newDocument);
            }
            else {
                // Удаление записи.
                const positionDictionary = {};
                req.body.favouriteMovies.forEach((fm) => {
                    positionDictionary[fm.position] = fm;
                });
                let idToRemove;
                user.favouriteMovies.forEach((fm) => {
                    if (!positionDictionary[fm.position]) {
                        idToRemove = fm._id;
                    }
                });
                if (idToRemove) {
                    user.favouriteMovies = user.favouriteMovies.filter((fm) => fm._id !== idToRemove);
                }
            }
        }
        if (req.body.password) {
            user.password = req.body.password;
        }
        if (req.body.image) {
            user.image = req.body.image;
        }
        const updatedUser = yield user.save();
        // TODO: Возвращать тоже самое, что и остальные сервисы из этого контроллера.
        // TODO: Не возвращать пароль.
        res.json(updatedUser);
    }
    else {
        res.status(401);
        throw new Error("User not found");
    }
}));
exports.updateUserProfile = updateUserProfile;
/**
 * @desc    Получить список пользователей.
 * @route   GET /api/user.
 * @access  Private
 */
const getUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    const limit = req.query.limit ? +req.query.limit : 0;
    const page = req.query.page ? +req.query.page : 0;
    if (req.query.userId) {
        filter._id = req.query.userId;
    }
    const total = yield User_1.default.countDocuments();
    const users = yield User_1.default.find(filter)
        .skip(page * limit)
        .limit(limit)
        .select("-password -email")
        /**
         * Отключено за ненадобностью.
         */
        .populate({
        path: "favouriteMovies",
        // path: 'records',
        // select: 'viewdate -_id'
    })
        .exec();
    res.json({
        items: users,
        total,
        page,
        limit,
        hasNext: total - limit * (page + 1) > 0,
    });
}));
exports.getUsers = getUsers;
