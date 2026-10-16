import { loginUser , registerUser , getUserData } from "../controllers/authController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/user", authMiddleware, getUserData);

export default authRouter;