import Cart from "../models/cart.model.js"
import Color from "../models/color.model.js"
import Size from "../models/size.model.js"
import Product from "../models/product.model.js"

//get a single cart
export const getCart = async (request, response) => {
    const { id: userId } = request.user
    const cart = await Cart.findOne({ userId })

    if (!cart) {
        return response.status(400).send({ error: "Something went wrong" })
    }
    response.status(200).send(cart)
}
//add a single cart
export const addCart = async (request, response) => {
    try {
        const { _id: userId } = request.user
        const { productId, quantity, size, color, price } = request.body

        if (!productId || !quantity || !size || !color || !price) {
            return response.status(400).send({ error: "Please provide a required fields" })
        }

        const newCartItem = { productId, quantity, size, color, price }

        //check existing cart
        const existingUserCart = await Cart.findOne({ userId }).populate("cartItems.size")
            .populate("cartItems.color").populate("cartItems.productId")

        const givenColor = await Color.findOne({ _id: color })
        const givenSize = await Size.findOne({ _id: size })
        const givenProduct = await Product.findOne({ _id: productId })
        if (!givenColor || !givenSize || !givenProduct) {
            return response.status(400).send({ error: "Invalid product, color, or size" })
        }

        if (existingUserCart) {
            const existingSpesificCartItem = existingUserCart.cartItems.find(
                cartItem => cartItem.color.name === givenColor.name
                    && cartItem.size.name == givenSize.name &&
                    cartItem.productId.sku == givenProduct.sku)

            if (existingSpesificCartItem) {
                existingSpesificCartItem.quantity += +quantity;
            } else {
                existingUserCart.cartItems.push(newCartItem)
            }
            await existingUserCart.save();
            return response.status(202).send(existingUserCart);
        } else {
            const newCart = await Cart.create({ userId, cartItems: [newCartItem] })
            if (!newCart) {
                return response.status(400).send({ error: "Cart not created" })
            }
            response.status(201).send(newCart)
        }
    } catch (error) {
        response.status(500).send({ error: "Internal Server Error" });
    }
}  