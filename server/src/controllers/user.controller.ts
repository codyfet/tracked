import {Request, Response} from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import bcrypt from "bcryptjs";
import {createToken} from "../utils/tokenUtils";

/**
 * @desc    Авторизация пользователя и создание токена.
 * @route   POST /api/user/login.
 * @access  Public
 */
const authUser = asyncHandler(async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            userId: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: createToken(user._id),
            // years,
            // favouriteMovies: user.favouriteMovies,
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
            // years,
            // favouriteMovies: user.favouriteMovies,
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

    if (user) {
        res.json({
            userId: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error("User not found");
    }
});

export {authUser, registerUser, getUserProfile};
