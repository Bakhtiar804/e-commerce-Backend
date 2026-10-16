
import express from "express";
import { addToCart, getCart, removeFromCart, updateCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.post("/", authMiddleware, addToCart);
cartRouter.get("/", authMiddleware, getCart);
cartRouter.patch("/:productId", authMiddleware, updateCart);
cartRouter.delete("/:productId", authMiddleware, removeFromCart);
export default cartRouter;
