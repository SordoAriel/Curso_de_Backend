import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { usersManager } from "./dao/DB/Managers/usersManager.js";
import { hashData, compareData } from "./utils.js";

passport.use('signup', new LocalStrategy(
    {usernameField: 'email',
    passReqToCallback: true}, 
    async (req, email, password, done) =>{
        try {
            const existingUser = await usersManager.findByEmail(email);
            if(existingUser){
                return done(null, false)
            }
            const hashedPassword = await hashData(password)
            const newUser = await usersManager.add({...req.body, password:hashedPassword})
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

passport.use('github', new GithubStrategy({
    clientID: "Iv1.aa46ac57234901ee",
    clientSecret: "cd7c4281756cab369f0f534c6e771d12bf9b4b9d",
    callbackURL: "http://localhost:8080/api/users/github"
}, async (accessToken, refreshToken, profile, done) =>{
    try {
        const existingUser = await usersManager.findByEmail(profile._json.email)
        if(existingUser){
            if(existingUser.githubRegister){
                done(null, existingUser)
            } else {
                done(null, false)
            }
        } else {
        const newUser = {
            firstName: profile.username,
            lastName: profile.username,
            email: profile._json.email,
            password: profile._json.id,
            githubRegister: true
        } 
        const createdUser = await usersManager.add(newUser)
        done(null, createdUser)
        }
    } catch (error) {
        done(error)
    }
}))

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
