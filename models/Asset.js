import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  created_at: { type: Date, default: Date.now },
});

const Asset = mongoose.model("Asset", assetSchema);
export { Asset };
