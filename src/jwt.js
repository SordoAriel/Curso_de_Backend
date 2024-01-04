import jwt from "jsonwebtoken"
import config from "./config.js"

export const generateToken = () => {
    const timestamp = Date.now();
    return jwt.sign({timestamp}, config.jwt_secret_key, {expiresIn: 30})
}

export const verifyToken = (token) => {
    console.log('token',token)
    jwt.verify(token, config.jwt_secret_key, (err, decoded) => {
        if (err) {
        return false
        }
        if (decoded.timestamp && decoded.timestamp + 30000 > Date.now()) {
            return true
        } else {
            return false
        }
    });
}
