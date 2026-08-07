const express = require("express");

const router = express.Router();


const authMiddleware =
require("../middleware/authMiddleware");


const {
requireBuyer
} = require("../middleware/roleMiddleware");



router.get(
"/buyer/dashboard",

authMiddleware,

requireBuyer,

(req,res)=>{

res.json({

message:"Welcome Buyer",

user:req.user

});

}

);



module.exports = router;