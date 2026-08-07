import {
  Link
} from "react-router-dom";


function Landing(){


return(

<div>


{/* HERO SECTION */}

<section

className="py-5"

style={{

background:
"linear-gradient(135deg,#111827,#374151)",

color:"white"

}}

>


<div className="container py-5">


<div className="row align-items-center">



<div className="col-lg-7">


<h1 className="display-3 fw-bold">

TextileHub Marketplace 🧵

</h1>



<p className="lead mt-4">

A B2B textile marketplace connecting
buyers and suppliers across the fabric industry.

</p>



<p>

Discover premium cotton, silk and fabric
products directly from trusted suppliers.

</p>



<div className="mt-4">


<Link

to="/marketplace"

className="btn btn-light btn-lg me-3"

>

Explore Fabrics

</Link>



<Link

to="/register"

className="btn btn-outline-light btn-lg"

>

Join TextileHub

</Link>


</div>


</div>





<div className="col-lg-5 mt-4 mt-lg-0">


<div

className="card shadow p-5 text-center"

style={{

borderRadius:"25px"

}}

>


<h1>

🧵

</h1>


<h2 className="text-dark">

Premium Fabrics

</h2>


<p className="text-muted">

Quality textiles from verified suppliers.

</p>


<div className="row mt-3">


<div className="col-4">

<h3 className="text-dark">

500+

</h3>

<small>

Fabrics

</small>

</div>



<div className="col-4">

<h3 className="text-dark">

100+

</h3>

<small>

Suppliers

</small>

</div>



<div className="col-4">

<h3 className="text-dark">

24/7

</h3>

<small>

Support

</small>

</div>



</div>


</div>


</div>



</div>


</div>


</section>







{/* FEATURES */}



<section className="container py-5">


<h2 className="text-center fw-bold mb-5">

Why Choose TextileHub?

</h2>




<div className="row">





<div className="col-md-4 mb-4">


<div className="dashboard-card text-center">


<h1>

🏭

</h1>


<h4>

Verified Suppliers

</h4>


<p>

Connect directly with textile manufacturers.

</p>


</div>


</div>








<div className="col-md-4 mb-4">


<div className="dashboard-card text-center">


<h1>

🛒

</h1>


<h4>

Easy Ordering

</h4>


<p>

Browse fabrics, add to cart and place orders.

</p>


</div>


</div>








<div className="col-md-4 mb-4">


<div className="dashboard-card text-center">


<h1>

🚚

</h1>


<h4>

Order Tracking

</h4>


<p>

Track your order status from supplier to delivery.

</p>


</div>


</div>



</div>


</section>






{/* CTA */}



<section

className="container mb-5"

>


<div

className="card shadow p-5 text-center"

style={{

borderRadius:"25px"

}}

>


<h2>

Ready to explore fabrics?

</h2>


<p>

Join buyers and suppliers on TextileHub.

</p>



<Link

to="/marketplace"

className="btn btn-dark"

>

Start Shopping

</Link>



</div>


</section>




</div>


);

}


export default Landing;