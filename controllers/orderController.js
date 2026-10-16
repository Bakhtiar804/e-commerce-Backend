import Cart from "../models/cart.js";
import Order from "../models/order.js";

export const createOrder = async (req, res) => {
    try {
        const userId = req.user.userId;
        let cart = await Cart.findOne({ user: userId })
            .populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const itemCount = cart.items.length;

        if (itemCount === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const cartItems = cart.items;
        const orderItems = cartItems.map((item) => ({
            product: item.product._id,
            price: item.product.price,
            quantity: item.quantity
        }));
        const cartTotalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

        const { shippingAddress, phoneNumber } = req.body;
        const order = new Order({ items: orderItems, totalAmount: cartTotalAmount, shippingAddress, phoneNumber, user: userId });
        await order.save();

        cart.items = [];
        await cart.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orders = await Order.find({ userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
