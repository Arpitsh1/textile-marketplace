import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/axios";


function OrderTracking(){


const {id}=useParams();


const [order,setOrder]=useState(null);





const fetchOrder=async()=>{


try{


const res = await API.get(

`/orders/${id}`

);


console.log(

"TRACK ORDER:",

res.data

);


setOrder(res.data);



}
catch(error){


console.log(

error.response?.data || error.message

);


}


};







useEffect(()=>{


fetchOrder();


},[]);







if(!order){


return <h2>Loading...</h2>


}







const statusSteps=[


"Pending",

"Accepted",

"Shipped",

"Delivered"


];








return(


<div>


<h2>

Order Tracking

</h2>





<h3>

Order ID:

{order._id}

</h3>





<h3>

Current Status:

{order.status}

</h3>








<div>


{

statusSteps.map((step,index)=>(



<div

key={step}

style={{

margin:"20px",

fontSize:"18px"

}}

>



{

statusSteps.indexOf(order.status)>=index

?

"✅"

:

"⬜"

}



{" "}


{step}





</div>



))

}



</div>







<hr/>





<h3>

Products

</h3>






{

order.items.map(item=>(


<div key={item._id}>


<p>

{item.product.name}

</p>


<p>

Quantity:

{item.quantity}

</p>



</div>


))


}







<h3>

Total:

₹{order.totalAmount}

</h3>







</div>


);


}


export default OrderTracking;