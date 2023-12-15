import CustomizedError from "../errors/customized.errors.js";
import { errorMessages } from "../errors/errors.enum.js";

export const usersAccess = (req, res, next) => {
    const role = req.user.role
    if(role !== "user") {
        CustomizedError.currentError(errorMessages.UNAUTHORIZED)
    } else {
    next()
    }
}

export const adminAccess = (req, res, next) => {
    const role = req.user.role
    if (role !== "admin"){
        CustomizedError.currentError(errorMessages.UNAUTHORIZED)
    } else {
        next()
    }
}