import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ProductDetails from "../pages/ProductDetailsPage/ProductDetails";

const BasicRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<ProductDetails />} />
      </Route>
    </Routes>
  );
};

export default BasicRoutes;
