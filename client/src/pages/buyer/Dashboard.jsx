import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/axios";

function BuyerDashboard() {

const [orders,setOrders]=useState([]);
const [cart,setCart]=useState({items:[]});

useEffect(()=>{

fetchData();

},[]);

const fetchData=async()=>{

try{

const orderRes=await API.get("/orders/buyer");
setOrders(orderRes.data);

const cartRes=await API.get("/cart");
setCart(cartRes.data);

}catch(err){
console.log(err);
}

};

const pending=orders.filter(o=>o.status==="Pending").length;
const delivered=orders.filter(o=>o.status==="Delivered").length;

return(

<div className="container mt-5">

<h2 className="mb-4">Buyer Dashboard</h2>

<div className="row">

<div className="col-md-4">
<div className="card text-center shadow">
<div className="card-body">
<h1>{orders.length}</h1>
<p>Total Orders</p>
</div>
</div>
</div>

<div className="col-md-4">
<div className="card text-center shadow">
<div className="card-body">
<h1>{cart.items?.length||0}</h1>
<p>Items in Cart</p>
</div>
</div>
</div>

<div className="col-md-4">
<div className="card text-center shadow">
<div className="card-body">
<h1>{delivered}</h1>
<p>Delivered Orders</p>
</div>
</div>
</div>

</div>

<div className="mt-5">

<Link
to="/marketplace"
className="btn btn-primary me-3"
>
Marketplace
</Link>

<Link
to="/cart"
className="btn btn-warning me-3"
>
Cart
</Link>

<Link
to="/orders"
className="btn btn-success"
>
My Orders
</Link>

</div>

<h4 className="mt-5">Recent Orders</h4>

<table className="table table-bordered mt-3">

<thead>

<tr>

<th>Order</th>

<th>Status</th>

<th>Total</th>

</tr>

</thead>

<tbody>

{orders.slice(0,5).map(order=>(

<tr key={order._id}>

<td>{order._id.slice(-6)}</td>

<td>{order.status}</td>

<td>₹{order.totalAmount}</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default BuyerDashboard;