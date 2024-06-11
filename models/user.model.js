import mongoose from "mongoose";
const addressSchema = mongoose.Schema({
    streetAddress: {
        type: String,
    },
    city: {
        type: String,
    },
    district: {
        type: String,
    },
    zipCode: {
        type: String,
    },
    country: {
        type: String,
    },
})

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    address: addressSchema
})

export default mongoose.model("User", userSchema)