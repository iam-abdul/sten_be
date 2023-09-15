import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const signToken = (id, expires) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expires ? expires : process.env.JWT_EXPIRES_IN,
  });
};
export const userLogin = async (req, res) => {
  try {
    return res.status(200).json({
      message: "success",
    });
  } catch (err) {
    console.log("err in user login ", err);
    return res.status(400).json({
      message: "failed",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const name = req.body.name;
    const age = req.body.age;
    const dob = new Date(req.body.dob);
    const gender = req.body.gender;

    const password = await bcrypt.hash(req.body.password, 12);

    const createdUser = await User.create({
      name: name,
      DOB: dob,
      age: age,
      gender: gender,
      type_of: "user",
      password: password,
    });

    return res.status(200).json({
      message: "success",
      user: createdUser,
    });
  } catch (err) {
    console.log("err in create user ", err);
    return res.status(400).json({
      message: "failed",
    });
  }
};
