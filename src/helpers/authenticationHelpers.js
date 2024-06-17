import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "dotenv"

config()

export const hashPassword =async (password)=> {
    return await bcrypt.hash(password,Number(process.env.HASH_SALT))
}

export const generateToken = async (userId)=> {
    return jwt.sign({userId}, process.env.JWT_SECRET_KEY)
}