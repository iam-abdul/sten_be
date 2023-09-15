import mongoose from "mongoose";

import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  DOB: { type: Date, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female", "other"] },
  type_of: { type: String, default: "user" },

  password: {
    type: String,
  },

  created_at: { type: Date, default: Date.now },
});

userSchema.methods.correct_password = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.index({ name: 1 }, { unique: true });
const User = mongoose.model("User", userSchema);
export { User };
