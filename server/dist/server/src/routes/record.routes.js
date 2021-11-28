"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const record_controller_1 = require("../controllers/record.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route("/").get(record_controller_1.getRecords).post(authMiddleware_1.protect, record_controller_1.createRecord);
router.route("/many").put(authMiddleware_1.protect, record_controller_1.updateRecords);
router.route("/:id").delete(authMiddleware_1.protect, record_controller_1.deleteRecord).put(authMiddleware_1.protect, record_controller_1.updateRecord);
module.exports = router;
