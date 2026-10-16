import { getOrders , createOrder } from "../controllers/orderController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";


const orderRouter = express.Router();

orderRouter.post("/", authMiddleware, createOrder);
orderRouter.get("/", authMiddleware, getOrders);


export default orderRouter;