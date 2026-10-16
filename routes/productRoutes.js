import express from "express";
import { addProduct , getAllProducts , updateProduct, deleteProduct , getProductById } from "../controllers/productController.js";
import upload from "../middleware/uploadsMiddleware.js";

const productRouter = express.Router();

productRouter.get("/all", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/update/:id", updateProduct);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.post("/add", upload.single('image') , addProduct);

export default productRouter;