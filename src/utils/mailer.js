import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendPasswordResetMail(mail, token) {
  const resetLink = `http://localhost:8080/api/users/reset-password/${token}`;

  const html = `
    <h2>Recuperar contraseña</h2>
    <p>Hacé clic en el siguiente enlace para confirmar el cambio de contraseña:</p>
    <a href="${resetLink}" style="display:inline-block;margin-top:10px;padding:10px 20px;background:#4CAF50;color:white;border-radius:8px;text-decoration:none;">Actualizar contraseña</a>
    <p>Si no solicitaste este cambio, podés ignorar este correo.</p>
  `;

  await transporter.sendMail({
    from: `"Soporte" <${process.env.MAIL_USER}>`,
    to: mail,
    subject: "Recuperar contraseña",
    html,
  });
}
