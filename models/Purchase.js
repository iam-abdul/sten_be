import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  purchasedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  itemId: {
    type: mongoose.Schema.ObjectId,
    ref: "Asset",
    required: true,
  },

  created_at: { type: Date, default: Date.now },
});

purchaseSchema.index({ itemId: 1, purchasedBy: 1 }, { unique: true });
const Purchase = mongoose.model("Purchase", purchaseSchema);

export { Purchase };
