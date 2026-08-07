const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(

{

name:{
type:String,
required:true
},


category:{
type:String,
required:true
},


description:{
type:String
},


price:{
type:Number,
required:true
},


stock:{
type:Number,
required:true,
default:0
},


colors:[String],


image:{
type:String,
default:"https://via.placeholder.com/300"
},


available:{
type:Boolean,
default:true
},


supplier:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
}


},

{
timestamps:true
}

);



module.exports =
mongoose.model("Product",productSchema);