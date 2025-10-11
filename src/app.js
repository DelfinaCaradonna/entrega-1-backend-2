import express from "express";
import handlebars from "express-handlebars";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from 'cors'

import usersRouter from "./routes/users.js";
import viewsRouter from "./routes/views.js";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import MongoSingleton from "./config/db.js";
import initializePassport from "./config/passport.js";

dotenv.config();

const app = express();

app.use(cors())
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
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

const PORT = process.env.PORT || 8080;

const mongoConn = new MongoSingleton();

await mongoConn.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`);
  });
});
