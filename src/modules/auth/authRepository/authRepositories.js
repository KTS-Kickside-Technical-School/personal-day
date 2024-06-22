import httpStatus from "http-status";

import User from "../../../databases/models/users.js";
import Sessions from "../../../databases/models/sessions.js";

const findUserByAttribute = async (key, value) => {
    const query = {};
    query[key] = value;
    return await User.findOne(query);
}

const registerNewUser = async (user) => {
    return await User.create({ email: user.email, password: user.password })
}

const saveSessions = async (token, device, type, userId) => {
    return await Sessions.create({
        token: token,
        device: device,
        type: type,
        userId: userId
    })
}

const getSessionBYAttributes = async (key1, value1, key2, value2) => {
    return await Sessions.findOne({ [key1]: value1, [key2]: value2 })
}

const deleteSessionsByAttributes = async (key1, value1, key2, value2) => {
    return await Sessions.findOneAndDelete({ [key1]: value1, [key2]: value2 })
}

const updateUserByAttributes = async (key, value, updates) => {
    return await User.findOneAndUpdate({ [key]: value }, updates,{new: true})
}
export default { registerNewUser, findUserByAttribute, saveSessions, updateUserByAttributes, getSessionBYAttributes, deleteSessionsByAttributes };