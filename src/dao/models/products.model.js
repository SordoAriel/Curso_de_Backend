import {Schema, model} from 'mongoose';

const productsSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    code:{
      type: String,
      required: true,
      unique: true
    },
    price:{
      type: Number,
      required: true
    },
    stock:{
      type: Number,
      required: true
    },
    category:{
      type: String,
      required: true
    },
    thumbnail:{
      type: Array,
      default: []
    },  
    status:{
      type: Boolean,
      default: true
    }
})

export const productsModel = model('products', productsSchema)
