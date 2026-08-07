function OrderTimeline({status}){


const steps=[

"Pending",

"Confirmed",

"Shipped",

"Delivered"

];



if(status==="Rejected"){

return(

<div>

<h4>
Order Progress
</h4>

<p>
✅ Order Placed
</p>

<p>
❌ Rejected
</p>

</div>

)

}




const current=steps.indexOf(status);



return(

<div>


<h4>
Order Progress
</h4>



{

steps.map((step,index)=>(


<p key={step}>

{

index<=current

?

"✅"

:

"⬜"

}


{step}


</p>


))


}



</div>


);


}


export default OrderTimeline;