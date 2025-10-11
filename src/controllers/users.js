import jwt from "jsonwebtoken";

import { generateToken } from "../utils/jwt.js";
import userModel from "../dao/models/userModel.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";
import { sendPasswordResetMail } from "../utils/mailer.js";

export async function loginController(req, res) {
  const { mail, password } = req.body;

  if (!mail || !password) {
    return res.status(400).send("Todos los campos son requeridos");
  }

  const user = await userModel.findOne({ mail });

  if (!user || !user.password || typeof user.password !== "string") {
    return res.status(401).redirect("/?error=1");
  }

  if (!isValidPassword(password, user.password)) {
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
  const role = isAdmin ? "ADMIN" : "USER";
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

  const token = jwt.sign({ mail, newPassword }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  await sendPasswordResetMail(mail, token);

  res.send("Se envió un correo para confirmar el cambio de contraseña");
}

export async function resetPasswordController(req, res) {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { mail, newPassword } = decoded;

    const user = await userModel.findOne({ mail });
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    const hashedPassword = createHash(newPassword);
    await userModel.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword } }
    );

    return res.redirect("/?reset=ok");
  } catch (error) {
    console.error(error);
    return res.status(400).send("Enlace inválido o expirado");
  }
}

export async function logoutController(req, res) {
  res.clearCookie("currentUser");
  res.redirect("/");
}
