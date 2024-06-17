import express from "express"

import {validateSchema,isUserAlreadyExist} from "../middlewares/validation.js";
import {registerNewUser} from "../modules/auth/authController/authControllers.js";
import { registrationSchema } from "../modules/authValidations/authValidations.js";

const authRouter = express.Router()

console.log(typeof registerNewUser)

authRouter.post("/register",validateSchema(registrationSchema), isUserAlreadyExist,registerNewUser);


export default authRouter