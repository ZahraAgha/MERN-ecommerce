import express from 'express';
import { addCart, getCart } from '../controllers/cart.controller.js';
import { protectRoutes } from "../middlewares/protectRoutes.js"

const router = express.Router();
//Get all Carts
router.get("/", protectRoutes, getCart)

//Post a new Cart 
router.post("/", protectRoutes, addCart)


export default router 