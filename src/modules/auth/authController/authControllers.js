import httpStatus from "http-status"

import authRepositories from "../authRepository/authRepositories.js"
import { hashPassword, generateToken, deviceInfo, generateVerificationCode } from "../../../helpers/authenticationHelpers.js"
import { sendEmail } from "../../../services/sendEmail.js"

export const registerNewUser = async (req, res) => {
    try {
        const user = req.body
        user.password = await hashPassword(user.password)
        await sendEmail(user.email, "Thank you for registering - Personal Day", "Your account is created successfully, thank you for coming to Personal Day.")
        const newUser = await authRepositories.registerNewUser(user);
        return res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, message: "User created successfully", data: newUser })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.BAD_REQUEST, message: error.message })
    }

}

export const loginUser = async (req, res) => {
    try {
        const token = await generateToken(req.user._id)

        const device = await deviceInfo(req)

        const type = "Login"
        
        await authRepositories.saveSessions(token, device.os, type,req.user._id)
        await sendEmail(req.user.email, "New login Confirmation - Personal Day", `Thank you, your login on the new device(${device.os}) has succed.`)

        return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: "User logged in successfully", data: { token, user: { Id: req.user._id, Email: req.user.email } } })

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.BAD_REQUEST, message: error.message })
    }
}

export const forgotPassword = async (req, res) => {
    try {
        const token = await generateVerificationCode(6)

        const device = deviceInfo(req)

        const type = "Forgot Password"
        await authRepositories.saveSessions(token, device.os, type, req.user._id)

        await sendEmail(req.user.email, "Forgot Password", `Your verficiation code is ${token}`)

        return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: "Verification code sent successfully to your email.", data: { user: req.user._id, token: token } })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.BAD_REQUEST, message: error.message })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const userId = req.body.userId
        const token = req.body.token

        const password = await hashPassword(req.body.password)
        const updates = { password: password }
        const user = await authRepositories.updateUserByAttributes("_id", userId, updates)

        const deletedToken = await authRepositories.deleteSessionsByAttributes("userId", userId, "token", token)

        return res.status(httpStatus.OK).json({
            status: httpStatus.OK, data: {
                deletedToken: deletedToken,
                user: user
            }
        })

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.BAD_REQUEST, message: error.message })
    }
}