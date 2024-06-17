import httpStatus from "http-status";

import User from "../../../databases/models/users.js";

const findUserByAttribute = async (key, value) => {
    const query = {};
    query[key] = value;
    return await User.findOne(query);
}

const registerNewUser = async (user) => {
    return await User.create({ email: user.email, password: user.password })
}

export default { registerNewUser, findUserByAttribute };