import express, {Router} from "express";
import {
    createRecord,
    deleteRecord,
    getRecords,
    updateRecord,
    updateRecords,
} from "../controllers/record.controller";
import {protect} from "../middleware/authMiddleware";

const router: Router = express.Router();

router.route("/").get(getRecords).post(protect, createRecord);
router.route("/many").put(protect, updateRecords);
router.route("/:id").delete(protect, deleteRecord).put(protect, updateRecord);

module.exports = router;
