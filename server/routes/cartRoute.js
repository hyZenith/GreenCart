import express from "express";
import { updateCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

//
// Cart update accepts userId in the body and updates the user's cart.
// Note: for stronger security, consider using authUser and server-side req.userId instead.
cartRouter.post("/update", updateCart)

export default cartRouter;