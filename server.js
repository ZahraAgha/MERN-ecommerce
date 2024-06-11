import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import multer from 'multer';

//Import Routes
import AuthRoutes from "./routes/auth.routes.js"
import ColorRoutes from "./routes/color.routes.js"
import ReviewRoutes from "./routes/review.routes.js"
import OrderRoutes from "./routes/order.routes.js"
import CartRoutes from "./routes/cart.routes.js"
import ProductRoutes from "./routes/product.routes.js"
import SizeRoutes from "./routes/size.routes.js"
import CategoriesRoutes from "./routes/category.routes.js"

const app = express();
//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static("./"))
//Config
dotenv.config();

//ENV variables
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL

//Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })

//Routes
app.use('/api/auth', AuthRoutes)
app.use("/api/products", upload.single("productPic"), ProductRoutes)
app.use("/api/carts", CartRoutes)
app.use("/api/sizes", SizeRoutes)
app.use("/api/colors", ColorRoutes)
app.use("/api/reviews", ReviewRoutes)
app.use("/api/orders", OrderRoutes)
app.use("/api/categories", CategoriesRoutes )


app.listen(PORT, () => {
    mongoose.connect(MONGODB_URL).then(() => {
        console.log(`Server is running on port ${PORT} and connecting database`);
    }).catch((error) => {
        console.log(error);
    })
});
