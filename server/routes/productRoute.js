import express from 'express';
import {upload} from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import {addProduct, productList, productById, ChangeStock} from '../controllers/productControler.js';
const productRouter = express.Router();

// accept up to 4 files under the 'images' field
productRouter.post('/add', upload.array('images', 4), authSeller, addProduct);
productRouter.get('/list', productList);
productRouter.post('/id', productById);
productRouter.post('/stock', authSeller, ChangeStock);


export default productRouter;