import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../utils/axios";


function MyProducts(){

const [products,setProducts] = useState([]);

const navigate = useNavigate();



// Fetch supplier products

const fetchProducts = async()=>{

try{

const res = await API.get(
"/products/supplier"
);


console.log(
"MY PRODUCTS RESPONSE:",
res.data
);


setProducts(res.data);


}
catch(error){

console.log(
error.response?.data || error.message
);

}

};




// Load products

useEffect(()=>{

fetchProducts();

},[]);






// Delete product

const deleteProduct = async(id)=>{

try{


await API.delete(
`/products/${id}`
);



alert(
"Product deleted"
);



fetchProducts();



}
catch(error){

console.log(
error.response?.data || error.message
);

}

};







// Enable / Disable product

const toggleAvailability = async(product)=>{

try{


await API.put(

`/products/${product._id}/availability`,

{

available: !product.available

}

);



fetchProducts();



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
My Products
</h2>





<button

onClick={()=>navigate("/supplier/add-product")}

>

Add Product

</button>





{

products.length === 0 ?

(

<p>
No products found
</p>

)

:

(

products.map((product)=>(


<div

key={product._id}

style={{

border:"1px solid gray",

padding:"20px",

margin:"20px",

width:"300px"

}}

>





{/* PRODUCT IMAGE */}

<img

src={

product.image

?

product.image

:

"https://via.placeholder.com/300"

}

alt={product.name}

width="200"

height="150"

/>






<h3>

{product.name}

</h3>





<p>

Category:

{product.category}

</p>




<p>

Description:

{product.description}

</p>





<p>

Price:

₹{product.price}

</p>




<p>

Stock:

{product.stock}

</p>





<p>

Colors:

{

product.colors?.join(", ")

}

</p>






<p>

Status:

{

product.available

?

"Available"

:

"Unavailable"

}

</p>







<button

onClick={()=>navigate(

`/supplier/edit-product/${product._id}`

)}

>

Edit

</button>







<button

onClick={()=>deleteProduct(product._id)}

style={{

marginLeft:"10px"

}}

>

Delete

</button>








<button

onClick={()=>toggleAvailability(product)}

style={{

marginLeft:"10px"

}}

>

{

product.available

?

"Disable"

:

"Enable"

}



</button>







</div>


))


)


}





</div>


);

}


export default MyProducts;