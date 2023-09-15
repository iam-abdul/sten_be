import express from "express";
import { protect, onlyDevs } from "./../controllers/authController.js";
import { userLogin, createUser } from "./../controllers/userController.js";
import { addAsset } from "../controllers/assetController.js";
const router = express.Router();

router.post("/login", userLogin);
router.post("/create", createUser);
router.use(protect);
router.use(onlyDevs);
router.post("/asset", addAsset);

export default router;
