import Category from "../models/category.model.js"
//Get all categories
export const getCategories = async (request, response) => {
    const categories = await Category.find()
    return response.status(200).send(categories)
}
export const addCategory = async (request, response) => {
    const { name, slug } = request.body
    // check empty value
    if (!name || !slug) {
        return response.status(400).send("Please provide a name and slug")
    }
    //check existing slug
    const existingCategorySlug = await Category.findOne({ slug })
    if (existingCategorySlug) {
        return response.status(400).send("This category slug already exists")
    }
    // check existing name
    const existingCategoryName = await Category.findOne({ name })
    if (existingCategoryName) {
        return response.status(400).send("This category name already exists")
    }
    //create a new category 
    const category = await Category.create({ name, slug })
    return response.status(201).send(category)
} 