export const cleanedUsers = (obj) => {
    const allUsers = obj.map(u => (
        {
            Nombre: u.firstName, 
            Apellido: u.lastName,
            Email: u.email,
            Rol: u.role 
        }
    ))
    return allUsers
}

export const cleanedUser = (obj) => {
    const {firstName, lastName, role, email} = obj
    const user = {
        Nombre: firstName, 
        Apellido: lastName,
        Email: email,
        Rol: role
    }
    return user
}