import { usersManager } from "../dao/DB/Managers/usersManager.js";
import { cleanedUser, cleanedUsers } from "../DTOs/users.dto.js"

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
