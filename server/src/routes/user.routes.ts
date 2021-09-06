import express, {Router} from "express";
import {authUser, getUserProfile, registerUser} from "../controllers/user.controller";
import {protect} from "../middleware/authMiddleware";

const router: Router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
