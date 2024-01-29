import CustomizedError from "../errors/customized.errors.js";
import { errorMessages } from "../errors/errors.enum.js";
import { logger } from "../utils/winston.js";

export const authorizationMiddleware = (roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            logger.warning('Usuario intentando ejecutar acción para la cual no está autorizado')
            return CustomizedError.currentError(errorMessages.UNAUTHORIZED)
        }
        next()
    }
}

export const usersAccess = (req, res, next) => {
    if(req.user.role !== "user" && req.user.role !== "premium") {
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

export const manageProductsAccess = (req, res, next) => {
    const role = req.user.role
    if( role !== "admin" && role !== "premium"){
        logger.warning('Usuario intentando crear un producto')
        CustomizedError.currentError(errorMessages.UNAUTHORIZED)
    } else {
        next()
    }
}

export const deleteProducts = (req, res, next) => {
    const role = req.user.role;
    switch (role) {
        case "admin":
            next()
            break;
        case "premium":
            next()
            break;
        case "user":
            logger.warning("Usuario intentando eliminar producto")
            CustomizedError.currentError(errorMessages.UNAUTHORIZED)
            break;
        break;
    }
}
