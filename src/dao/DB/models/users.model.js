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
        enum: ["user", "premium", "admin"],
        default: "user",
        required: true
    },
    googleRegister: {
        type: Boolean,
        default: false
    },
    documents: {
        type: [
            {
                name: {
                type: String
                },
                reference: {
                    type: String
                }
            },
        ],
        default: [],
        _id: false
    },    
    lastConnection: {
        type: Date,
        default: Date.now
    }
})

export const usersModel = model('users', usersSchema)
