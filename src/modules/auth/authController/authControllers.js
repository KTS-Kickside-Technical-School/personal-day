import httpStatus from "http-status"

import authRepositories from "../authRepository/authRepositories.js"
import { hashPassword, generateToken } from "../../../helpers/authenticationHelpers.js"
import {sendEmail} from "../../../services/sendEmail.js"

export const registerNewUser = async (req, res) => {
    const user = req.body
    user.password = await hashPassword(user.password)
    await sendEmail(user.email,"Thank you for registering - Personal Day","Your account is created successfully, thank you for coming to Personal Day.")
    const newUser = await authRepositories.registerNewUser(user);
    return res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, message: "User created successfully", data: newUser })
}

export const loginUser = async (req, res) => {
    try {
        const token = await generateToken(req.user._id)
        await sendEmail(req.user.email,"New login Confirmation - Personal Day","Thank you, your login on the new device has succed.");
        return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: "User logged in successfully", data: { token, user: { Id: req.user._id, Email: req.user.email } } })
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST, message: error.message })
    }
}