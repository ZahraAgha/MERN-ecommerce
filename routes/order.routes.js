import express from 'express';
import { addOrder, getOrders, getSingleOrder } from '../controllers/order.controller.js';
import { protectRoutes } from '../middlewares/protectRoutes.js';

const router = express.Router();
router.use(protectRoutes)
//Get all Orders
router.get("/", getOrders)

//Get single Order
router.get("/:userId", getSingleOrder)
 
//Post a new Order
router.post("/", addOrder)


export default router 