import {Schema, model} from 'mongoose';

const cartsSchema = new Schema({
    products: [
            {
            _id:{
                type: String,
                required: true
            },
            quantity:{
                type: Number,
                required: true,
                default: 1
            }        
        }
    ]
})

export const cartsModel = model('carts', cartsSchema)
