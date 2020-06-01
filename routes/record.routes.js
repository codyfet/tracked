const {Router} = require("express");
const Record = require("../models/Record");

const router = new Router();

// /api/record/create
router.post(
    "/create",
    async (req, res) => {
        try {
            const record = new Record(req.body);

            await record.save();

            res.status(201).json({ message: "Запись успешно добавлена" });
        } catch (error) {
            console.log('Error:', error.message);

            res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    }
);

// /api/record
router.get(
    "/",
    async (req, res) => {
        try {
            const records = await Record.find({userId: req.query.userId}).exec();

            res.status(201).json(records);
        } catch (error) {
            console.log('Error:', error.message);

            res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    }
);

module.exports = router;