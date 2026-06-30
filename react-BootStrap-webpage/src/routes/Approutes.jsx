import {BrowserRouter,Routes,Route,} from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import TrackOrder from "../pages/TrackOrder";
import Cart from "../pages/cart";
import ContactUs from "../pages/ContactUs";
import AdminLogin from "../admin/pages/AdminLogin";
import AddProduct from "../admin/pages/AddProduct";
import Categories from "../admin/pages/Categories";
// import Customers from "../admin/pages/Customers";
import Dashboard from "../admin/pages/Dashboard";
import EditProduct from "../admin/pages/EditProduct";
// import Orders from "../admin/pages/Orders";
import Groups from "../admin/pages/Groups";
import Values from "../admin/pages/Values";
import Products from "../admin/pages/Products";
import Orders from "../admin/pages/Orders";
import Order from "../pages/Order";




function AppRoutes() {
  return (
   <BrowserRouter>
  <Routes>

    {/* User Routes */}
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="track-order" element={<TrackOrder />} />
      <Route path="contactUs" element={<ContactUs />} />
      <Route path="cart" element={<Cart />} />
    </Route>

    {/* Admin Routes */}
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/dashboard" element={<Dashboard />} />
    <Route path="/admin/products" element={<Products />} />
    <Route path="/admin/products/add" element={<AddProduct />} />
    <Route path="/admin/products/edit/:id" element={<EditProduct />} />
    <Route path="/admin/categories" element={<Categories />} />
    <Route path="/admin/groups" element={<Groups />} />
<Route path="/admin/values" element={<Values />} />
<Route path="/order" element={<Order />} />
<Route path="/admin/orders" element={<Orders />} />


  </Routes>
</BrowserRouter>
  );
}

export default AppRoutes;