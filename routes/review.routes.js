import express from 'express';
import { getSpecificReview, addReview, getReviews } from '../controllers/review.controller.js';
import { protectRoutes } from '../middlewares/protectRoutes.js';

const router = express.Router();
//Get all products
router.get("/", getReviews)

//Get single product
router.get("/:productId", getSpecificReview)

//Post a new product
router.post("/", protectRoutes, addReview)


export default router 