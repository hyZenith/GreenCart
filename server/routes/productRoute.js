import express from 'express';
import {upload} from '../configs/multer.js';
import {authSeller} from '../middlewares/authMiddleware.js';
import {addProduct, productList, productById, ChangeStock} from '../controllers/productControler.js';
const productRouter = express.Router();

productRouter.post('/add',upload.array([Images]), authSeller, addProduct);
productRouter.get('/list', productList);
productRouter.post('/id', productById);
productRouter.post('/stock', authSeller, ChangeStock);


export default productRouter;