process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("uncaughtException", err);
});
import { app } from "./app.js";
import http from "http";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;

const DB = process.env.DATABASE;
mongoose.connect(DB).then((con) => {
  console.log(
    "<-------------connection to DB sucessfull & running in " +
      process.env.NODE_ENV +
      " ------------->"
  );
});
const tempServer = http.createServer(app);
const server = tempServer.listen(port, () => {
  console.log(
    `<<---<<-----app running on port ${port} in ${process.env.NODE_ENV}----->>--->>`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION");
  server.close(() => {
    process.exit(1);
  });
});
