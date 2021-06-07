import React from "react";
import { Route } from "react-router-dom";
import UserListScreen from "./UserListScreen";
import UserEditScreen from "./UserEditScreen";
import ProductListScreen from "./ProductListScreen";
import ProductEditScreen from "./ProductEditScreen";
import OrderListScreen from "./OrderListScreen";
import BrandListScreen from "../../components/brand/index";
import CategoryListScreen from "../../components/category/index";
import MerchantListScreen from "./MerchantListScreen";
import ProductScreen from '../../components/product/index';
const AdminScreens = () => {
  return (
    <>
      <Route path="/dashboard/userlist" component={UserListScreen} />
      <Route path="/dashboard/merchants" component={MerchantListScreen} />
      <Route path="/dashboard/user/:id/edit" component={UserEditScreen} />
      {/* <Route path="/dashboard/productlist" component={ProductListScreen} exact />
      <Route
        path="/dashboard/productlist/:pageNumber"
        component={ProductListScreen}
        exact
      /> */}
      {/* <Route path="/dashboard/product/:id/edit" component={ProductEditScreen} /> */}
      <Route path="/dashboard/orderlist" component={OrderListScreen} />
      <ProductScreen/>
      <BrandListScreen />
      <CategoryListScreen />

      {/* 
      <LinkContainer to="/dashboard/review">
        <NavDropdown.Item>Reviews</NavDropdown.Item>
      </LinkContainer> */}
    </>
  );
};

export default AdminScreens;
