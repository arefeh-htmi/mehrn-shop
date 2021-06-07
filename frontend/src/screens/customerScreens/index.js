import React from "react";
import { Route } from "react-router-dom";
import ProductScreen from "./ProductScreen";
import CartScreen from "./CartScreen";
import ProfileScreen from "./ProfileScreen";
import ShippingScreen from "./ShippingScreen";
import PaymentScreen from "./PaymentScreen";
import PlaceOrderScreen from "./PlaceOrderScreen";
import OrderScreen from "./OrderScreen";
const CustomerScreens = () => {
  return (
    <>
      <Route path="/order/:id" component={OrderScreen} />
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
