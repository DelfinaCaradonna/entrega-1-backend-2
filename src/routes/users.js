import { Router } from "express";

import {
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/users.js";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);

router.get("/logout", logoutController);

export default router;
