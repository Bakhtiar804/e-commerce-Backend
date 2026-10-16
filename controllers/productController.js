import express from "express";
import AllProduct from "../models/products.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs"


//  add data

const addProduct = async (req , res , next) => {

    try {
        const lastId = await AllProduct.findOne().sort({id : -1});
        const newId = lastId ? lastId.id + 1 : 1

        const imageCloud = await cloudinary.uploader.upload(req.file.path);
        const secureImageUrl = imageCloud.secure_url;
console.log(secureImageUrl);


        await AllProduct.create({
            id : newId,
            title : req.body.title,
            description : req.body.description,
            price : req.body.price,
            category : req.body.category,
            brand : req.body.brand,
            stock : req.body.stock,
            imageUrl : secureImageUrl,
            inStock : req.body.inStock
        })

         fs.unlinkSync(req.file.path);
    

        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        next(error)
    }

}

//  get data 

const getAllProducts = async (req, res, next) => {
   
    try {
        const products = await AllProduct.find();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

// get by id

const getProductById = async (req, res, next) => {
    try {
        const productId = Number(req.params.id);
        const product = await AllProduct.findOne({id : productId});
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

// update data

const updateProduct = async (req, res, next) => {
    try {
        const productId = Number(req.params.id);

        const updatedProduct = await AllProduct.findOne({id : productId});
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        const { title, description, price, category, brand, stock, imageUrl, inStock } = req.body;
        updatedProduct.title = title || updatedProduct.title;
        updatedProduct.description = description || updatedProduct.description;
        updatedProduct.price = price || updatedProduct.price;
        updatedProduct.category = category || updatedProduct.category;
        updatedProduct.brand = brand || updatedProduct.brand;
        updatedProduct.stock = stock || updatedProduct.stock;
        updatedProduct.imageUrl = imageUrl || updatedProduct.imageUrl;
        updatedProduct.inStock = inStock !== undefined ? inStock : updatedProduct.inStock;

        await updatedProduct.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

// delete data

const deleteProduct = async (req, res, next) => {
    try {
        const productId = Number(req.params.id);
        const deletedProduct = await AllProduct.findOneAndDelete({id : productId});
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct };