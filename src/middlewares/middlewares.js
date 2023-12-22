import CustomizedError from "../errors/customized.errors.js";
import { errorMessages } from "../errors/errors.enum.js";
import { logger } from "../winston.js";

export const usersAccess = (req, res, next) => {
    const role = req.user.role
    if(role !== "user") {
        logger.warning('Usuario intentando ejecutar acción para la cual no está autorizado')
        CustomizedError.currentError(errorMessages.UNAUTHORIZED)
    } else {
    next()
    }
}

export const adminAccess = (req, res, next) => {
    const role = req.user.role
    if (role !== "admin"){
        logger.warning('Administrador intentando ejecutar acción para la cual no está autorizado')
        CustomizedError.currentError(errorMessages.UNAUTHORIZED)
    } else {
        next()
    }
}