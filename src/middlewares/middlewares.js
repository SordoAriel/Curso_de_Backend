export const usersAccess = (req, res, next) => {
    const role = req.user.role
    if(role !== "user") {
        res.status(403).send("No estás autorizado para realizar esta acción")
    } else {
    next()
    }
}

export const adminAccess = (req, res, next) => {
    const role = req.user.role
    if (role !== "admin"){
        res.send("No estás autorizado para acceder a esta función")
    } else {
        next()
    }
}