const express=require("express");

const router=express.Router();


const authMiddleware =
require("../middleware/authMiddleware");


const {
addToCart,
getCart,
updateCartQuantity,
removeFromCart
}=require("../controllers/cartController");



router.post(
"/add",
authMiddleware,
addToCart
);

router.get(
"/",
authMiddleware,
getCart
);

router.put(
"/update/:productId",
authMiddleware,
updateCartQuantity
);



router.delete(
"/remove/:productId",
authMiddleware,
removeFromCart
);



module.exports=router;