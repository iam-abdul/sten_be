class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // calling constructor of Error as it accepts only one argunemt
    // the above prpt also sets message
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// module.exports = AppError;
export { AppError };
