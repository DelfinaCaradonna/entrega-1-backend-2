import { Router } from "express";

import userModel from "../models/userModel.js";
import { passportCall } from "../middlewares/passportAuth.js";

const router = Router();

router.get("/", (req, res) => {
  const error = req.query.error;
  res.render("login", { error });
});

router.get("/register", (req, res) => {
  const error = req.query.error;
  res.render("register", { error });
});

router.get("/forgot-password", (req, res) => {
  res.render("forgot-password", {});
});

router.get("/current", passportCall("jwt"), async (req, res) => {
  const user = await userModel.findById(req.user.id).lean();
  const { firstname, lastname } = user;

  res.render("products", {
    firstname,
    lastname,
  });
});

export default router;
