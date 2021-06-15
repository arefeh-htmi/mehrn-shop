import React, { lazy } from "react";
import { Route } from "react-router-dom";

const ProductScreen = lazy(() => import("../../components/product/ProductScreen"));
const CartScreen = lazy(() => import("../../components/shop/CartScreen"));
const ProfileScreen = lazy(() => import("../../components/dashboard/ProfileScreen"));
const ShippingScreen = lazy(() => import("../../components/order/Shipping"));
const PaymentScreen = lazy(() => import("../../components/order/Payment"));
const PlaceOrderScreen = lazy(() => import("../../components/order/PlaceOrder"));
const CustomerOrder = lazy(() => import("../../components/order/CustomerOrder"));
const CustomerScreens = () => {
  return (
    <>
      <Route path="/order/:id" component={CustomerOrder} />
      <Route path="/shipping" component={ShippingScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/product/:id" component={ProductScreen} />
      <Route path="/cart/:id?" component={CartScreen} />
    </>
  );
};

export default CustomerScreens;
