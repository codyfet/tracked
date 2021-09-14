import express, {Router} from "express";
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
} from "../controllers/user.controller";
import {protect} from "../middleware/authMiddleware";
import {validationLogin, validationRegister} from "../middleware/validationMiddleware";

const router: Router = express.Router();

router.route("/").post(validationRegister, registerUser);
router.route("/login").post(validationLogin, authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;
