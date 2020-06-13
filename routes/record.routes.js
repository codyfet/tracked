const {Router} = require("express");
const Record = require("../models/Record");

const router = new Router();

// /api/record/create
router.post(
    "/create",
    async (req, res) => {
        try {
            const record = new Record(req.body);
            const result = await record.save();

            res.status(201).json(result);
        } catch (error) {
            console.log('Error:', error.message);

            res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    }
);

// /api/record/:id/update
router.put(
    "/:id/update",
    async (req, res) => {
        try {
            const record = await Record.findByIdAndUpdate(req.params.id, {$set: req.body}, {useFindAndModify: false, new: true}).exec();

            res.status(201).json(record);
        } catch (error) {
            console.log('Error:', error.message);

            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
        }
    }
);

// /api/record/:id/delete
router.delete(
    "/:id/delete",
    async (req, res) => {
        try {
            await Record.findOneAndDelete({'_id' : req.params.id}).exec();

            res.status(201).json({message: "Запись успешно удалена"});
        } catch (error) {
            console.log('Error:', error.message);

            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
        }
    }
);

// /api/record
router.get(
    "/",
    async (req, res) => {
        try {
            const filter = {
                userId: req.query.userId,
                viewdate: {"$gte": new Date(req.query.year, 0, 1), "$lt": new Date(req.query.year, 11, 31)}
            }

            if (req.query.types) {
                filter.type = {"$in": req.query.types};
            }

            const records = await Record.find(filter).sort(req.query.sortBy).exec();

            res.status(201).json(records);
        } catch (error) {
            console.log('Error:', error.message);

            res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
        }
    }
);

module.exports = router;