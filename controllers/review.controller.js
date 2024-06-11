import Review from "../models/review.model.js"
//Get all Reviews
export const getReviews = async (request, response) => {
    const reviews = await Review.find()

    if (!reviews) {
        return response.status(400).send("Something went wrong")
    }
    
    response.status(200).send(reviews)
}

//get a single Review
export const getSpecificReview = async (request, response) => {
    const { productId } = request.params
    const specificProductReview = await Review.find({ productId })
    if (!specificProductReview) {
        return response.status(400).send("Something went wrong")
    }
    response.status(200).send(specificProductReview)
}

//add a single Review
export const addReview = async (request, response) => {
    const { _id: userId } = request.user
    const { rating, comment, productId } = request.body
    //check empty value
    if (!rating || !comment) {
        return response.status(400).send("Please provide a rating and comment")
    }
    const newReview = await Review.create({
        userId,
        productId,
        rating,
        comment,
    })
    if (!newReview) {
        return response.status(400).send("Review not created")
    }
    response.status(201).send(newReview)
}
