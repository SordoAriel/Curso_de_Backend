export const cleanedUsers = async (obj) => {
    const allUsers = await obj.map(u => (
        {
            Nombre: u.firstName, 
            Apellido: u.lastName,
            Email: u.email,
            Rol: u.role,
            Ultima_Conexion: u.lastConnection 
        }
    ))
    return allUsers
}

export const cleanedUser = (obj) => {
    const {firstName, lastName, role, email, documents} = obj
    const user = {
        Nombre: firstName, 
        Apellido: lastName,
        Email: email,
        Rol: role,
        Documentos: documents
    }
    return user
}