import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate user using JWT token from cookies
const authUser = async (req, res, next) => {
    const { token } = req.cookies || {};
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded && decoded.id) {
            // Avoid mutating undefined req.body. Attach to req.userId and
            // also ensure req.body exists for backwards compatibility.
            req.userId = decoded.id;
            if (!req.body) req.body = {};
            req.body.userId = decoded.id;
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();

    } catch (error) {
        console.error('authUser error:', error);
        return res.status(401).json({ message: error.message || 'Invalid token' });
    }
}

export default authUser;
