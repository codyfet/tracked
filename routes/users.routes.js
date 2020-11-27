const {Router} = require("express");
const User = require("../models/User");

const router = new Router();

// /api/users
router.get(
    "/",
    async (req, res) => {
        try {
            const users = await User.find({}).exec();

            res.status(201).json(users);
        } catch (error) {
            console.log('Error:', error.message);

            res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    }
);

module.exports = router;