import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,

    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,

    },
    image:{
         type:String,
    },
    stock:{
       type:Number,
       default:0,
    }
},{
    timestamps:true,
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;