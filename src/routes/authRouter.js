import express from "express"

import {
    validateSchema,
    isUserAlreadyExist,
    isUserExists,
    verifyUserCredentials,
    isTokenValid
} from "../middlewares/validation.js";
import {
    registerNewUser,
    loginUser,
    forgotPassword,
    resetPassword,
    logout
} from "../modules/auth/authController/authControllers.js";
import { registrationSchema, loginSchema, forgotPasswordSchema, verifyPasswordSchema } from "../modules/auth/authValidations/authValidations.js";
import { userAuthorization } from "../middlewares/authorization.js";
const authRouter = express.Router()


authRouter.post("/register", validateSchema(registrationSchema), isUserAlreadyExist, registerNewUser);
authRouter.post("/login", validateSchema(loginSchema), isUserExists, verifyUserCredentials, loginUser)
authRouter.post("/forgot-password", validateSchema(forgotPasswordSchema), isUserExists, forgotPassword)
authRouter.post("/reset-password", validateSchema(verifyPasswordSchema), isUserExists, isTokenValid, resetPassword)
authRouter.post("/logout", userAuthorization(['client', 'admin']), logout)

export default authRouter