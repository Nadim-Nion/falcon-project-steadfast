import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ProductDetails from "../pages/ProductDetailsPage/ProductDetails";
import Cart from "../pages/CartPage/Cart";

const BasicRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<ProductDetails />} />
        <Route path="cart" element={<Cart></Cart>} />
      </Route>
    </Routes>
  );
};

export default BasicRoutes;
