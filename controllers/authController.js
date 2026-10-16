import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";    

dotenv.config();

const registerUser = async (req, res, next) => {
    try {
        const lastUser = await User.findOne().sort({ _id: -1 });
        const newId = lastUser ? lastUser._id + 1 : 1;
        const { name, email, password } = req.body;
        console.log(password);
        
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        
        const user = new User({ id: newId, name, email, password : hashedPassword });

        console.log(user);
        
        await user.save();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
   
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
       
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });


        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            token
        });
    }
    catch (error) {
        next(error);
    }
};

// get user data
const getUserData = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId)
        .select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

export { registerUser, loginUser, getUserData };