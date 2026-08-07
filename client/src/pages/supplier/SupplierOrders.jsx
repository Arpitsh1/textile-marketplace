import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/axios";


function SupplierOrders(){


const [orders,setOrders] = useState([]);

const navigate = useNavigate();





const fetchOrders = async()=>{


try{


const res = await API.get(

"/orders/supplier"

);



console.log(

"SUPPLIER ORDERS:",

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








const updateStatus = async(id,status)=>{


try{


await API.put(

`/orders/${id}/status`,

{

status

}

);




alert(

"Status Updated"

);



fetchOrders();



}
catch(error){


console.log(

error.response?.data || error.message

);


}


};









return(



<div>


<h2>

Supplier Orders

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

Buyer:

{order.buyer?.name}

</h3>




<p>

Email:

{order.buyer?.email}

</p>






<hr/>






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





</div>



))

}







<hr/>





<h3>

Amount:

₹{order.totalAmount}

</h3>





<h3>

Status:

{order.status}

</h3>









{

order.status==="Pending" &&

<>


<button

onClick={()=>updateStatus(

order._id,

"Accepted"

)}

>

Accept

</button>






<button

style={{

marginLeft:"10px"

}}

onClick={()=>updateStatus(

order._id,

"Rejected"

)}

>

Reject

</button>


</>

}








{

order.status==="Accepted" &&


<button

onClick={()=>updateStatus(

order._id,

"Shipped"

)}

>

Mark Shipped

</button>


}








{

order.status==="Shipped" &&


<button

onClick={()=>updateStatus(

order._id,

"Delivered"

)}

>

Mark Delivered

</button>


}









{

order.status==="Delivered" &&

<h3>

✅ Order Delivered

</h3>

}








{

order.status==="Rejected" &&

<h3>

❌ Order Rejected

</h3>

}









<br/>





<button

style={{

marginTop:"15px"

}}

onClick={()=>navigate(

`/supplier/order/${order._id}`

)}

>

View Details

</button>







</div>



))


}







</div>


);


}


export default SupplierOrders;