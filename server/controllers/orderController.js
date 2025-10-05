// place order in COD : /api/order/cod


import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const placeOrderCOD = async (req, res) => {
    try {
        const {userID, items, address } = req.body;
        if(!address || items.length === 0) {
            return res.json({success: false, message: 'Invalid data'})
        }
       //calculate amount
       let amount = await items.reduce(async (acc, item) => {
          const product = await Product.findById(item.product); 
            return (await acc) + (product.offerPrice * item.quantity)
       },0)
       
       amount += Math.floor(amount * 0.02);

       await Order.create({
        userId,
        items,
        amount,
        address,
        paymentType: "COD",
       })

       return res.json({success: true, message: 'Order placed'})

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

//get Orders by UserID :  /api/order/user


export const getUserOrders  = async (req, res) => {
    try {
       const {userId} = req.body;
       const orders = await Order.find({
        userId,
        $or:[{paymentType: 'COD'},{isPayid: true} ]
       }).populate("items.product address").sort({createdAt: -1});
    res.json({success: true, orders})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}



// get all orders (for seller/ admin): /api/order/all

export const getAllOrders = async (req, res) => {
    try {
       const orders = await Order.find({
        $or:[{paymentType: 'COD'},{isPayed: true} ]
       }).populate("items.product address ");
       res.json({success: true, orders});

    } catch (error) {
       res.json({success: false, message: error.message});
    }
}