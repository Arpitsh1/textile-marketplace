import {useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "../../utils/axios";


function AddProduct(){

const navigate = useNavigate();


const [form,setForm]=useState({

name:"",
category:"",
description:"",
price:"",
stock:"",
colors:"",
image:""

});



const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};




const addProduct=async(e)=>{

e.preventDefault();


try{


const productData={

name:form.name,

category:form.category,

description:form.description,

price:Number(form.price),

stock:Number(form.stock),


colors:
form.colors
.split(",")
.map(c=>c.trim()),


image:form.image.trim()

};



console.log(productData);



await API.post(

"/products",

productData

);



alert("Product Added");


navigate("/supplier/products");


}
catch(error){

console.log(error.response?.data);


alert("Failed");

}


};



return(

<div>


<h2>Add Product</h2>


<input
name="name"
placeholder="Name"
value={form.name}
onChange={handleChange}
/>


<input
name="category"
placeholder="Category"
value={form.category}
onChange={handleChange}
/>



<textarea
name="description"
placeholder="Description"
value={form.description}
onChange={handleChange}
/>



<input
name="price"
placeholder="Price"
value={form.price}
onChange={handleChange}
/>



<input
name="stock"
placeholder="Stock"
value={form.stock}
onChange={handleChange}
/>



<input
name="colors"
placeholder="Red, Blue"
value={form.colors}
onChange={handleChange}
/>



<input
name="image"
placeholder="Paste image URL"
value={form.image}
onChange={handleChange}
/>



<button onClick={addProduct}>
Add Product
</button>



</div>

);

}


export default AddProduct;