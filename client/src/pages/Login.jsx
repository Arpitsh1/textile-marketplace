import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";



function Login(){


const navigate = useNavigate();


const { login } = useAuth();



const [form,setForm]=useState({

email:"",
password:""

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


const data = await login(form);




if(data.user.role==="buyer"){


navigate("/buyer/dashboard");


}


else if(data.user.role==="supplier"){


navigate("/supplier/dashboard");


}



}


catch(error){


setMessage(

error.response?.data?.message ||

"Login failed"

);


}



};





return(

<div>


<h1>
Login
</h1>



<form onSubmit={handleSubmit}>


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


<button type="submit">

Login

</button>



</form>


<p>

{message}

</p>



</div>

);


}


export default Login;