const {Router} = require("express");
const User = require("../models/User");

const router = new Router();

// /api/users
router.get(
    "/",
    async (req, res) => {
        try {
            const filter = {};

            if (req.query.userId) {
                filter._id = req.query.userId;
            }

            const users = await User.find(filter).exec();

            res.status(201).json(users);
        } catch (error) {
            console.log('Error:', error.message);

            res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    }
);

// /api/users/:id/update
router.put(
    "/:id/update",
    async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {useFindAndModify: false, new: true}).exec();

            res.status(201).json(user);
        } catch (error) {
            console.log('Error:', error.message);

            res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    }
);

module.exports = router;