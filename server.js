import express from "express";
import connectDb from "./config/db.js";
import dns from "node:dns"
import dotenv from "dotenv";
import errorHandler from "./middleware/errorMiddleware.js";
import productRouter from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cartRouter from "./routes/cartRouts.js";
import cors from "cors";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// port listening
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());

// db connect
app.use(express.json());
connectDb()

// error middleware
app.use(errorHandler);



// products api route
app.use(express.json());
app.use("/api/products", productRouter);



// auth api route
app.use(express.json());
app.use("/api/auth", authRouter);


// cart api route
app.use(express.json())
app.use("/api/cart", cartRouter);


// order api route
app.use(express.json())
app.use("/api/orders", orderRouter);





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
