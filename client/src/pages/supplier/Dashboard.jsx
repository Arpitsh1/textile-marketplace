import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import API from "../../utils/axios";

function SupplierDashboard(){

const [products,setProducts]=useState([]);
const [orders,setOrders]=useState([]);

useEffect(()=>{

load();

},[]);

const load=async()=>{

const p=await API.get("/products/supplier");
setProducts(p.data);

const o=await API.get("/orders/supplier");
setOrders(o.data);

};

const pending=orders.filter(o=>o.status==="Pending").length;

const delivered=orders.filter(o=>o.status==="Delivered").length;

return(

<div className="container mt-5">

<h2>Supplier Dashboard</h2>

<div className="row mt-4">

<div className="col-md-3">
<div className="card shadow text-center">
<div className="card-body">
<h1>{products.length}</h1>
<p>Products</p>
</div>
</div>
</div>

<div className="col-md-3">
<div className="card shadow text-center">
<div className="card-body">
<h1>{orders.length}</h1>
<p>Orders</p>
</div>
</div>
</div>

<div className="col-md-3">
<div className="card shadow text-center">
<div className="card-body">
<h1>{pending}</h1>
<p>Pending</p>
</div>
</div>
</div>

<div className="col-md-3">
<div className="card shadow text-center">
<div className="card-body">
<h1>{delivered}</h1>
<p>Delivered</p>
</div>
</div>
</div>

</div>

<div className="mt-4">

<Link
to="/supplier/products"
className="btn btn-primary me-2"
>
Products
</Link>

<Link
to="/supplier/add-product"
className="btn btn-success me-2"
>
Add Product
</Link>

<Link
to="/supplier/orders"
className="btn btn-warning"
>
Orders
</Link>

</div>

</div>

);

}

export default SupplierDashboard;