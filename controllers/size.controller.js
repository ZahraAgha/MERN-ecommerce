import Size from "../models/size.model.js"
import isValidSize from "../utils/checkValidSize.js"
//Get all Sizes
export const getSizes = async (request, response) => {
    const sizes = await Size.find()
    return response.status(200).send(sizes)
}

//add a single Size
export const addSize = async (request, response) => {
    const { name } = request.body
    // check empty value
    if (!name) {
        return response.status(400).send("Please provide a name")
    }
    //check valid size
    const validSize = isValidSize(name)
    if (!validSize) {
        return response.status(400).send("Please provide a valid size")
    }

    //check existing size
    const existingSize = await Size.findOne({ name })
    if (existingSize) {
        return response.status(400).send("Size name already exsists")
    }
    const newSize = await Size.create({ name })
    return response.status(201).send(newSize)
} 