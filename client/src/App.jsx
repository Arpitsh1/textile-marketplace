import {
  Routes,
  Route
} from "react-router-dom";

import Landing from "./pages/Landing";

import Login from "./pages/Login";

import Register from "./pages/Register";


import BuyerDashboard from "./pages/buyer/Dashboard";

import SupplierDashboard from "./pages/supplier/Dashboard";


import ProtectedRoute from "./components/common/ProtectedRoute";

import Navbar from "./components/common/Navbar";

import MyProducts from "./pages/supplier/MyProducts";

import AddProduct from "./pages/supplier/AddProduct";

import EditProduct from "./pages/supplier/EditProduct";

import Cart from "./pages/buyer/Cart";

import Marketplace from "./pages/marketplace/Marketplace";

import SupplierOrders from "./pages/supplier/SupplierOrders";

import MyOrders from "./pages/buyer/MyOrders";

import ProductDetails from "./pages/marketplace/ProductDetails";

import OrderTracking from "./pages/buyer/OrderTracking";

import OrderDetails from "./pages/supplier/OrderDetails";


function App(){

return(

<>

<Navbar />

<Routes>


<Route
path="/"
element={<Landing/>}
/>


<Route
path="/login"
element={<Login/>}
/>


<Route
path="/register"
element={<Register/>}
/>


<Route
path="/buyer/dashboard"
element={
<ProtectedRoute role="buyer">
<BuyerDashboard/>
</ProtectedRoute>
}
/>


<Route
path="/supplier/dashboard"
element={
<ProtectedRoute role="supplier">
<SupplierDashboard/>
</ProtectedRoute>
}
/>


<Route
path="/marketplace"
element={<Marketplace/>}
/>


<Route
path="/cart"
element={<Cart/>}
/>


<Route
path="/orders"
element={<MyOrders/>}
/>


<Route
path="/product/:id"
element={<ProductDetails/>}
/>


<Route
path="/orders/:id"
element={
<ProtectedRoute role="buyer">
<OrderTracking/>
</ProtectedRoute>
}
/>


<Route
path="/supplier/orders"
element={<SupplierOrders/>}
/>


<Route
path="/supplier/order/:id"
element={
<ProtectedRoute role="supplier">
<OrderDetails/>
</ProtectedRoute>
}
/>

<Route
  path="/supplier/products"
  element={
    <ProtectedRoute role="supplier">
      <MyProducts/>
    </ProtectedRoute>
  }
/>


<Route
  path="/supplier/add-product"
  element={
    <ProtectedRoute role="supplier">
      <AddProduct/>
    </ProtectedRoute>
  }
/>


<Route
  path="/supplier/edit-product/:id"
  element={
    <ProtectedRoute role="supplier">
      <EditProduct/>
    </ProtectedRoute>
  }
/>

</Routes>

</>

);

}


export default App;