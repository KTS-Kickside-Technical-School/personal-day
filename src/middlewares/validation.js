import mongoose from "mongoose";
import httpStatus from "http-status"
import bcrypt from "bcrypt"

import authRepositories from "../modules/auth/authRepository/authRepositories.js"
import peopleRepositories from "../modules/people/peopleRepository/peopleRepositories.js";

export const validateSchema = (schema) => async (req, res, next) => {
    try {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message.replace(/['"]/g, '')).join(', ')
            return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, message: errorMessage })
        }

        return next();
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' });
    }
};


export const isUserAlreadyExist = async (req, res, next) => {
    const email = req.body.email;

    const user = await authRepositories.findUserByAttribute("email", email);
    if (user) {
        return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, message: "User already exists" })
    }

    return next()
}

export const isUserExists = async (req, res, next) => {
    const email = req.body.email;
    const userId = req.body.userId
    let user = undefined
    if (email) {
        user = await authRepositories.findUserByAttribute("email", email);
    }
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
        user = await authRepositories.findUserByAttribute("_id", userId);

    }

    if (!user) {
        return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, message: "User does not exist" })
    }
    req.user = user
    return next()
}
export const verifyUserCredentials = async (req, res, next) => {
    const user = await authRepositories.findUserByAttribute("email", req.body.email);
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordMatch) {
        return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, message: "Incorrect password" })
    }

    return next()
}

export const isTokenValid = async (req, res, next) => {
    const token = await authRepositories.getSessionBYAttributes("token", req.body.token, "userId", req.body.userId);
    if (!token) {
        return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, message: "Invalid token" })
    }

    return next()
}


export const isPeopleExist = async (req, res, next) => {
    const people = await peopleRepositories.getSinglePersonByAttributes("_id", req.params.id)
    if (!people) return res.status(httpStatus.NOT_FOUND).json({ status: httpStatus.NOT_FOUND, message: "No such person found." })
    req.people = people
    return next()
}




export const isIdValid = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, message: "Invalid id" })
    }
    return next()
}