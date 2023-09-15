import express from "express";
import { protect, onlyDevs } from "./../controllers/authController.js";
import { userLogin, createUser } from "./../controllers/userController.js";
import { addAsset, purchaseAsset } from "../controllers/assetController.js";
const router = express.Router();

router.post("/login", userLogin);
router.post("/create", createUser);
router.use(protect);
router.post("/purchase", purchaseAsset);
router.use(onlyDevs);
router.post("/asset", addAsset);

export default router;
