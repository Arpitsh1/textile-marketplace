import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function Register(){


const navigate = useNavigate();

const { register } = useAuth();



const [form,setForm]=useState({

name:"",
email:"",
password:"",
role:"buyer"

});



const [message,setMessage]=useState("");



const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};




const handleSubmit=async(e)=>{


e.preventDefault();



try{


const data = await register(form);



setMessage(
data.message
);



setTimeout(()=>{

navigate("/login");

},1000);



}

catch(error){


setMessage(

error.response?.data?.message ||

"Registration failed"

);


}



};




return(

<div>


<h1>
Register
</h1>


<form onSubmit={handleSubmit}>


<input

name="name"

placeholder="Name"

value={form.name}

onChange={handleChange}

/>


<br/>


<input

name="email"

type="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

/>


<br/>


<input

name="password"

type="password"

placeholder="Password"

value={form.password}

onChange={handleChange}

/>


<br/>


<select

name="role"

value={form.role}

onChange={handleChange}

>


<option value="buyer">
Buyer
</option>


<option value="supplier">
Supplier
</option>


</select>


<br/>


<button type="submit">

Register

</button>


</form>


<p>

{message}

</p>



</div>

);


}


export default Register;