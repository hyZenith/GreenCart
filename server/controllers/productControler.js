import { v2 as cloudinary } from 'cloudinary'
import Product from '../models/Product.js'

// helper to upload a buffer to Cloudinary via upload_stream
const uploadBufferToCloudinary = (buffer, filename) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image', public_id: filename },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        stream.end(buffer);
    });
};

// add Product : /api/product/add
export const addProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData || '{}');

        const files = req.files || [];

        if (files.length === 0) {
            // still create product without images if desired, but log it
            const created = await Product.create({ ...productData, image: [] });
            return res.json({ success: true, message: 'Product added (no images attached)', product: created });
        }

        const imagesUrl = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            // multer memory storage exposes buffer
            if (!file || !file.buffer) continue;
            const fileName = `product_${Date.now()}_${i}`;
            const result = await uploadBufferToCloudinary(file.buffer, fileName);
            imagesUrl.push(result.secure_url);
        }

        const created = await Product.create({ ...productData, image: imagesUrl, images: imagesUrl });

        res.json({ success: true, message: 'Product added', product: created });
    } catch (err) {
        console.error('addProduct error:', err);
        res.json({ success: false, message: err.message });
    }
}


// Get Product : api/product/list
export const productList = async (req, res) => {
    try {
       const products = await Product.find({})
       // normalize documents so frontend always gets `image` array
       const normalized = products.map(p => {
           const obj = p.toObject ? p.toObject() : p;
           obj.image = (obj.image && obj.image.length) ? obj.image : (obj.images || []);
           return obj;
       })
       res.json({success: true, products: normalized})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }

}

// get single product details : /api/product/id
export const productById = async (req, res) => {
   try {
    // support both POST with body {id} and GET /:id via params
    const id = req.params.id || req.body.id;
    const productDoc = await Product.findById(id);
    if (!productDoc) return res.json({ success: false, message: 'Product not found' });
    const product = productDoc.toObject ? productDoc.toObject() : productDoc;
    product.image = (product.image && product.image.length) ? product.image : (product.images || []);
    res.json({success: true, product}) 
   } catch (error) {
       console.log(error)
       res.json({success: false, message: error.message})
   }

}

//change product Instock : /api/product/stock
export const ChangeStock = async (req, res) => {
   try {
    const {id, inStock} = req.body;
    await Product.findByIdAndUpdate(id, {inStock});
    res.json({success: true, message: 'Product stock changed'})
   } catch (error) {
    console.log(error)
    res.json({success: false, message: error.message}) 
   } 
}