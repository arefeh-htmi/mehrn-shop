import React, { lazy } from "react";
import { Route } from "react-router-dom";

const ProductList = lazy(() => import("../../components/product/List"));
const ProductEdit = lazy(() => import("../../components/product/Edit"));
const ProductAdd = lazy(() => import("../../components/product/Add"));
const OrderList = lazy(() => import("../../components/order/OrderList"));
const BrandList = lazy(() => import("../../components/brand/List"));
const BrandEdit = lazy(() => import("../../components/brand/Edit"));
const BrandAdd = lazy(() => import("../../components/brand/Add"));
const CategoryList = lazy(() => import("../../components/category/List"));
const CategoryEdit = lazy(() => import("../../components/category/Edit"));
const CategoryAdd = lazy(() => import("../../components/category/Add"));
const UserEditScreen = lazy(() => import("../../components/dashboard/UserEditScreen"));
const UserListScreen = lazy(() => import("../../components/dashboard/UserListScreen"));
const MerchantListScreen = lazy(() => import("../../components/dashboard/MerchantListScreen"));


const AdminScreens = () => {
  return (
    <>
      <Route exact path="/dashboard/product/add" component={ProductAdd} />
      <Route
        path="/dashboard/productlist/:pageNumber"
        component={ProductList}
        exact
      />
      <Route path="/dashboard/productlist" component={ProductList} exact />
      <Route path="/dashboard/product/:id/edit" component={ProductEdit} />

      <Route path="/dashboard/orderlist" component={OrderList} />

      <Route exact path="/dashboard/brand" component={BrandList} />
      <Route exact path="/dashboard/brand/edit/:id" component={BrandEdit} />
      <Route exact path="/dashboard/brand/add" component={BrandAdd} />
      <Route exact path="/dashboard/category" component={CategoryList} />
      <Route
        exact
        path="/dashboard/category/edit/:id"
        component={CategoryEdit}
      />
      <Route exact path="/dashboard/category/add" component={CategoryAdd} />

      <Route path="/dashboard/userlist" component={UserListScreen} />
      <Route path="/dashboard/merchants" component={MerchantListScreen} />
      <Route path="/dashboard/user/:id/edit" component={UserEditScreen} />


    </>
  );
};

export default AdminScreens;
