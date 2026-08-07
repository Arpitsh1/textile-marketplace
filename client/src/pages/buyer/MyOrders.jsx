import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/axios";


function MyOrders(){


const [orders,setOrders] = useState([]);

const navigate = useNavigate();





const fetchOrders = async()=>{


try{


const res = await API.get(

"/orders/buyer"

);



console.log(

"BUYER ORDERS:",

res.data

);



setOrders(res.data);



}
catch(error){


console.log(

error.response?.data || error.message

);


}


};







useEffect(()=>{


fetchOrders();


},[]);








return(


<div>



<h2>

My Orders

</h2>






{

orders.length===0 &&

<p>

No orders found

</p>

}







{

orders.map(order=>(



<div

key={order._id}

style={{

border:"1px solid gray",

padding:"20px",

margin:"20px",

borderRadius:"10px"

}}

>





<h3>

Order ID:

{order._id}

</h3>








{

order.items.map(item=>(



<div

key={item._id}

>



<h4>

Product:

{item.product?.name}

</h4>





<p>

Quantity:

{item.quantity}

</p>





<p>

Price:

₹{item.product?.price}

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









{

order.status==="Pending" &&

<p>

⏳ Waiting for supplier approval

</p>

}







{

order.status==="Accepted" &&

<p>

✅ Order Accepted by supplier

</p>

}







{

order.status==="Shipped" &&

<p>

🚚 Order is on the way

</p>

}







{

order.status==="Delivered" &&

<p>

📦 Order Delivered

</p>

}







{

order.status==="Rejected" &&

<p>

❌ Order Rejected by supplier

</p>

}









<button

onClick={()=>navigate(

`/orders/${order._id}`

)}

>

Track Order

</button>







</div>



))


}







</div>


);


}


export default MyOrders;