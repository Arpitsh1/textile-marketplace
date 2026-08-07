const express = require("express");

const router = express.Router();


const authMiddleware =
require("../middleware/authMiddleware");


const {
requireSupplier
} = require("../middleware/roleMiddleware");



const {

createProduct,

getProducts,

getSupplierProducts,

updateProduct,

deleteProduct,

getSingleProduct,

updateAvailability

} = require("../controllers/productController");





console.log("PRODUCT ROUTES FILE LOADED");





// ===============================
// SUPPLIER PRODUCTS
// IMPORTANT: Keep this BEFORE /:id
// ===============================

router.get(

"/supplier",

authMiddleware,

requireSupplier,

getSupplierProducts

);





// ===============================
// MARKETPLACE PRODUCTS
// ===============================

router.get(

"/",

getProducts

);





// ===============================
// SINGLE PRODUCT DETAILS
// Keep this AFTER /supplier
// ===============================

router.get(

"/:id",

getSingleProduct

);






// ===============================
// CREATE PRODUCT
// ===============================

router.post(

"/",

authMiddleware,

requireSupplier,

createProduct

);






// ===============================
// UPDATE PRODUCT
// ===============================

router.put(

"/:id",

authMiddleware,

requireSupplier,

updateProduct

);






// ===============================
// UPDATE AVAILABILITY
// ===============================

router.put(

"/:id/availability",

authMiddleware,

requireSupplier,

updateAvailability

);




// ===============================
// DELETE PRODUCT
// ===============================

router.delete(

"/:id",

authMiddleware,

requireSupplier,

deleteProduct

);



module.exports = router;