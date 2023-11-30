import { Router } from "express";
import passport from "passport";
import { currentUser, logout } from "../controllers/sessions.controller.js";
import { usersAccess } from "../middlewares/middlewares.js";


const router = Router();

router.get("/logout", logout);

router.post('/signup', passport.authenticate('signup'), (req, res) =>{
    res.status(200).redirect('http://localhost:8080/products')
})

router.post('/login', passport.authenticate('login'), (req, res) =>{
    res.status(200).redirect('http://localhost:8080/products')
})

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { successRedirect: '/products', failureRedirect: '/login' })
);

router.get('/current', usersAccess, currentUser)
export default router