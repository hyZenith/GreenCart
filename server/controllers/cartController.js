import User from "../models/user.js";
// Update cart  CartData : /api/cart/update
export const updateCart = async (req, res) => {
  try {
        const { userId, cartItems } = req.body;
        await User.findByIdAndUpdate(userId, { cartItems });

  } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server Error" });
  }
};
