import express, {Router} from "express";
import {
    authUser,
    getUserProfile,
    getUsers,
    registerUser,
    updateUserProfile,
    vkAuthenticateUser,
} from "../controllers/user.controller";
import {passportProtect} from "../middleware/authPassportMiddleware";
import {validationLogin, validationRegister} from "../middleware/validationMiddleware";

const router: Router = express.Router();

router.route("/").post(validationRegister, registerUser).get(passportProtect, getUsers);
router.route("/login").post(validationLogin, authUser);
router.route("/vkauthenticate").post(vkAuthenticateUser);
router
    .route("/profile")
    .get(passportProtect, getUserProfile)
    .put(passportProtect, updateUserProfile);

module.exports = router;
