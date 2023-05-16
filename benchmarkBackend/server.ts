import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import benchmarkRouter from "./routers/benchmarkRouter";
import componentRouter from "./routers/componentRouter";
import gameRouter from "./routers/gameRoute";
const app = express();

app.use(helmet());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
//TODO: move this inside of routers because it currently errors a get request if it has invalid json body.
app.use(express.json());
app.disable("x-powered-by");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cross-Origin-Resource-Policy", "Cross-Origin");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,API-Key"
  );

  next();
});
app.use(compression());

app.use("/games", gameRouter);
app.use("/components", componentRouter);
app.use("/benchmark", benchmarkRouter);

app.use((err, req, res, next) => {
  console.error(err.message);
  if (process.env.NODE_ENV === "production") {
    res.status(500).json({ error: "Internal server error. Sorry about that." });
  } else {
    res.status(500).json({ error: err.message });
  }
  return;
});

export default app;
