import {Schema, model} from 'mongoose';

const ticketsSchema = new Schema({
    code:{
        type: String,
        required: true,
        unique: true
    },
    purchase_datatime:{
        type: Date,
        required: true,
        default: Date
    },
    amount:{
        type: Number,
        required: true
    },
    purchaser:{
        type: String,
        required: true
    }
})

export const ticketsModel = model('tickets', ticketsSchema)