import { Asset } from "../models/Asset.js";
import { User } from "../models/User.js";
import mongoose from "mongoose";
export const addAsset = async (req, res) => {
  try {
    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;

    const asset = await Asset.create({
      name: name,
      price: price,
      quantity: quantity,
      addedBy: req.user._id,
    });

    return res.status(200).json({
      message: "success",
      asset,
    });
  } catch (err) {
    console.log("err in addAsset ", err);
    return res.status(400).json({
      message: "failed",
    });
  }
};

export const purchaseAsset = async (req, res) => {
  try {
  } catch (err) {
    console.log("err in purchaseAsset ", err);
    return res.status(400).json({
      message: "failed",
    });
  }
};
