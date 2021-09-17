import {IFavouriteMovieModel} from "./../interfaces/FavouriteMovie";
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
import {IUserModel} from "../interfaces/User";

/**
 * Body запроса для сервиса authUser.
 *
 * @prop {string} email Электронная почта.
 * @prop {string} password Пароль.
 */
export interface IAuthUserRequestBody {
    email: string;
    password: string;
}

/**
 * Body ответа для сервиса authUser.
 *
 * @prop {string} userId Электронная почта.
 * @prop {string} username Имя пользователя.
 * @prop {string} email Электронная почта.
 * @prop {string} isAdmin Признак является ли пользователь админом.
 * @prop {string} token Токен.
 * @prop {string} years Массив лет, в которых у пользователя есть записи.
 * @prop {IFavouriteMovieModel[]} favouriteMovies Массив любимых фильмов.
 */
export interface IAuthUserResponseBody {
    userId: string;
    username: string;
    email: string;
    isAdmin: boolean;
    token: string;
    years: string[];
    favouriteMovies: IFavouriteMovieModel[];
}

/**
 * @desc    Авторизация пользователя и создание токена.
 * @route   POST /api/user/login.
 * @access  Public
 */
const authUser = asyncHandler(
    async (req: Request<{}, {}, IAuthUserRequestBody>, res: Response<IAuthUserResponseBody>) => {
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
            const groupedRecordsByYears = groupBy(records, (r) =>
                new Date(r.viewdate).getFullYear()
            );
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
    }
);

/**
 * Body запроса для сервиса registerUser.
 *
 * @prop {string} email Электронная почта.
 * @prop {string} password Пароль.
 * @prop {string} username Имя пользователя.
 */
export interface IRegisterUserRequestBody {
    email: string;
    password: string;
    username: string;
}

/**
 * Body ответа для сервиса registerUser.
 *
 * @prop {string} userId Электронная почта.
 * @prop {string} username Имя пользователя.
 * @prop {string} email Электронная почта.
 * @prop {string} isAdmin Признак является ли пользователь админом.
 * @prop {string} token Токен.
 * @prop {string} years Массив лет, в которых у пользователя есть записи.
 * @prop {IFavouriteMovieModel[]} favouriteMovies Массив любимых фильмов.
 */
export interface IRegisterUserResponseBody {
    userId: string;
    username: string;
    email: string;
    isAdmin: boolean;
    token: string;
    years: string[];
}

/**
 * @desc    Регистрация нового пользователя.
 * @route   POST /api/user.
 * @access  Public
 */
const registerUser = asyncHandler(
    async (
        req: Request<{}, {}, IRegisterUserRequestBody>,
        res: Response<IRegisterUserResponseBody>
    ) => {
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
    }
);

/**
 * Query параметры запроса для сервиса getUsers.
 *
 * @prop {string} [userId] Идентификатор пользователя
 */
export interface IGetUserProfileQueryParams {
    userId?: string;
}

/**
 * Body ответа для сервиса getUsers.
 *
 * @prop {string} [email] Электронная почта.
 * @prop {string} [password] Пароль.
 * @prop {string} [username] Имя пользователя.
 * @prop {IFavouriteMovieModel[]} [favouriteMovies] Массив любимых фильмов.
 */
export interface IGetUserProfileResponseBody {
    userId: string;
    username: string;
    email: string;
    isAdmin: boolean;
    years: string[];
    favouriteMovies: IFavouriteMovieModel[];
}

/**
 * @desc    Получить данные пользователя (профиль).
 * @route   GET /api/user/profile.
 * @access  Private
 */
const getUserProfile = asyncHandler(
    async (
        req: Request<{}, {}, {}, IGetUserProfileQueryParams>,
        res: Response<IGetUserProfileResponseBody>
    ) => {
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
    }
);

/**
 * Body запроса для сервиса updateUserProfileUser.
 *
 * @prop {string} [email] Электронная почта.
 * @prop {string} [password] Пароль.
 * @prop {string} [username] Имя пользователя.
 * @prop {IFavouriteMovieModel[]} [favouriteMovies] Массив любимых фильмов.
 */
export interface IUpdateUserProfileRequestBody {
    email?: string;
    password?: string;
    username?: string;
    favouriteMovies?: IFavouriteMovieModel[];
}

/**
 * Body ответа для сервиса updateUserProfileUser.
 */
export interface IUpdateUserProfileResponseBody extends IUserModel {}

/**
 * @desc    Изменить данные пользователя (профиль).
 * @route   PUT /api/user/profile.
 * @access  Private
 */
const updateUserProfile = asyncHandler(
    async (
        req: Request<{}, {}, IUpdateUserProfileRequestBody>,
        res: Response<IUpdateUserProfileResponseBody>
    ) => {
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
            // TODO: Не возвращать пароль.
            res.json(updatedUser);
        } else {
            res.status(401);
            throw new Error("User not found");
        }
    }
);

/**
 * Query параметры запроса для сервиса getUsers.
 *
 * @prop {string} [limit] Количество записей на запрос
 * @prop {string} [page] Номер страницы.
 * @prop {string} [userId] Идентификатор пользователя
 */
export interface IGetUsersQueryParams {
    limit?: number;
    page?: number;
    userId?: string;
}

/**
 * Body ответа для сервиса getUsers.
 *
 * @prop {string} [email] Электронная почта.
 * @prop {string} [password] Пароль.
 * @prop {string} [username] Имя пользователя.
 * @prop {IFavouriteMovieModel[]} [favouriteMovies] Массив любимых фильмов.
 */
export interface IGetUsersResponseBody {
    items: IUserModel[];
    total: number;
    page: number;
    limit: number;
    hasNext: boolean;
}

/**
 * @desc    Получить список пользователей.
 * @route   GET /api/user.
 * @access  Private
 */
const getUsers = asyncHandler(
    async (
        req: Request<{}, {}, {}, IGetUsersQueryParams>,
        res: Response<IGetUsersResponseBody>
    ) => {
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

        res.json({
            items: users,
            total,
            page,
            limit,
            hasNext: total - limit * (page + 1) > 0,
        });
    }
);

export {authUser, registerUser, getUserProfile, updateUserProfile, getUsers};
