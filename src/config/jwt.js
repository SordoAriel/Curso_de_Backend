import jwt from "jsonwebtoken"
import config from "./config.js"

export const generateToken = (user) => {
    const token = jwt.sign({user}, config.jwt_secret_key, {expiresIn: '24h'})
    return token
}

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader){
        res.status(401).send('Error: usuario no autenticado')
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, config.jwt_secret_key, (error, credentials) => {
        if(error){
            res.status(403).send('Error: usuario no autorizado')
        }
        req.user = credentials.user;
        next();
    })
}

export const generateNewPassToken = (email) => {
    const timestamp = Date.now();
    return jwt.sign({email}, config.jwt_secret_key, {expiresIn: 60})
}

/*export const verifyToken = async (token, res, next) => {
    console.log('tokentoken', token);
    if(!token){
        return false
    }
    try {
        const email = jwt.verify(token, config.jwt_secret_key)
        req.user = email
        next()
    } catch (error) {
        return false
    }    
}*/

export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwt_secret_key, (err, decoded) => {
            if (err) {
                console.log('err', err);
                reject(err);
            } else {
                const email = decoded.email;
                resolve(email);
        }
    });
});
};
