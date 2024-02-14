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
