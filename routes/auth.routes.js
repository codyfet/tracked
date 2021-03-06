const _ = require("lodash");
const {Router} = require("express");
const bcrypt = require("bcryptjs");
const {createToken} = require("../utils/tokenUtils");
const {check, validationResult} = require("express-validator");

const User = require("../models/User");
const Record = require("../models/Record");



const router = new Router();

// /api/auth/register
router.post(
    "/register",
    [
        check("email", "Некорректный email").isEmail(),
        check("password", "Минимальная длина пароля 6 символов").isLength({min: 6}),
        check("username", "Введите имя пользователя").exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при регистрации"
                })
            }

            const {email, password, username} = req.body;

            const candidate = await User.findOne({email});

            if (candidate) {
                return res.status(400).json({message: "Такой пользователь уже существует"})
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email, password: hashedPassword, username});

            await user.save();

            res.status(201).json({
                token: createToken(user.id),
                userId: user.id,
                email,
                username,
                years: [],
            });
        } catch (error) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
        }
    }
);

// /api/auth/login
router.post(
    "/login",
    [
        check("email", "Введите корректный email").normalizeEmail().isEmail(),
        check("password", "Введите пароль").exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при входе в систему"
                });
            }

            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({message: "Пользователь не найден"})
            }

            const isMatched = await bcrypt.compare(password, user.password);

            if (!isMatched) {
                return res.status(400).json({message: "Неверный пароль, попробуйте снова"});
            }

            const filter = {
                userId: user.id,
            }
            const records = await Record.find(filter).exec();
            const groupedRecordsByYears = _.groupBy(records, (r) => new Date(r.viewdate).getFullYear());
            const years = Object.keys(groupedRecordsByYears).sort((a, b) => b - a);

            res.json({
                token: createToken(user.id),
                userId: user.id,
                email,
                username: user.username,
                years,
                favouriteMovies: user.favouriteMovies
            });
        } catch (error) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
        }
    });

// /api/auth/user
router.get(
    "/user",
    async (req, res) => {
        try {
            const user = await User.findById(req.query.userId).exec();

            const filter = {
                userId: user.id,
            }
            const records = await Record.find(filter).exec();
            const groupedRecordsByYears = _.groupBy(records, (r) => new Date(r.viewdate).getFullYear());
            const years = Object.keys(groupedRecordsByYears).sort((a, b) => b - a);

            res.status(201).json({
                userId: user.id,
                email: user.email,
                username: user.username,
                years,
                favouriteMovies: user.favouriteMovies
            });
        } catch (error) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
        }
    }
);

module.exports = router;