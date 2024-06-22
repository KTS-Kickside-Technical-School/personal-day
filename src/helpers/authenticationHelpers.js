import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import useragent from "useragent"
import crypto from "crypto"

import { config } from "dotenv"

config()

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, Number(process.env.HASH_SALT))
}

export const generateToken = async (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY)
}

export const decodeToken = async (token) => {
    return jwt.verify( token , process.env.JWT_SECRET_KEY)
}
export const deviceInfo = async (req) => {
    const agent = useragent.parse(req.headers['user-agent']);
    const device = {
        browser: agent.toAgent(),
        os: agent.os.toString(),
        platform: agent.device.toString()
    };
    return device;
}

export const generateVerificationCode = async (length) => {
    const buffer = await crypto.randomBytes(Math.ceil(length / 2));

    const code = buffer.toString('hex').slice(0, length);
    return code;
}


