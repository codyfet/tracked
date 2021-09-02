import express, {Router} from "express";
import {authUser, getUserProfile} from "../controllers/user.controller";
import {protect} from "../middleware/authMiddleware";

const router: Router = express.Router();

router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
