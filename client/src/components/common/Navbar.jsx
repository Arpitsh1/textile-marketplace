import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useContext
} from "react";

import {
  AuthContext
} from "../../context/AuthContext";



function Navbar(){


const navigate = useNavigate();


const {
  user,
  logout
}=useContext(AuthContext);





const handleLogout=()=>{


logout();

navigate("/");


};





return(


<nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">


<div className="container">





<Link

className="navbar-brand fw-bold"

to="/"

>

🧵 TextileHub

</Link>






<button

className="navbar-toggler"

type="button"

data-bs-toggle="collapse"

data-bs-target="#navbarMenu"

>

<span className="navbar-toggler-icon"></span>

</button>







<div

className="collapse navbar-collapse"

id="navbarMenu"

>



<ul className="navbar-nav ms-auto align-items-center">





<li className="nav-item">

<Link

className="nav-link"

to="/"

>

Home

</Link>

</li>







<li className="nav-item">

<Link

className="nav-link"

to="/marketplace"

>

Marketplace

</Link>

</li>









{
user && user.role==="buyer" &&

<>


<li className="nav-item">

<Link

className="nav-link"

to="/cart"

>

🛒 Cart

</Link>

</li>





<li className="nav-item">

<Link

className="nav-link"

to="/orders"

>

Orders

</Link>

</li>


</>


}









{
user && user.role==="supplier" &&

<>


<li className="nav-item">

<Link

className="nav-link"

to="/supplier/dashboard"

>

Dashboard

</Link>

</li>





<li className="nav-item">

<Link

className="nav-link"

to="/supplier/products"

>

My Products

</Link>

</li>





<li className="nav-item">

<Link

className="nav-link"

to="/supplier/orders"

>

Orders

</Link>

</li>


</>


}









{
user ?


<>


<li className="nav-item ms-3">


<span className="badge bg-secondary me-2">


{user.role}


</span>



<button

className="btn btn-danger"

onClick={handleLogout}

>

Logout

</button>


</li>


</>


:


<>


<li className="nav-item ms-2">


<Link

className="btn btn-outline-primary"

to="/login"

>

Login

</Link>


</li>






<li className="nav-item ms-2">


<Link

className="btn btn-primary"

to="/register"

>

Register

</Link>


</li>


</>


}







</ul>


</div>


</div>


</nav>


);


}


export default Navbar;