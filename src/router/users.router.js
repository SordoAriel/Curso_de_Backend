import { Router } from "express";
import { usersManager } from "../dao/DB/Managers/usersManager.js";
import passport from "passport";

const router = Router()

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

export default router;
