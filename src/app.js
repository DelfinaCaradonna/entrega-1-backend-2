import express from "express";
import handlebars from "express-handlebars";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";

import usersRouter from "./routes/users.js";
import viewsRouter from "./routes/views.js";
import connectDB from "./config/db.js";
import initializePassport from "./config/passport.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));

initializePassport();
app.use(passport.initialize());

app.engine("hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", "./src/views");

app.use("/", viewsRouter);
app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`);
  });
});
