import { Router } from "express";

import {
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resetPasswordController,
} from "../controllers/users.js";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);

router.get("/reset-password/:token", resetPasswordController);

router.get("/logout", logoutController);

export default router;
