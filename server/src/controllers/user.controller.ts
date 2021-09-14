import {Request, Response} from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import bcrypt from "bcryptjs";
import {createToken} from "../utils/tokenUtils";
import groupBy from "lodash/groupBy";
import {RecordModel} from "../models/Record";
import {FilterQuery} from "mongoose";
import {IRecordModel} from "../interfaces/Record";
import {validationResult} from "express-validator";

/**
 * @desc    Авторизация пользователя и создание токена.
 * @route   POST /api/user/login.
 * @access  Public
 */
const authUser = asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400);
        throw new Error(errors.array()[0].msg);
    }

    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
        const filter: FilterQuery<IRecordModel> = {
            userId: user.id,
        };
        const records = await RecordModel.find(filter).exec();
        const groupedRecordsByYears = groupBy(records, (r) => new Date(r.viewdate).getFullYear());
        const years = Object.keys(groupedRecordsByYears).sort((a: string, b: string) =>
            b.localeCompare(a)
        );

        res.json({
            userId: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: createToken(user._id),
            years,
            favouriteMovies: user.favouriteMovies,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

/**
 * @desc    Регистрация нового пользователя.
 * @route   POST /api/user.
 * @access  Public
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400);
        throw new Error(errors.array()[0].msg);
    }

    const {username, email, password} = req.body;

    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({username, email, password});

    if (user) {
        res.status(201).json({
            userId: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: createToken(user._id),
            years: [],
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

/**
 * @desc    Получить данные пользователя (профиль).
 * @route   GET /api/user/profile.
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id);

    const filter: FilterQuery<IRecordModel> = {
        userId: user?.id,
    };
    const records = await RecordModel.find(filter).exec();
    const groupedRecordsByYears = groupBy(records, (record: IRecordModel) =>
        new Date(record.viewdate).getFullYear()
    );
    const years = Object.keys(groupedRecordsByYears).sort((a: string, b: string) =>
        b.localeCompare(a)
    );

    if (user) {
        res.json({
            userId: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            years,
            favouriteMovies: user?.favouriteMovies,
        });
    } else {
        res.status(401);
        throw new Error("User not found");
    }
});

/**
 * @desc    Изменить данные пользователя (профиль).
 * @route   PUT /api/user/profile.
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username ?? user.username;
        user.email = req.body.email ?? user.email;
        user.favouriteMovies = req.body.favouriteMovies ?? user.favouriteMovies;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        // TODO: Возвращать тоже самое, что и остальные сервисы из этого контроллера.
        // Не возвращать пароль.
        res.json(updatedUser);
    } else {
        res.status(401);
        throw new Error("User not found");
    }
});

export {authUser, registerUser, getUserProfile, updateUserProfile};
