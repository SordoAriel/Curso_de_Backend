import { usersManager } from "../dao/DB/Managers/usersManager.js";

export const get = async () => {
    const users = await usersManager.get();
    const cleanedUsers = users.map(u => (
        {
            Nombre: u.firstName, 
            Apellido: u.lastName,
            Email: u.email,
            Rol: u.role 
        }
    ));
    return cleanedUsers
}

export const getByEmail = async (email) => {
    const user = await usersManager.findByEmail(email);
    const {firstName, lastName, role} = user
    const cleanedUser = {
        Nombre: firstName, 
        Apellido: lastName,
        Email: email,
        Rol: role
    }
    return cleanedUser
}
