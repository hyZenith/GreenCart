import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

// seller login : api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: "7d" });

      res.cookie("sellerToken", token, {
        httpOnly: true, //prevent js to access the cookie
        secure: process.env.NODE_ENV === "production", // use Secure cookie in production
        sameSite: process.env.NODE_ENV ==="production" ? "none" : "strict", //CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days // cookie expiration time
      });

      return res.json({
        success: true,
        message: "Seller logged in successfully",
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Seller Credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//seller isAuth : api/seller/is-auth

export const isSellerAuth = async (req, res) => {
    try {
        return res.json({success:true})
    }catch(error) {
        console.log(error);
        return res.status(401).json({message: error.message});
    }
}


//seller logout : api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // use Secure cookie in production
            sameSite: process.env.NODE_ENV ? "none" : "strict", //CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days // cookie expiration time
        });
        return res.json({success:true, message: 'Seller logged out '})
    }catch(error) {
        console.log(error);
        return res.status(500).json({success:false, message: error.message
        })
    }
}
