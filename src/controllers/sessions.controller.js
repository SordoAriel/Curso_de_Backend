import CustomizedError from "../errors/customized.errors.js";
import { errorMessages } from "../errors/errors.enum.js";
import { modifyLastConnection } from "../services/users.services.js"

export const logout = async (req, res) =>{
    const userId = req.user._id
    const lastConnection = await modifyLastConnection(userId)
    req.session.destroy(() =>{
        res.redirect("http://localhost:8080/login")
    })
};

export const currentUser = async (req, res) =>{
    try {
        if(!req.user){
            CustomizedError.currentError(errorMessages.UNAUTENTICATED)
        } else {
            const user = {
                Nombre: req.user.firstName,
                Apellido: req.user.lastName,
                Email: req.user.email,
                Edad: req.user.age ? req.user.age : " ",
                Rol: req.user.role
            }
            res.status(200).json({Datos_del_usuario: user})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};
