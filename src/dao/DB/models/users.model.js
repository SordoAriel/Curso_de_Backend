import { Schema, model} from "mongoose";

const usersSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    githubRegister: {
        type: Boolean,
        default: false
    }
})

export const usersModel = model('users', usersSchema)
