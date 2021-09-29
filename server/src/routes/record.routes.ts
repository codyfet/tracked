import {RecordModel} from "../models/Record";
import {verifyToken} from "../utils/tokenUtils";
import async from "async";
import express, {Request, Response, Router} from "express";
import {FilterQuery} from "mongoose";
import {IRecordDocument} from "../interfaces/Record";
import {
    createRecord,
    deleteRecord,
    getRecords,
    updateRecord,
} from "../controllers/record.controller";
import {protect} from "../middleware/authMiddleware";

const router: Router = express.Router();

// // /api/record/:id/update
// router.put("/:id/update", verifyToken, async (req: Request, res: Response) => {
//     try {
//         // TODO: Временно убираю, т.к. здесь эта логика не работает.
//         // const decoded = await jwt.verify(req.token, process.env.JWT_SECRET);

//         // if (decoded.userId !== req.body.userId) {
//         //     throw new NotAuthorizedError();
//         // }

//         const record = await RecordModel.findByIdAndUpdate(
//             req.params.id,
//             {$set: req.body},
//             {useFindAndModify: false, new: true}
//         ).exec();

//         res.status(201).json(record);
//     } catch (error) {
//         console.log("Error:", error.message);

//         if (error.name === "TokenExpiredError") {
//             res.status(403).json({message: "Сессия истекла."});
//         } else if (error.name === "NotAuthorizedError") {
//             res.status(403).json({message: error.message});
//         } else {
//             res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
//         }
//     }
// });

// Обновление массива записей.
// /api/record/update
router.put("/update", verifyToken, async (req: Request, res: Response) => {
    try {
        /**
         * Единовременно обновляется только один запрос к бд.
         */
        async.eachSeries(
            req.body,
            async function iteratee(item: IRecordDocument, callback) {
                await RecordModel.findByIdAndUpdate(
                    item._id,
                    {position: item.position},
                    {useFindAndModify: false}
                ).exec();
                callback();
            },
            async function allDone(err) {
                if (!err) {
                    const userId = req.body[0].userId;
                    const year = new Date(req.body[0].viewdate).getFullYear();
                    const filter: FilterQuery<IRecordDocument> = {
                        userId,
                        viewdate: {$gte: new Date(year, 0, 1), $lt: new Date(year, 11, 31)},
                    };
                    try {
                        const records = await RecordModel.find(filter).exec();
                        res.status(201).json(records);
                    } catch (errorF) {
                        res.status(403).json({message: errorF.message});
                    }
                }
                console.log("Обновление закончено.");
                if (err) {
                    console.log("Ошибка: ", err);
                }
            }
        );
    } catch (error) {
        console.log("Error:", error.message);

        if (error.name === "TokenExpiredError") {
            res.status(403).json({message: "Сессия истекла."});
        } else if (error.name === "NotAuthorizedError") {
            res.status(403).json({message: error.message});
        } else {
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"});
        }
    }
});

// TODO: Сделать остальные методы через контроллер аналогично этому.
router.route("/").get(getRecords).post(protect, createRecord);
router.route("/:id").delete(protect, deleteRecord).put(protect, updateRecord);

module.exports = router;
