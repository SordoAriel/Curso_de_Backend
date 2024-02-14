import { get, findById, getByEmail, changePassword, updateRol, updateDocuments, del, deleteInactive } from "../services/users.services.js"
import CustomizedError from "../errors/customized.errors.js";
import { errorMessages } from "../errors/errors.enum.js";
import { transporter } from "../utils/nodemailer.js";
import { generateNewPassToken, verifyToken } from "../config/jwt.js";
import { cpUpload } from "../middlewares/multer.middleware.js";

export const getAllUsers = async (req, res) => {
    const users = await get();
    res.status(200).send(users)
};

export const getOneByEmail = async (req, res) => {
    const {email } = req.params;
    try {
        const user = await getByEmail(email);
        if(user){
            res.status(200).send({message: user})
        } else {
            CustomizedError.currentError(errorMessages.UNAUTENTICATED)
        }
    } catch (error) {
        res.send(error.message)
    }
};

export const resetPassword = async (req, res) => {
    const {email} = req.body
    try {
        const user = await getByEmail(email);
    if(!user){
        CustomizedError.currentError(errorMessages.MAIL_NOT_FOUND)
    } else {
        const token = generateNewPassToken(email)
        const resetPassMail = {
            from: 'a.a.sordo@gmail.com',
            to: email,
            subject: `Reestablecimiento de contraseña`,
            html: `<h1>Reestablecimiento de contraseña</h1>
                    <h2> Estimado cliente ${user.Nombre} ${user.Apellido}:</h2>
                    <h2> Email: ${email}</h2>
                    <p>Para reestablecer tu contraseña, haga click en el enlace a continuación y siga las instrucciones</p>
                    <a href='http://localhost:8080/newpassword/${token}'>Nueva contraseña</a>
                `
        }
        await transporter.sendMail(resetPassMail)
        res.status(200).send(`Hemos enviado un mail a tu casilla de correos de ${email}`)
    }
    } catch (error) {
        res.send(error.message)
    }
}

export const newPassword = async (req, res) => {
    const token = req.params.email;
    const {password} = req.body
    const email = await verifyToken(token);
    if(email === -1){
        res.redirect(404, "http://localhost:8080/login")
    }
    try {
        if(email){
        const passwordChange = await changePassword(email, password)
        if(passwordChange === -1){
            CustomizedError.currentError(errorMessages.MAIL_NOT_FOUND)
        } 
        if(passwordChange === -2){ 
            res.send('No es posible utilizar la misma contraseña que antes')
        } 
        if (passwordChange === 1) {
            res.redirect("http://localhost:8080/login")
        }
     }
    
    } catch (error) {
        error.message
    }
}

export const changeRol = async (req, res) => {
    const {email} = req.params
    const {rol} = req.body 
    try {
        const newRol = await updateRol(email, rol);
        if(newRol === -1){
            res.status(400).send(`No fue posible cambiar el rol del usuario ${email}`)
        } else if(newRol === -3){
            res.status(403).send('Este usuario no cumple con todas las condiciones para ser premium')
        } else {
        res.status(200).send(`Rol modificado, ahora ${email} es ${rol}`)
        }
    } catch (error) {
        error.message
    }
}

export const addDocuments = async (req, res) => {
    const { id } = req.params;

    let docs = []

    if(req.files && req.files.profileImage){
        const profileImgRef = req.files.profileImage[0]
        const profileImg = {
            name: id + '-' + 'profileImage',
            reference: profileImgRef.path
        }
        docs.push(profileImg)
    }

    if(req.files && req.files.productsImages){
        const productsImg = req.files.productsImages.map((img) => {
            return {
                name: id + '-' + 'productImg', 
                reference: img.path
                }
            })
            docs.push(...productsImg)
    }

    if(req.files && req.files.identification){
        const identification = {
            name: id + '-' + 'identification',
            reference: req.files.identification[0].path
        }
        docs.push(identification)
    }

    if(req.files && req.files.proofOfAdress){
        const proofOfAdress = {
            name: id + '-' + 'proofOfAdress',
            reference: req.files.proofOfAdress[0].path
        }
        docs.push(proofOfAdress)
    }

    if(req.files && req.files.proofOfAccountStatus){
        const proofOfAccountStatus = {
            name: id + '-' + 'proofOfAccountStatus',
            reference: req.files.proofOfAccountStatus[0].path
        }
        docs.push(proofOfAccountStatus)
    }

    if(req.files.length === 0){
        res.status(400).send({message: 'Ningún archivo cargado'})
    } 

    const uploadDocuments = await updateDocuments(id, docs )
    res.status(200).send({message: 'Perfil actualizado', Documentación: uploadDocuments})
};

export const deleteUser = async (req, res) => {
    const {email} = req.params
    try {
        const deletedUser = await del(email)
        res.status(200).send('Usuario eliminado', deletedUser)
    } catch (error) {
        error.message
    }
}

export const deleteInactiveUsers = async (req, res) => {
    try {
        const delInactive = await deleteInactive()
        res.status(200).send({'Usuarios inactivos eliminados': delInactive})
    } catch (error) {
        res.status(500).send('Error al intentar eliminar los usuarios inactivos')
    }
    
}