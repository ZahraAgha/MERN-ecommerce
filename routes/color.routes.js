import express from 'express';
import { addColor, getColors } from '../controllers/color.controller.js';

const router = express.Router();
//Get all colors
router.get("/", getColors)

//Post a new color
router.post("/", addColor)


export default router 