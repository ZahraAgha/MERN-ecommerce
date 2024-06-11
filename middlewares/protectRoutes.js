import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
export const protectRoutes = async (request, response, next) => {
    try {
        const token = request.cookies.jwt
        if (!token) {
            return response.status(401).send({ error: "Not authorized" })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if (!decode) {
            return response.status(401).send({ error: "Invalid Token" })
        }

        const user = await User.findById(decode._id)
        if (!user) {
            return response.status(401).send({ error: "User not found" })
        }
        request.user = user
        next()
    } catch (error) {
        return response.status(500).send(`Error in middleware: ${error}`)
    }
}
