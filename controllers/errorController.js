import { AppError } from "./../utils/AppError.js";

const handleJWTerror = (err) =>
  new AppError("invalid token, Pls login again", 401);

const handleJWTexpiredError = (err) =>
  new AppError("Your token has expired pls login again", 401);

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // console.error('--------error------', err);

    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

export default function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);

    if (error.name === "JsonWebTokenError") error = handleJWTerror(error);
    if (error.name === "TokenExpiredError")
      error = handleJWTexpiredError(error);
    sendErrorProd(error, res);
  }
}
