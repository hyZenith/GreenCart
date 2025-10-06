
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate seller using JWT token from cookies
const authSeller = async (req, res, next) => {
    const {sellerToken} = req.cookies;

    if (!sellerToken) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    
    try {
            const decoded = jwt.verify(sellerToken, JWT_SECRET);
            if (decoded && decoded.email === process.env.SELLER_EMAIL) {
                next();
            }else {
                return res.status(401).json({success:false, message: 'Unauthorized'});
            }


    } catch (error) {
        console.error('authUser error:', error);
        return res.status(401).json({ message: error.message || 'Invalid token' });
    }

}

export default authSeller;