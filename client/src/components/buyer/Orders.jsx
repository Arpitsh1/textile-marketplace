import OrderTimeline from "../OrderTimeline";


function Orders({orders}){


return(


<div>



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

padding:"15px",

margin:"15px"

}}

>



<h3>
Order ID:
</h3>


<p>
{order._id}
</p>




{

order.items.map(item=>(


<div key={item._id}>


<p>

Product:

{item.product?.name}

</p>



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





<p>

Total:

₹{order.totalAmount}

</p>




<p>

Status:

{order.status}

</p>



<OrderTimeline status={order.status}/>



</div>


))


}



</div>


);


}


export default Orders;