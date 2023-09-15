import { Asset } from "../models/Asset.js";
import { User } from "../models/User.js";
import { Purchase } from "../models/Purchase.js";
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
    const userName = req.user.name;
    const assetName = req.body.assetName;
    const backBalance = req.body.backBalance;

    console.log("purchased by ", req.user);

    // we have to create a purchase document and update the asset document too
    // for maintaining atomicity we shall use sessions
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const purchasedItem = await Asset.findOneAndUpdate(
        { name: assetName },
        { $inc: { unitsSold: 1, quantity: -1 } },
        { session, upsert: false, new: true }
      );

      if (!purchasedItem) {
        throw new Error("invalid asset");
      }

      console.log("req.user", req.user._id);

      const order = await Purchase.create(
        [
          {
            purchasedBy: req.user._id,
            itemId: purchasedItem._id,
          },
        ],

        { session }
      );

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      console.log("err in purchaseSession ", err);
      return res.status(400).json({
        message: "failed",
      });
    } finally {
      await session.endSession();
    }

    return res.status(200).json({
      message: "purchased successfully",
    });
  } catch (err) {
    console.log("err in purchaseAsset ", err);
    return res.status(400).json({
      message: "failed",
    });
  }
};
