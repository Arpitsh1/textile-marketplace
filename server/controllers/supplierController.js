const Product = require("../models/Product");
const Order = require("../models/Order");




// SUPPLIER DASHBOARD DATA

exports.getSupplierDashboard = async(req,res)=>{


try{


const supplierId = req.user.id;



const products = await Product.find({

supplier:supplierId

});




const orders = await Order.find()

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

item.product.supplier.toString()

===

supplierId

)

);






const totalProducts = products.length;



const activeProducts = products.filter(product=>

product.available

).length;





const pendingOrders = supplierOrders.filter(order=>

order.status==="Pending"

).length;





const deliveredOrders = supplierOrders.filter(order=>

order.status==="Delivered"

).length;






const revenue = supplierOrders

.filter(order=>

order.status==="Delivered"

)

.reduce(

(total,order)=>

total + order.totalAmount,

0

);





res.json({

totalProducts,

activeProducts,

totalOrders:supplierOrders.length,

pendingOrders,

deliveredOrders,

revenue

});



}
catch(error){


res.status(500).json({

message:error.message

});


}


};