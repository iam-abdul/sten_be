import express from "express";
import { protect } from "./../controllers/authController.js";
import { userLogin } from "./../controllers/userController.js";
const router = express.Router();

router.post("/login", userLogin);
router.use(protect);

export default router;
