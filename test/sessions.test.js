import { expect }from "chai"
import supertest from "supertest";
import "../src/dao/DB/db/configDB.js"
import mongoose from "mongoose";

const requester = supertest('http://localhost:8080');

describe("SignUp", () => {
    it("Creación de usuario correcta", async function () {
        this.timeout(10000)
        const user = {
            firstName: "Johann Sebastian",
            lastName: "Mastropiero",
            email: "jsmastropiero@mail.com",
            password: "123456"
        }
        const result = await requester.post('/api/sessions/signup').send(user)
        const newUser = await mongoose.connection.collection("users").findOne({email: user.email})
        expect(result).to.be.ok
        expect(newUser).to.have.property("_id")
        expect(user.password).to.not.be.equal(newUser.password)
        await mongoose.connection.collection("users").findOneAndDelete({email: user.email})
    })
})

describe("Login", () => {
    it("Login correcto", async function () {
        this.timeout(10000)
        const user = {
            email: "pvalderrama@mail.com",
            password: "123456"
        }
        const result = await requester.post('/api/sessions/login').send(user)
        const cookieRes = result.res.rawHeaders[11]
        expect(cookieRes).to.be.ok
        const cookie1 = cookieRes.split("%3A")[1]
        const cookie = cookie1.split(".")[0]
        expect(cookie).to.be.a('string')
        const sessionId = await mongoose.connection. collection("sessions").findOne({_id: cookie})
        const user1 = sessionId.session.split("user")[1]
        const user2 = user1.split(":")[1].split("}}")[0]
        const userId = user2.slice(1, -1);
        const userlogged = await mongoose.connection.collection("users").findOne({email: user.email})
        const userLoggedId = userlogged._id.toString()
        expect(userLoggedId).to.be.equal(userId)
    })
})

describe("Logout", () => {
    it("Cierre de sesión correcto", async function (){
        this.timeout(10000)
        const user = {
            email: "pvalderrama@mail.com",
            password: "123456"
        }
        const logedIn = await requester.post('/api/sessions/login').send(user)
        const cookieRes = logedIn.res.rawHeaders[11]
        const cookie1 = cookieRes.split("%3A")[1]
        const cookie = cookie1.split(".")[0]
        const sessionId = await mongoose.connection. collection("sessions").findOne({_id: cookie})
        expect(sessionId).to.be.ok
        const logedOut = await requester.get('/api/sessions/logout')
        expect(logedOut.res.headers.vary).to.not.include('set-cookie')
    })
})