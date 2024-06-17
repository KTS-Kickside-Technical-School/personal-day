import bcrypt from "bcrypt"
import { config } from "dotenv"

config()

const hashPassword =async (password)=> {
    return await bcrypt.hash(password,Number(process.env.HASH_SALT))
}

export default hashPassword