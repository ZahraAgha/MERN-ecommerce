import express from 'express';
import { addSize,getSizes } from '../controllers/size.controller.js';
const router = express.Router();
//Get all sizes
router.get("/", getSizes)

//Post a new size
router.post("/", addSize)


export default router 