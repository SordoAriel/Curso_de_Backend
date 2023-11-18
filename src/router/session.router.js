import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/logout", async (req, res) =>{
    req.session.destroy(() =>{
        res.redirect("http://localhost:8080/login")
    })
})

router.post('/signup', passport.authenticate('signup'), (req, res) =>{
    res.status(200).redirect('http://localhost:8080/products')
})

router.post('/login', passport.authenticate('login'), (req, res) =>{
    res.status(200).redirect('http://localhost:8080/products')
})

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }), 
);

router.get('/github', 
passport.authenticate('github', { successRedirect: '/products', failureRedirect: '/login' }),
);

router.get('/current', async (req, res) =>{
    try {
        if(!req.user){
            res.status(401).json("Oops! Parece que no estás logueado")
        } else {
            const user = {
                Nombre: req.user.firstName,
                Apellido: req.user.lastName,
                Email: req.user.email,
                Edad: req.user.age ? req.user.age : " "
            }
            res.status(200).json({Datos_del_usuario: user})
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
export default router