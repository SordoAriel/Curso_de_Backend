import passport from "passport";
import config from "./config.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { usersManager } from "./dao/DB/Managers/usersManager.js";
import { cartsManager} from "./dao/DB/Managers/CartsManager.js"
import { hashData, compareData } from "./utils.js";
import { logger } from './winston.js'

passport.use('signup', new LocalStrategy(
    {usernameField: 'email',
    passReqToCallback: true}, 
    async (req, email, password, done) =>{
        try {
            const existingUser = await usersManager.findByEmail(email);
            if(existingUser){
                logger.error('Intento de registro con email ya existente', email)
                return done(null, false)
            }
            const hashedPassword = await hashData(password)
            const newUser = await usersManager.add({
                ...req.body, 
                password:hashedPassword,
                cartId: await cartsManager.add()
            })
            logger.info('Nuevo usuario creado:', newUser.email, newUser.firstName, newUser.lastName)
            done(null, newUser)
        } catch (error) {
            done(error)
        }
        
}));

passport.use('login', new LocalStrategy(
    {usernameField: 'email'},
    async (email, password, done) =>{
        try {
            const existingUser = await usersManager.findByEmail(email)
            if(!existingUser){
                return done(null, false)
            }
            const isValidPassword = await compareData(password, existingUser.password)
            if(!isValidPassword){
                return done(null, false)
            }
            return done(null, existingUser)
        } catch (error) {
            done(error)
        }
    }
));

passport.use('google', new GoogleStrategy(
    {
    clientID: config.google_client_id,
    clientSecret: config.google_client_secret,
    callbackURL: config.google_callback_url
    }, 
    async (accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await usersManager.findByEmail(profile._json.email)
            if(existingUser){
                if(existingUser.googleRegister){
                    done(null, existingUser)
                } else {
                    done(null, false)
                }
            } else {
                const newCart = await cartsManager.add()
                const newUser = {
                    firstName: profile._json.name.split(' ')[0] || profile.username,
                    lastName: profile._json.name.split(' ')[1] || profile.username,
                    email: profile._json.email,
                    password: " ",
                    cartId: newCart,
                    role: "user",
                    googleRegister: true
                } 
                const createdUser = await usersManager.add(newUser)
                logger.info('Nuevo usuario creado desde google:', newUser.email, newUser.firstName, newUser.lastName)
                done(null, createdUser)
            }
        } catch (error) {
            done(error)
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
passport.deserializeUser(async function(id, done) {
    try {
        const user= await usersManager.getById(id)
        done(null, user);
    } catch (error) {
        done (error)
    }
});
