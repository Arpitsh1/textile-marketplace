import {useEffect,useState} from "react";
import {useNavigate,useParams} from "react-router-dom";
import API from "../../utils/axios";


function EditProduct(){

const {id}=useParams();

const navigate=useNavigate();



const [formData,setFormData]=useState({

name:"",
category:"",
description:"",
price:"",
stock:"",
colors:"",
image:""

});



useEffect(()=>{


const loadProduct=async()=>{


const res=await API.get(
`/products/${id}`
);


const p=res.data;


setFormData({

name:p.name || "",

category:p.category || "",

description:p.description || "",

price:p.price || "",

stock:p.stock || "",

colors:p.colors?.join(",") || "",

image:p.image || ""

});


};


loadProduct();


},[id]);





const handleChange=(e)=>{

setFormData({

...formData,

[e.target.name]:e.target.value

});

};





const updateProduct=async(e)=>{

e.preventDefault();


const data={


...formData,


price:Number(formData.price),

stock:Number(formData.stock),


colors:
formData.colors
.split(",")
.map(c=>c.trim())


};



console.log("UPDATE DATA",data);



await API.put(

`/products/${id}`,

data

);



alert("Updated");


navigate("/supplier/products");


};




return(

<div>


<h2>Edit Product</h2>


<input
name="name"
value={formData.name}
onChange={handleChange}
/>


<input
name="category"
value={formData.category}
onChange={handleChange}
/>


<textarea
name="description"
value={formData.description}
onChange={handleChange}
/>


<input
name="price"
value={formData.price}
onChange={handleChange}
/>


<input
name="stock"
value={formData.stock}
onChange={handleChange}
/>


<input
name="colors"
value={formData.colors}
onChange={handleChange}
/>


<input
name="image"
value={formData.image}
onChange={handleChange}
/>


<button onClick={updateProduct}>
Update
</button>


</div>

);


}


export default EditProduct;