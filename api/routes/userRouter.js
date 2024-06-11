import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

export default router;
