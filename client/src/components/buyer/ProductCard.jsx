import {Link} from "react-router-dom";


function ProductCard({product}){


return(

<div>

<img 
src={product.image}
/>


<h3>
{product.name}
</h3>


<p>
{product.category}
</p>


<p>
₹{product.price}
</p>


<p>
Stock: {product.stock}
</p>



<Link 
to={`/product/${product._id}`}
>

View Details

</Link>


</div>


)

}


export default ProductCard;