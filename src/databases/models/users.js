import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    dob: {
        type: Date,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isUserVerified: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true,
        default: "client"
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
