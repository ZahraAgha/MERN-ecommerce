import Order from "../models/order.model.js"
import Cart from "../models/cart.model.js"
import Product from "../models/product.model.js"

//Get all orders
export const getOrders = async (request, response) => {
    const orders = await Order.find()
    if (!orders) return response.status(404).send({ error: "Something went wrong" })
    response.status(200).send(orders)
}

//get a single order
export const getSingleOrder = async (request, response) => {
    const { userId } = request.params
    const singleOrder = await Order.findOne({ userId })
    if (!singleOrder) return response.status(404).send({ error: "Something went wrong" })
    response.status(200).send(singleOrder)
}

//add a single Order
export const addOrder = async (request, response) => {
    const { _id: userId } = request.user
    const { totalPrice, orderItems, shippingAddress } = request.body
    //check empty values
    for (const value of Object.values(shippingAddress)) {
        if (!value) {
            return response.status(400).send({ error: "Please provide a required fields" })
        }
    }
    const orderItemsWithAddress = orderItems.map((orderItem) => {
        return { ...orderItem, shippingAddress }
    })
    const newOrder = await Order.create({ orderItems: orderItemsWithAddress, totalPrice, userId })

    if (!newOrder) return response.status(400).send({ error: "Could not create a new Order" })

    const userCart = await Cart.findOne({ userId })
    if (!userCart) return response.status(404).send({ error: "Something went wrong" })

    userCart.cartItems = []
    await userCart.save()

    const products = await Product.find() 

    for (const orderItem of orderItems) {
        const { color: colorId, size: sizeId, productId, quantity } = orderItem
        const product = products.find((product) =>
            product._id.toString() === productId.toString()
        )

        if (product) {
            const stockItem = product.stock.find((stockItem) =>
                stockItem.color.toString() === colorId.toString() &&
                stockItem.size.toString() === sizeId.toString()
            )
            if (stockItem) {
                if (quantity > stockItem.quantity) {
                    return response.status(400).send({error:"Invalid quantity"})
                }
                stockItem.quantity = stockItem.quantity - quantity
                await product.save()
            }
        }

    }
    response.status(201).send(newOrder)
}