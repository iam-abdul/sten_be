export const protect = (req, res, next) => {
  try {
    next();
  } catch (err) {
    console.log("err in protect middleware ", err);
    return res.status(400).json({
      message: "failed",
    });
  }
};
