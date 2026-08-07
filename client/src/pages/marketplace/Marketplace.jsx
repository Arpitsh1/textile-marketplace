import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import API from "../../utils/axios";


function Marketplace(){

const [products,setProducts]=useState([]);

const [search,setSearch]=useState("");

const [category,setCategory]=useState("All");

const [sort,setSort]=useState("");

const [loading,setLoading]=useState(true);



// FETCH PRODUCTS

const fetchProducts=async()=>{

try{

setLoading(true);


let url="/products?";


if(search){

url += `search=${search}&`;

}


if(category !== "All"){

url += `category=${category}&`;

}


if(sort){

url += `sort=${sort}`;

}



const res = await API.get(url);


console.log(
"PRODUCT DATA:",
res.data
);


setProducts(res.data);


}

catch(error){

console.log(
error.response?.data || error.message
);

}

finally{

setLoading(false);

}


};



useEffect(()=>{

const timer=setTimeout(()=>{

fetchProducts();

},500);


return ()=>clearTimeout(timer);


},[search,category,sort]);





// ADD TO CART

const addToCart=async(productId)=>{


try{


const res = await API.post(

"/cart/add",

{

productId

}

);


console.log(
"ADD CART RESPONSE:",
res.data
);


alert(
"Product added to cart 🛒"
);


}

catch(error){


console.log(
error.response?.data || error.message
);


alert(
"Login required to add cart"
);


}


};





return(


<div className="container mt-5">


<h2 className="text-center mb-4">

Textile Marketplace 🧵

</h2>




{/* FILTER SECTION */}


<div className="card shadow p-3 mb-4">


<div className="row g-3">


<div className="col-md-4">


<input

className="form-control"

placeholder="Search products..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>


</div>




<div className="col-md-3">


<select

className="form-select"

value={category}

onChange={(e)=>
setCategory(e.target.value)
}

>


<option value="All">

All Categories

</option>


<option value="Cotton">

Cotton

</option>


<option value="Silk">

Silk

</option>


<option value="Fabric">

Fabric

</option>


</select>


</div>





<div className="col-md-3">


<select

className="form-select"

value={sort}

onChange={(e)=>
setSort(e.target.value)
}

>


<option value="">

Sort By

</option>


<option value="priceAsc">

Price Low → High

</option>


<option value="priceDesc">

Price High → Low

</option>


</select>


</div>




<div className="col-md-2">


<button

className="btn btn-secondary w-100"

onClick={()=>{

setSearch("");

setCategory("All");

setSort("");

}}

>

Reset

</button>


</div>



</div>


</div>






{/* PRODUCTS */}



{

loading ?


<div className="text-center">

<h4>
Loading Products...
</h4>

</div>


:

products.length===0 ?


<div className="alert alert-warning text-center">

No products found

</div>


:


<div className="row">


{

products.map(product=>(


<div

className="col-md-4 mb-4"

key={product._id}

>


<div className="card shadow h-100">



<img

src={

product.image ||

"https://via.placeholder.com/300"

}

className="card-img-top"

alt={product.name}

style={{

height:"220px",

objectFit:"cover"

}}

/>





<div className="card-body">



<h5>

{product.name}

</h5>




<span className="badge bg-primary mb-2">

{product.category}

</span>




<p>

{product.description}

</p>




<h4 className="text-success">

₹{product.price}

</h4>




<p>

<strong>

Stock:

</strong>

{" "}

{product.stock}

</p>




{

product.stock>0 ?


<span className="badge bg-success">

Available

</span>


:


<span className="badge bg-danger">

Out Of Stock

</span>


}





<div className="mt-3">


<Link

to={`/product/${product._id}`}

className="btn btn-outline-primary w-100 mb-2"

>

View Details

</Link>





<button

className="btn btn-dark w-100"

disabled={product.stock===0}

onClick={()=>addToCart(product._id)}

>

Add To Cart 🛒

</button>



</div>



</div>


</div>



</div>



))

}



</div>


}



</div>


);


}


export default Marketplace;