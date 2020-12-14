const {Router} = require("express");
const Record = require("../models/Record");
const {verifyToken} = require("../utils/tokenUtils");
const {NotAuthorizedError} = require("../utils/errorUtils");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = new Router();

// /api/record/create
router.post(
    "/create",
    verifyToken,
    async (req, res) => {
        try {
            const decoded = await jwt.verify(req.token, config.get("jwtSecret"));

            if (decoded.userId !== req.params.id) {
                throw new NotAuthorizedError();
            }

            const record = new Record(req.body);
            const result = await record.save();

            res.status(201).json(result);
        } catch (error) {
            console.log('Error:', error.message);

            if (error.name === "TokenExpiredError") {
                res.status(403).json({message: "Сессия истекла."});
            } else if (error.name === "NotAuthorizedError") {
                res.status(403).json({message: error.message});
            } else {
                res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
            }
        }
    }
);

// /api/record/:id/update
router.put(
    "/:id/update",
    verifyToken,
    async (req, res) => {
        try {
            const decoded = await jwt.verify(req.token, config.get("jwtSecret"));

            if (decoded.userId !== req.params.id) {
                throw new NotAuthorizedError();
            }

            const record = await Record.findByIdAndUpdate(req.params.id, {$set: req.body}, {useFindAndModify: false, new: true}).exec();

            res.status(201).json(record);
        } catch (error) {
            console.log('Error:', error.message);

            if (error.name === "TokenExpiredError") {
                res.status(403).json({message: "Сессия истекла."});
            } else if (error.name === "NotAuthorizedError") {
                res.status(403).json({message: error.message});
            } else {
                res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
            }
        }
    }
);

// /api/record/:id/delete
router.delete(
    "/:id/delete",
    verifyToken,
    async (req, res) => {
        try {
            const decoded = await jwt.verify(req.token, config.get("jwtSecret"));

            if (decoded.userId !== req.params.id) {
                throw new NotAuthorizedError();
            }

            await Record.findOneAndDelete({'_id' : req.params.id}).exec();

            res.status(201).json({message: "Запись успешно удалена"});
        } catch (error) {
            console.log('Error:', error.message);

            if (error.name === "TokenExpiredError") {
                res.status(403).json({message: "Сессия истекла."});
            } else if (error.name === "NotAuthorizedError") {
                res.status(403).json({message: error.message});
            } else {
                res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
            }
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