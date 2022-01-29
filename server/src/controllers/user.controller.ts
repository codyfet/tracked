import {IClientFavouriteMovie} from "./../../../client/src/Interfaces/ClientFavouriteMovie";
import {IFavouriteMovieDocument} from "./../interfaces/FavouriteMovie";
import {Request, Response} from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import bcrypt from "bcryptjs";
import {createToken} from "../utils/tokenUtils";
import groupBy from "lodash/groupBy";
import {RecordModel} from "../models/Record";
import {FilterQuery} from "mongoose";
import {IRecordDocument} from "../interfaces/Record";
import {validationResult} from "express-validator";
import {IUserDocument} from "../interfaces/User";
import FavouriteMovie from "../models/FavouriteMovie";

/**
 * Body запроса для сервиса vkAuthenticateUser.
 *
 * @prop {string} email Электронная почта.
 * @prop {string} password Пароль.
 */
export interface IVkAuthenticateUserRequestBody {
    vkId: number;
    username: string;
    image: string;
}

/**
 * Body ответа для сервиса vkAuthenticateUser.
 *
 * @prop {string} userId Электронная почта.
 * @prop {string} username Имя пользователя.
 * @prop {string} email Электронная почта.
 * @prop {string} isAdmin Признак является ли пользователь админом.
 * @prop {string} token Токен.
 * @prop {string} years Массив лет, в которых у пользователя есть записи.
 * @prop {string} vkId Идентификатор вконтакте.
 * @prop {string} image Путь к изображению (фото).
 * @prop {IFavouriteMovieDocument[]} favouriteMovies Массив любимых фильмов.
 */
export interface IVkAuthenticateUserResponseBody {
    userId: string;
    username: string;
    email: string;
    isAdmin: boolean;
    token: string;
    years: string[];
    vkId: number;
    image: string;
    favouriteMovies?: IFavouriteMovieDocument[];
}

const vkAuthenticateUser = asyncHandler(
    async (
        req: Request<{}, {}, IVkAuthenticateUserRequestBody>,
        res: Response<IVkAuthenticateUserResponseBody>
    ) => {
        const {vkId, username, image} = req.body;
        const existedUser = await User.findOne({vkId});

        if (existedUser) {
            const filter: FilterQuery<IRecordDocument> = {
                userId: existedUser.id,
            };
            const records = await RecordModel.find(filter).exec();
            const groupedRecordsByYears = groupBy(records, (r) =>
                new Date(r.viewdate).getFullYear()
            );
            const years = Object.keys(groupedRecordsByYears).sort((a: string, b: string) =>
                b.localeCompare(a)
            );

            res.json({
                userId: existedUser._id,
                username: existedUser.username,
                email: existedUser.email,
                isAdmin: existedUser.isAdmin,
                token: createToken(existedUser._id),
                years,
                favouriteMovies: existedUser.favouriteMovies,

                vkId: existedUser.vkId,
                image: existedUser.image,
            });
        } else {
            const createdUser = await User.create({
                vkId,
                username,
                image,
                password: "null",
                email: "null",
            });

            res.status(201).json({
                userId: createdUser._id,
                username: createdUser.username,
                email: createdUser.email,
                isAdmin: createdUser.isAdmin,
                token: createToken(createdUser._id),
                years: [],

                vkId: createdUser.vkId,
                image: createdUser.image,
            });
        }
    }
);

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
 * // TODO: Привести эту модель к соответствию с моделью ответа от регистрации и от vk аутентификации.
 *
 * @prop {string} userId Электронная почта.
 * @prop {string} username Имя пользователя.
 * @prop {string} email Электронная почта.
 * @prop {string} isAdmin Признак является ли пользователь админом.
 * @prop {string} token Токен.
 * @prop {string} years Массив лет, в которых у пользователя есть записи.
 * @prop {IFavouriteMovieDocument[]} favouriteMovies Массив любимых фильмов.
 */
export interface IAuthUserResponseBody {
    userId: string;
    username: string;
    email: string;
    isAdmin: boolean;
    token: string;
    years: string[];
    favouriteMovies: IFavouriteMovieDocument[];
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
            const filter: FilterQuery<IRecordDocument> = {
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
 * @prop {IFavouriteMovieDocument[]} favouriteMovies Массив любимых фильмов.
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
 * @prop {string} userId ID Пользователя.
 * @prop {string} username Имя пользователя.
 * @prop {string} email Электронная почта.
 * @prop {string} isAdmin Признак является ли пользователь админом (не используется).
 * @prop {string[]} years Массив лет, за которые есть записи.
 * @prop {IFavouriteMovieDocument[]} [favouriteMovies] Массив любимых фильмов.
 * @prop {string} image Изображение (аватар).
 */
export interface IGetUserProfileResponseBody {
    userId: string;
    username: string;
    email: string;
    isAdmin: boolean;
    years: string[];
    favouriteMovies: IFavouriteMovieDocument[];
    image: string;
    place: string;
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
        const filter: FilterQuery<IRecordDocument> = {
            userId: user?.id,
        };
        const records = await RecordModel.find(filter).exec();
        const groupedRecordsByYears = groupBy(records, (record: IRecordDocument) =>
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
                image: user.image,
                place: user.place,
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
 * @prop {IClientFavouriteMovie[]} [favouriteMovies] Массив любимых фильмов.
 * @prop {string[]} [image] Изображение в формате base64.
 * @prop {string} [place] Географическая локация пользователя.
 */
export interface IUpdateUserProfileRequestBody {
    email?: string;
    password?: string;
    username?: string;
    favouriteMovies?: IClientFavouriteMovie[];
    image?: string;
    place?: string;
}

/**
 * Body ответа для сервиса updateUserProfileUser.
 */
export interface IUpdateUserProfileResponseBody extends IUserDocument {}

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
        const user = await (await User.findById(req.user._id))
            .populate({path: "favouriteMovies"})
            .execPopulate();
        if (user) {
            user.username = req.body.username ?? user.username;
            user.email = req.body.email ?? user.email;
            user.place = req.body.place ?? user.place;
            user.image = req.body.image ?? user.image;
            user.password = req.body.password ?? user.password;
            if (req.body.favouriteMovies) {
                const newFavouriteMovie = req.body.favouriteMovies.find((item) => !item?._id);
                // Добавление записи.
                if (newFavouriteMovie) {
                    const newDocument = await FavouriteMovie.create(newFavouriteMovie);
                    user.favouriteMovies.push(newDocument);
                } else {
                    // Удаление записи.
                    const positionDictionary: {[position: number]: IClientFavouriteMovie} = {};
                    req.body.favouriteMovies.forEach((fm) => {
                        positionDictionary[fm.position] = fm;
                    });
                    let idToRemove: string;
                    user.favouriteMovies.forEach((fm) => {
                        if (!positionDictionary[fm.position]) {
                            idToRemove = fm._id;
                        }
                    });
                    if (idToRemove) {
                        user.favouriteMovies = user.favouriteMovies.filter(
                            (fm) => fm._id !== idToRemove
                        );
                    }
                }
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
 * @prop {IFavouriteMovieDocument[]} [favouriteMovies] Массив любимых фильмов.
 */
export interface IGetUsersResponseBody {
    items: IUserDocument[];
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
        const filter: FilterQuery<IUserDocument> = {};
        const limit: number = req.query.limit ? +req.query.limit : 0;
        const page: number = req.query.page ? +req.query.page : 0;

        if (req.query.userId) {
            filter._id = req.query.userId;
        }

        const total = await User.countDocuments();
        const users = await User.find(filter)
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
    }
);

export {vkAuthenticateUser, authUser, registerUser, getUserProfile, updateUserProfile, getUsers};
