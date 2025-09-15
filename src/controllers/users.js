import bcrypt from "bcrypt";

import { generateToken } from "../utils/jwt.js";
import userModel from "../models/userModel.js";

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export async function loginController(req, res) {
  const { mail, password } = req.body;

  if (!mail || !password) {
    return res.status(400).send("Todos los campos son requeridos");
  }

  const user = await userModel.findOne({ mail });

  if (!user || !isValidPassword(user, password)) {
    return res.status(401).redirect("/?error=1");
  }

  const token = generateToken(user);

  res.cookie("currentUser", token, { httpOnly: true, signed: true });

  res.redirect("/current");
}

export async function registerController(req, res) {
  const { firstname, lastname, mail, age, password } = req.body;

  if (!firstname || !lastname || !mail || !age || !password) {
    return res.status(400).send("Todos los campos son requeridos");
  }

  const user = await userModel.findOne({ mail });
  if (user) {
    return res.status(401).redirect("/register?error=1");
  }

  const isAdmin = mail === "adminCoder@coder.com";
  const role = isAdmin ? "admin" : "user";
  const hashedPassword = createHash(password);

  const newUser = await userModel.create({
    firstname,
    lastname,
    mail,
    age,
    password: hashedPassword,
    role,
  });

  const token = generateToken(newUser);

  res.cookie("currentUser", token, { httpOnly: true, signed: true });

  res.redirect("/current");
}

export async function forgotPasswordController(req, res) {
  const { mail, newPassword } = req.body;

  if (!mail || !newPassword) {
    return res.status(400).send("Todos los campos son requeridos");
  }

  const user = await userModel.findOne({ mail });
  if (!user) {
    return res.status(404).send("Usuario no encontrado");
  }

  const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
  await userModel.updateOne(
    { _id: user._id },
    { $set: { password: hashedPassword } }
  );

  return res.redirect("/");
}

export async function logoutController(req, res) {
  res.clearCookie("currentUser");
  res.redirect("/");
}
