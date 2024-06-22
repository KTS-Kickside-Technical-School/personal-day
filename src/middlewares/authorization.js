import httpStatus from "http-status";

import { decodeToken } from "../helpers/authenticationHelpers.js";
import authRepositories from "../modules/auth/authRepository/authRepositories.js";
export const userAuthorization = function (type) {
    return async (req, res, next) => {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];

            if (!token) {
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .json({ status: httpStatus.UNAUTHORIZED, message: "No token provided" });
            }

            const decoded = await decodeToken(token);

            const session = await authRepositories.getSessionBYAttributes("userId", decoded.userId, "token", token);
            if (!session) {
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .json({ status: httpStatus.UNAUTHORIZED, message: "Not authorized" });
            }

            const user = await authRepositories.findUserByAttribute("_id", decoded.userId);
            if (!user) {
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .json({ status: httpStatus.UNAUTHORIZED, message: "User Not authorized" });
            }


            if (!type.includes(user.type)) {
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .json({ status: httpStatus.UNAUTHORIZED, message: "User  role Not authorized" });
            }

            req.user = user;
            req.session = session;
            next();
        } catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            });
        }
    };
};