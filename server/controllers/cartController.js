const Cart = require("../models/Cart");


// Add to Cart

exports.addToCart = async(req,res)=>{

try{


let cart = await Cart.findOne({

buyer:req.user.id

});



if(!cart){

cart = new Cart({

buyer:req.user.id,

items:[]

});

}



const existingItem =
cart.items.find(

item =>
item.product.toString()
===
req.body.productId

);



if(existingItem){

existingItem.quantity += 1;

}
else{

cart.items.push({

product:req.body.productId,

quantity:1

});

}



await cart.save();



res.json({

success:true,

message:"Added to cart",

cart

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};




// Get Cart

exports.getCart = async(req,res)=>{

try{


const cart = await Cart.findOne({

buyer:req.user.id

})
.populate("items.product");



if(!cart){

return res.json({

items:[]

});

}



res.json(cart);


}
catch(error){


res.status(500).json({

message:error.message

});


}


};

// Update quantity

exports.updateCartQuantity = async(req,res)=>{


try{


const cart = await Cart.findOne({

buyer:req.user.id

});


const item = cart.items.find(

item =>
item.product.toString()
===
req.params.productId

);



if(!item){

return res.status(404).json({

message:"Product not in cart"

});

}



item.quantity = req.body.quantity;


await cart.save();



res.json({

success:true,

cart

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};




// Remove item from cart

exports.removeFromCart = async(req,res)=>{


try{


const cart = await Cart.findOne({

buyer:req.user.id

});



cart.items =
cart.items.filter(

item =>
item.product.toString()
!==
req.params.productId

);



await cart.save();



res.json({

success:true,

cart

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};