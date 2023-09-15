import express from "express";
import { protect } from "./../controllers/authController.js";
import { userLogin, createUser } from "./../controllers/userController.js";
const router = express.Router();

router.post("/login", userLogin);
router.post("/create", createUser);
router.use(protect);

export default router;
