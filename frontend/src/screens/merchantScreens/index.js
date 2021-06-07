import React from "react";
import { Route } from "react-router-dom";
import ProductListScreen from "../adminScreens/ProductListScreen";
import ProductEditScreen from "../adminScreens/ProductEditScreen";
import OrderListScreen from "../adminScreens/OrderListScreen";
import BrandListScreen from "../../components/brand/index";
const AdminScreens = () => {
  return (
    <>
      <Route path="/dashboard/productlist" component={ProductListScreen} exact />
      <Route
        path="/dashboard/productlist/:pageNumber"
        component={ProductListScreen}
        exact
      />
      <Route path="/dashboard/product/:id/edit" component={ProductEditScreen} />
      <Route path="/dashboard/orderlist" component={OrderListScreen} />
      {/* <Route path="/dashboard/brand" component={BrandListScreen} /> */}
      <BrandListScreen />
    </>
  );
};

export default AdminScreens;
