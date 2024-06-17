import mongoose from "mongoose";

const useSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    dob: {
        type:Date,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    isUserVerified: {
        type: Boolean,
        default: false
    },
    userType: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})


export default mongoose.model('User',userSchema)