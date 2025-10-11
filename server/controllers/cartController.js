import User from "../models/user.js";
// Update cart  CartData : /api/cart/update
export const updateCart = async (req, res) => {
  try {
                        const { userId, cartItems } = req.body;
                        console.log('updateCart called with:', { userId, cartItems });
                        if (!userId) {
                                    console.warn('updateCart: missing userId in request body');
                                    return res.status(400).json({ success: false, message: 'Missing userId' });
                        }

                        const result = await User.findByIdAndUpdate(userId, { cartItems });
                        console.log('updateCart result:', result ? 'user updated' : 'user not found');
                        return res.json({ success: true, message: 'Cart updated' });

  } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Server Error" });
  }
};
