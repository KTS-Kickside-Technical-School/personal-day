import mongoose from "mongoose";

import User from "./users.js"


const sessionsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: User
    },
    token: {
        type: String,
        required: true,
    },
    device: {
        type: String,
        required: true,
        default: "Web"
    },
    time: {
        type: Date,
        required: true,
        default: Date.now()
    },
    type: {
        type: String,
        required: true,
    }
}, { timestamps: true })

export default mongoose.model('Session', sessionsSchema);