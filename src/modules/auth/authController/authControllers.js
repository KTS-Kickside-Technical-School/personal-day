import httpStatus from "http-status"

import authRepositories from "../authRepository/authRepositories.js"
import hashPassword from "../../../helpers/hashpassword.js"


export const registerNewUser = async (req, res) => {
    const user = req.body
    user.password =await hashPassword(user.password)
    const newUser = await authRepositories.registerNewUser(user);
    return res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, message: "User created successfully", data: newUser })
}

