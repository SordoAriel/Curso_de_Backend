import {Schema, SchemaTypes, model} from 'mongoose';

const cartsSchema = new Schema({
    products: 
        [{
            product:{
                type: SchemaTypes.ObjectId,
                ref: "products",
                required:true
            },
            quantity:{
                type: Number,
                required: true,
                default: 1
            },
            _id: false,
        }]
})

export const cartsModel = model('carts', cartsSchema)
