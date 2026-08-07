const express = require("express");

const router = express.Router();


const authMiddleware =
require("../middleware/authMiddleware");


const {
requireSupplier
}=require("../middleware/roleMiddleware");



const {

createOrder,

getBuyerOrders,

getSupplierOrders,

updateOrderStatus,

getSingleOrder

}=require("../controllers/orderController");





// CREATE ORDER

router.post(

"/",

authMiddleware,

createOrder

);





// BUYER ORDERS

router.get(

"/buyer",

authMiddleware,

getBuyerOrders

);





// SUPPLIER ORDERS

router.get(

"/supplier",

authMiddleware,

requireSupplier,

getSupplierOrders

);





// SINGLE ORDER

router.get(

"/:id",

authMiddleware,

getSingleOrder

);





// UPDATE STATUS

router.put(

"/:id/status",

authMiddleware,

requireSupplier,

updateOrderStatus

);





module.exports = router;