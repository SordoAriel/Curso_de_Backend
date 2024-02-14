import { usersManager } from "../dao/DB/Managers/usersManager.js";
import { cleanedUser, cleanedUsers } from "../DTOs/users.dto.js"
import { hashData, compareData } from "../utils/utils.js";

export const get = async () => {
    const users = await usersManager.get();
    const response = await cleanedUsers(users)
    return response
}

export const findById = async (id) => {
    const user = await usersManager.getById(id);
    const response = cleanedUser(user)
    return response
}

export const getByEmail = async (email) => {
    const user = await usersManager.findByEmail(email);
    const response = cleanedUser(user)    
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
        if(user.role === "user"){
            if (!['identification', 'proofOfAdress', 'proofOfAccountStatus'].every(type => 
                user.documents.some(doc => doc.name === user._id + '-' + type)
              )) {
                return -3;
              }
        }
        
        const usersRol = await usersManager.update(user._id, {role: rol})
        return usersRol
    }
}

export const updateDocuments = async (id, docs) => {
    const response = await usersManager.updateMany({_id: id}, docs)
    return response
}

export const modifyLastConnection = async (id) => {
    const newDate = await usersManager.update({_id: id}, {lastConnection: Date.now()})
}

export const del = async (email) => {
    const userToDelete = await usersManager.deleteByEmail(email)
    return userToDelete
}

export const deleteInactive = async () => {
    const users = await usersManager.get()
    const notAdminUsers = users.filter( u => u.role !== "admin")
    const twoHoursAgo = Date.now() - (2 * 60 * 60 * 1000); 
    const filteredUsers = notAdminUsers.filter(u => u.lastConnection < twoHoursAgo);
    const usersToDelete = filteredUsers.map(u => u.email)
    await usersManager.deleteMany(usersToDelete)
    return cleanedUsers(filteredUsers)
}
