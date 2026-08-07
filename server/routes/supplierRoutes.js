const express = require("express");

const router = express.Router();


const authMiddleware =
require("../middleware/authMiddleware");


const {
requireSupplier
}=require("../middleware/roleMiddleware");


const {

getSupplierDashboard

}=require("../controllers/supplierController");





router.get(

"/dashboard",

authMiddleware,

requireSupplier,

getSupplierDashboard

);




module.exports = router;