import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/axios";


function OrderDetails(){


const {id}=useParams();


const [order,setOrder]=useState(null);




const fetchOrder=async()=>{


try{


const res=await API.get(

`/orders/${id}`

);


console.log(

"ORDER DETAILS",

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






return(


<div>


<h2>

Order Details

</h2>




<h3>

Buyer:

{order.buyer?.name}

</h3>




<p>

Email:

{order.buyer?.email}

</p>





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


<p>

Price:

₹{item.product.price}

</p>



<hr/>


</div>


))

}





<h3>

Total:

₹{order.totalAmount}

</h3>





<h3>

Status:

{order.status}

</h3>




</div>


);


}


export default OrderDetails;