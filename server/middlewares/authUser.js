import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate user using JWT token from cookies
export const authUser = async (req, res, next) => {
    const token = req.cookies;
    if (!token) 
        return res.status(401).json({message: 'Unauthorized'});

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.id) {
            req.body.userId = decoded.id;
        }
        else {
            return res.status(401).json({message: 'Unauthorized'});
        }
        next();

    }catch (error) {
        console.log(error);
        return res.status(401).json({message: error.message});
    }
}

