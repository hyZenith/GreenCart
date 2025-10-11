// place order in COD : /api/order/cod


import Product from "../models/Product.js";
import Order from "../models/Order.js";

// place order in COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId || req.body.userID;
        const items = req.body.items;
        const address = req.body.address || req.body.addresses;

        if (!userId || !items || !Array.isArray(items) || items.length === 0 || !address) {
            return res.json({ success: false, message: 'Invalid data' });
        }

        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) return res.json({ success: false, message: `Product not found: ${item.product}` });
            amount += product.offerPrice * (item.quantity || 1);
        }

        // add tax 2%
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'COD',
        });

        return res.json({ success: true, message: 'Order placed' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// get Orders by UserID :  /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId || req.body.userID;
        if (!userId) return res.json({ success: false, message: 'Unauthorized' });

        const orders = await Order.find({
            userId,
            $or: [{ paymentType: 'COD' }, { isPayed: true }]
        }).populate('items.product address').sort({ createdAt: -1 });

        return res.json({ success: true, orders });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// get all orders (for seller/ admin): /api/order/all
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: 'COD' }, { isPayed: true }]
        }).populate('items.product address');
        return res.json({ success: true, orders });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}