import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;



//register user : /api/user/register
export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({message: 'Please fill all the fields'});
        }
        // check if the user exists
        const existingUser = await User.findOne({email})
        if (existingUser)
            return res.status(400).json({message: 'User already exists'});
        

        // if the user does not exist create a new user
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashPassword});

        // res.status(201).json({message: 'User registered successfully', user});

        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token',token, {
            httpOnly: true, //prevent js to access the cookie
            secure: process.env.NODE_ENV === 'production', // use Secure cookie in production
            sameSite: process.env.NODE_ENV  ? 'none' : 'strict',  //CSRF protection 
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days // cookie expiration time
        })
        return res.status(201).json({success: true, user:{email: user.email, name:user.name}})

    }catch(err) {
        // console.log(err);
        res.status(500).json({success: false, message: err.message});
    }
}


//login user : /api/user/login
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.json({success:false, message: 'Please fill all the fields'});
        }
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({success:false, message: 'Invalid Email or Password'});

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(400).json({success:false, message: 'Invalid Email or Password'});

        const token = jwt.sign()
    }catch(err) {

    }
}