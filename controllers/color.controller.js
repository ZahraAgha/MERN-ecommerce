import Color from "../models/color.model.js"
import isValidHexColor  from "../utils/checkValidColor.js"
//Get all Colors
export const getColors = async (request, response) => {
    const colors = await Color.find()
    if (!colors) {
        return response.status(400).send("Something went wrong")
    }
    response.status(200).send(colors)

}

//add a single color
export const addColor = async (request, response) => {
    const { name, hex } = request.body
    //check empty value
    if (!name || !hex) {
        return response.status(400).send("Please provide a name and hex")
    }
    //check valid hex value
    const validColor= isValidHexColor(hex)
    if(!validColor){
        return response.status(400).send("Please provide a valid hex value")
    }
    //exsisting hex value
    const exsistingColorHex = await Color.findOne({ hex })
    if(exsistingColorHex){
        return response.status(400).send("Color hex already exsists")
    }
    //exsisting color name
    const exsistingColorName = await Color.findOne({ name })
    if(exsistingColorName){
        return response.status(400).send("Color name already exsists")
    }

    const newColor = await Color.create({ name, hex })
    response.status(201).send(newColor)
} 