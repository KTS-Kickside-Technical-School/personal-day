import express from "express"

import {validateSchema,isUserAlreadyExist,isUserExists, verifyUserCredentials} from "../middlewares/validation.js";
import {registerNewUser,loginUser} from "../modules/auth/authController/authControllers.js";
import { registrationSchema,loginSchema } from "../modules/authValidations/authValidations.js";

const authRouter = express.Router()

console.log(typeof registerNewUser)

authRouter.post("/register",validateSchema(registrationSchema), isUserAlreadyExist,registerNewUser);
authRouter.post("/login",validateSchema(loginSchema),isUserExists,verifyUserCredentials,loginUser)

export default authRouter