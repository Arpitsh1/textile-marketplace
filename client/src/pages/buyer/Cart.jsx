import { useEffect, useState } from "react";
import API from "../../utils/axios";


function Cart(){


const [cart,setCart] = useState(null);






const fetchCart = async()=>{


try{


const response = await API.get(

"/cart"

);



console.log(

"CART DATA:",

response.data

);



setCart(response.data);



}
catch(error){


console.log(

error.response?.data || error.message

);


}


};







useEffect(()=>{


fetchCart();


},[]);









const updateQuantity = async(productId,quantity)=>{


try{


await API.put(

`/cart/update/${productId}`,

{

quantity

}

);



fetchCart();



}
catch(error){


console.log(

error.response?.data || error.message

);


}


};









const removeItem = async(productId)=>{


try{


await API.delete(

`/cart/remove/${productId}`

);



fetchCart();



}
catch(error){


console.log(

error.response?.data || error.message

);


}


};









const checkout = async()=>{


try{


const response = await API.post(

"/orders"

);



console.log(

"ORDER RESPONSE:",

response.data

);





alert(

"Order placed successfully"

);





fetchCart();



}
catch(error){


console.log(

error.response?.data || error.message

);



alert(

"Checkout failed"

);


}


};









if(!cart){


return <h2>Loading Cart...</h2>


}









return(


<div>


<h2>

My Cart

</h2>







{

cart.items.length === 0 ?


(

<p>

Cart is empty

</p>


)

:

(


cart.items.map(item=>(



<div

key={item._id}

style={{

border:"1px solid gray",

padding:"20px",

margin:"15px",

borderRadius:"10px"

}}

>





{

item.product &&

<>



<h3>

{item.product.name}

</h3>





<p>

Price:

₹{item.product.price}

</p>





<p>

Quantity:

{item.quantity}

</p>





<p>

Total:

₹{item.product.price * item.quantity}

</p>





<button

onClick={()=>{


if(item.quantity > 1){


updateQuantity(

item.product._id,

item.quantity - 1

);


}


}}

>

-

</button>







<span

style={{

margin:"10px"

}}

>

{item.quantity}

</span>







<button

onClick={()=>updateQuantity(

item.product._id,

item.quantity + 1

)}

>

+

</button>








<button

style={{

marginLeft:"20px"

}}

onClick={()=>removeItem(

item.product._id

)}

>

Remove

</button>



</>

}





</div>



))


)

}









{

cart.items.length > 0 &&

<button

style={{

marginTop:"20px",

padding:"10px 20px"

}}

onClick={checkout}

>

Checkout

</button>


}






</div>


);


}


export default Cart;