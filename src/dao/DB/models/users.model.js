import { Schema, SchemaTypes, model} from "mongoose";

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
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    cartId: {
        type: SchemaTypes.ObjectId, 
        ref: "carts",
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        required: true
    },
    googleRegister: {
        type: Boolean,
        default: false
    }
})

export const usersModel = model('users', usersSchema)
