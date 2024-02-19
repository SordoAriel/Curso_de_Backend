import { Router } from "express";
import passport from "passport";
import { currentUser, logout } from "../controllers/sessions.controller.js";
import { authorizationMiddleware } from "../middlewares/middlewares.js";


const router = Router();

router.get("/logout", logout);

router.post('/signup', passport.authenticate('signup'), (req, res) =>{
    res.status(200).redirect('/products')
})

router.post('/login', passport.authenticate('login'), (req, res) =>{
    res.status(200).redirect('/products')
})

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { successRedirect: '/products', failureRedirect: '/login' })
);

router.get('/current', authorizationMiddleware(["user", "premium"]), currentUser)
export default router