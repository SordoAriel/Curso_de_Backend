import jwt from "jsonwebtoken"
import config from "./config.js"

export const generateToken = (user) => {
    const token = jwt.sign({user}, config.jwt_secret_key, {expiresIn: '24h'})
    return token
}

export const generateNewPassToken = (email) => {
    const timestamp = Date.now();
    return jwt.sign({email}, config.jwt_secret_key, {expiresIn: '1h'})
}

export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwt_secret_key, (err, decoded) => {
            if (err) {
                resolve(-1);
            } else {
                const email = decoded.email;
                resolve(email);
            }
        });
    });
};
