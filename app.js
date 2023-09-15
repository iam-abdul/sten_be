import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.js";

import globalErrorHandler from "./controllers/errorController.js";
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/v1/", userRouter);

app.all("*", (req, res, next) => {
  // todo: remove this part later
  let body = "no body";
  if (req.body) {
    body = req.body;
  }
  res.status(404).json({
    status: "fail",
    message: `${req.originalUrl} such route does not exist`,
    body,
  });
});

app.use(globalErrorHandler);
/*-------------------server----------------- */
export { app };
