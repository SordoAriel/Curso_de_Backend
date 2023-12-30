import { get, getByEmail, changePassword, updateRol } from "../services/users.services.js"
import CustomizedError from "../errors/customized.errors.js";
import { errorMessages } from "../errors/errors.enum.js";
import { transporter } from "../nodemailer.js";

export const getAllUsers = async (req, res) => {
    const users = await get();
    res.status(200).json({message: users})
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
        const resetPassMail = {
            from: 'a.a.sordo@gmail.com',
            to: email,
            subject: `Reestablecimiento de contraseña`,
            html: `<h1>Reestablecimiento de contraseña</h1>
                    <h2> Estimado cliente ${user.Nombre} ${user.Apellido}:</h2>
                    <h2> Email: ${email}</h2>
                    <p>Para reestablecer tu contraseña, haga click en el enlace a continuación y siga las instrucciones</p>
                    <a href="http://localhost:8080/newpassword/${email}">Nueva contraseña</a>
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
    const {email} = req.params
    const {password} = req.body
    try {
        const passwordChange = await changePassword(email, password)
        console.log('passchange', passwordChange)
        if(passwordChange === -1){
            CustomizedError.currentError(errorMessages.MAIL_NOT_FOUND)
        } 
        if(passwordChange === -2){ 
            res.send('No es posible utilizar la misma contraseña que antes')
        } 
        if (passwordChange === 1) {
            res.redirect("http://localhost:8080/login")
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
        } else {
        res.status(200).send(`Rol modificado, ahora ${email} es ${rol}`)
        }
    } catch (error) {
        error.message
    }
}
