exports.requireBuyer = (req,res,next)=>{


if(req.user.role !== "buyer"){

return res.status(403).json({

message:"Access denied. Buyer only."

});

}


next();

};



exports.requireSupplier = (req, res, next) => {

    console.log("ROLE CHECK:", req.user);

    if (req.user.role !== "supplier") {

        return res.status(403).json({
            message:"Access denied. Supplier only."
        });

    }

    next();

};