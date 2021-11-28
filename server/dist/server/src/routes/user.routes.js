"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const router = express_1.default.Router();
router.route("/").post(validationMiddleware_1.validationRegister, user_controller_1.registerUser).get(authMiddleware_1.protect, user_controller_1.getUsers);
router.route("/login").post(validationMiddleware_1.validationLogin, user_controller_1.authUser);
router.route("/profile").get(authMiddleware_1.protect, user_controller_1.getUserProfile).put(authMiddleware_1.protect, user_controller_1.updateUserProfile);
module.exports = router;
