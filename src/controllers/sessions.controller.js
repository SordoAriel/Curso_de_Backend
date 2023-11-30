export const logout = async (req, res) =>{
    req.session.destroy(() =>{
        res.redirect("http://localhost:8080/login")
    })
};

export const currentUser = async (req, res) =>{
    try {
        if(!req.user){
            res.status(401).json("Oops! Parece que no estás logueado")
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
        res.status(500).json(error)
    }
};
