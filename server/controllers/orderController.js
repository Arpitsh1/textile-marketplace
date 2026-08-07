const Order = require("../models/Order");
const Cart = require("../models/Cart");


// ===============================
// CREATE ORDER FROM CART
// ===============================

exports.createOrder = async(req,res)=>{

try{


const cart = await Cart.findOne({

buyer:req.user.id

})
.populate("items.product");



if(!cart || cart.items.length===0){

return res.status(400).json({

message:"Cart is empty"

});

}



// CHECK STOCK

for(const item of cart.items){


if(item.quantity > item.product.stock){


return res.status(400).json({

message:
`${item.product.name} is out of stock`

});


}

}





const totalAmount = cart.items.reduce(

(sum,item)=>

sum + 
(item.product.price * item.quantity),

0

);





const order = await Order.create({

buyer:req.user.id,


items:cart.items.map(item=>({


product:item.product._id,


quantity:item.quantity


})),


totalAmount,


status:"Pending"


});






// REDUCE STOCK

for(const item of cart.items){


item.product.stock -= item.quantity;



if(item.product.stock === 0){

item.product.available=false;

}



await item.product.save();


}





// CLEAR CART

cart.items=[];


await cart.save();






res.json({

success:true,

message:"Order placed successfully",

order

});



}
catch(error){


res.status(500).json({

message:error.message

});


}


};





// ===============================
// BUYER ORDERS
// ===============================

exports.getBuyerOrders = async(req,res)=>{


try{


const orders = await Order.find({

buyer:req.user.id

})
.populate("items.product")
.sort({

createdAt:-1

});



res.json(orders);


}
catch(error){


res.status(500).json({

message:error.message

});


}


};






// ===============================
// SUPPLIER ORDERS
// ===============================

exports.getSupplierOrders = async(req,res)=>{


try{


const orders = await Order.find()

.populate("buyer")

.populate({

path:"items.product",

populate:{

path:"supplier"

}

});





const supplierOrders = orders.filter(order=>


order.items.some(item=>

item.product &&

item.product.supplier &&

item.product.supplier._id.toString()

===

req.user.id


)

);





res.json(supplierOrders);



}
catch(error){


res.status(500).json({

message:error.message

});


}


};







// ===============================
// UPDATE ORDER STATUS
// ===============================

exports.updateOrderStatus = async(req,res)=>{


try{


const order = await Order.findById(

req.params.id

)
.populate({

path:"items.product",

populate:{

path:"supplier"

}

});




if(!order){


return res.status(404).json({

message:"Order not found"

});


}





// supplier ownership check

const allowed = order.items.some(item=>

item.product.supplier._id.toString()

===

req.user.id

);




if(!allowed){


return res.status(403).json({

message:"Not allowed"

});


}





order.status=req.body.status;


await order.save();




res.json({

message:"Order status updated",

order

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};







// ===============================
// GET SINGLE ORDER
// ===============================

exports.getSingleOrder = async(req,res)=>{


try{


const order = await Order.findById(

req.params.id

)

.populate("buyer")

.populate("items.product");





if(!order){


return res.status(404).json({

message:"Order not found"

});


}





res.json(order);



}
catch(error){


res.status(500).json({

message:error.message

});


}


};