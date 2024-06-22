import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    fullNames: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    }
}, { timestamps: true })


export default mongoose.model('People', peopleSchema)