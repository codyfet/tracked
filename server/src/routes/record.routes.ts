import express, {Router} from "express";
import {
    createRecord,
    deleteRecord,
    getRecords,
    updateRecord,
    updateRecords,
} from "../controllers/record.controller";
import {passportProtect} from "../middleware/authPassportMiddleware";

const router: Router = express.Router();

router.route("/").get(getRecords).post(passportProtect, createRecord);
router.route("/many").put(passportProtect, updateRecords);
router.route("/:id").delete(passportProtect, deleteRecord).put(passportProtect, updateRecord);

module.exports = router;
