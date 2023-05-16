import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import compression from "compression";
import express from "express";
import path from "node:path";
const app = express();
app.use(compression());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
const p = path.dirname(__dirname).concat("/dist");

app.use("/games", (req, res, next) => {
  res.redirect("/");
  next();
});
app.use("/components", (req, res, next) => {
  res.redirect("/");
  next();
});

app.use("/", express.static(p));
app.listen(3001, () => {
  console.log("Listening on 3001");
});
