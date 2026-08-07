const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");


// CREATE PRODUCT
exports.createProduct = async(req,res)=>{
try{

let imageUrl = "";


// If image uploaded as file
if(req.file){

const result = await cloudinary.uploader.upload(

`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,

{
folder:"textilehub/products"
}

);

imageUrl = result.secure_url;

}


// If image URL entered manually
if(req.body.image){

imageUrl = req.body.image;

}


const product = await Product.create({

...req.body,

image:imageUrl,

supplier:req.user.id

});


res.status(201).json(product);


}
catch(error){

res.status(500).json({

message:error.message

});

}

};




// GET ALL PRODUCTS
exports.getProducts = async(req,res)=>{

try{

const {
search,
category,
sort
}=req.query;


let query={};


if(search){

query.name={
$regex:search,
$options:"i"
};

}


if(category && category!=="All"){

query.category=category;

}


let productsQuery = Product.find(query);



if(sort==="low"){

productsQuery.sort({
price:1
});

}


if(sort==="high"){

productsQuery.sort({
price:-1
});

}



const products = await productsQuery;


res.json(products);


}
catch(error){

res.status(500).json({

message:error.message

});

}

};




// GET SUPPLIER PRODUCTS
exports.getSupplierProducts = async(req,res)=>{

try{


const products = await Product.find({

supplier:req.user.id

});


res.json(products);


}
catch(error){

res.status(500).json({

message:error.message

});

}

};






// GET SINGLE PRODUCT
exports.getSingleProduct = async(req,res)=>{

try{


const product = await Product.findById(
req.params.id
);


if(!product){

return res.status(404).json({

message:"Product not found"

});

}


res.json(product);


}
catch(error){

res.status(500).json({

message:error.message

});

}

};






// UPDATE PRODUCT
exports.updateProduct = async(req,res)=>{

try{


const product = await Product.findById(
req.params.id
);



if(!product){

return res.status(404).json({

message:"Product not found"

});

}



if(product.supplier.toString() !== req.user.id){

return res.status(403).json({

message:"Not allowed"

});

}




product.name = req.body.name ?? product.name;


product.category = req.body.category ?? product.category;


product.description = req.body.description ?? product.description;


product.price = req.body.price ?? product.price;


product.stock = req.body.stock ?? product.stock;


product.colors = req.body.colors ?? product.colors;



// IMPORTANT IMAGE UPDATE

if(req.body.image){

product.image = req.body.image;

}



await product.save();



res.json({

message:"Product updated successfully",

product

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};






// DELETE PRODUCT
exports.deleteProduct = async(req,res)=>{

try{


const product = await Product.findById(
req.params.id
);



if(!product){

return res.status(404).json({

message:"Product not found"

});

}



if(product.supplier.toString() !== req.user.id){

return res.status(403).json({

message:"Not allowed"

});

}



await product.deleteOne();



res.json({

message:"Product deleted successfully"

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};






// UPDATE AVAILABILITY
exports.updateAvailability = async(req,res)=>{

try{


const product = await Product.findById(
req.params.id
);



if(!product){

return res.status(404).json({

message:"Product not found"

});

}



if(product.supplier.toString() !== req.user.id){

return res.status(403).json({

message:"Not allowed"

});

}



product.available = req.body.available;


await product.save();



res.json({

message:"Availability updated",

product

});


}
catch(error){

res.status(500).json({

message:error.message

});

}

};