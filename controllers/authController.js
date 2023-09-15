import { User } from "../models/User.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // console.log("auth protect", token);

    if (!token) {
      return res.status(400).json({
        status: "fail",
        message: "no token received please login again",
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select({
      password: 0,
    });

    if (!user) {
      console.log("user doesnt exist please login");
      return res.status(400).json({
        status: "fail",
        message: "invalid token",
      });
      // return res.redirect("https://dokify.io/login");
    }

    req.user = user;

    next();
  } catch (err) {
    console.log("err in protect middleware ", err);
    return res.status(400).json({
      message: "failed",
    });
  }
};

export const onlyDevs = (req, res, next) => {
  try {
    if (req.user.type_of === "dev") {
      next();
    } else {
      return res.status(403).json({
        message: "invalid",
      });
    }
  } catch (err) {
    console.log("err in onlyDevs middleware ", err);
    return res.status(400).json({
      message: "failed",
    });
  }
};
