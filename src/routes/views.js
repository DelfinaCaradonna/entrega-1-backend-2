import { Router } from "express";

import UserDAO from "../dao/UserDAO.js";
import { passportCall } from "../middlewares/passportAuth.js";
import { handlePolicies } from "../middlewares/handlePolicies.js";

const router = Router();

router.get("/", handlePolicies(['PUBLIC']), (req, res) => {
  const error = req.query.error;
  const reset = req.query.reset;
  res.render("login", { error, reset });
});

router.get("/register", handlePolicies(['PUBLIC']), (req, res) => {
  const error = req.query.error;
  res.render("register", { error });
});

router.get("/forgot-password", handlePolicies(['PUBLIC']), (req, res) => {
  res.render("forgot-password", {});
});

router.get("/current", passportCall("jwt"), handlePolicies(['USER', 'ADMIN']), async (req, res) => {
  const user = await UserDAO.findById(req.user.id);
  const { firstname, lastname } = user;

  res.render("products", {
    firstname,
    lastname,
  });
});

export default router;
