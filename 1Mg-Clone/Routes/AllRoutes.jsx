import { Route, Routes } from "react-router-dom";
import Home from "../Componets/Home/Home";
import ProductsPage from '../Componets/ProductsPage/Productspage'
import Cart from "../Componets/Cart/Cart";
import Order from "../Componets/Orders/Order";
function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Products/:id" element={<ProductsPage/>} />
      <Route path="/Cart" element={<Cart/>} />
      <Route path='/Orders' element={<Order/>} />
    </Routes>
  );
}

export default AllRoutes;
