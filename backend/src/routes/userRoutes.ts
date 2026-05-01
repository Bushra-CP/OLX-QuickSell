import express from "express";
import { signupController } from "../container/userDependency/signupDependency.js";
import { loginController } from "../container/userDependency/loginDependency.js";
import { refreshTokenController } from "../controllers/authController/refreshTokenController.js";
import { logout } from "../controllers/userController.ts/logoutController.js";
const router = express.Router();

router.post("/signup", signupController.signup);

router.post("/login", loginController.login);

router.post("/logout", logout);

router.post("/refreshToken", refreshTokenController);

export default router;
