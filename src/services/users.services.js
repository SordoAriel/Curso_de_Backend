import { usersManager } from "../dao/DB/Managers/usersManager.js";
import { cleanedUser, cleanedUsers } from "../DTOs/users.dto.js"
import { hashData, compareData } from "../utils.js";

export const get = async () => {
    const users = await usersManager.get();
    const response = await cleanedUsers(users)
    return response
}

export const getByEmail = async (email) => {
    const user = await usersManager.findByEmail(email);
    const response = await cleanedUser(user)    
    return response
}

export const changePassword = async (email, password) => {
    const user = await usersManager.findByEmail(email);
    if(!user){
        return -1
    }
    const hashedPassword = await hashData(password);
    const samePassword = await compareData(password, user.password)
    if(samePassword){
        return -2
    } else {
        usersManager.update(user._id, {password: hashedPassword});
        return 1
    }
}

export const updateRol = async (email, rol) => {
    if(rol !== "user" && rol !== "premium"){
        return -2
    } else {
        const user = await usersManager.findByEmail(email);
        if(!user){
            return -1
        }
        const usersRol = await usersManager.update(user._id, {role: rol})
        return usersRol
    }
}
