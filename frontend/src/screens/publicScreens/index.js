import React from "react";
import { Route } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import ForgotPassword from "./ForgotPasswordScreen";
import ResetPassword from "./ResetPasswordScreen";
import Contact from "./ContactUsScreen";
import SellWithUs from "./SellWithUsScreen";
import MerchantSignup from "./MerchantSignupScreen";

const PublicScreens = () => {
  return (
    <>
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password/:token" component={ResetPassword} />
      <Route path="/contact" component={Contact} />
      <Route path="/sellwithus" component={SellWithUs} />
      <Route path="/merchant-signup/:token" component={MerchantSignup} />

      <Route path="/search/:keyword" component={HomeScreen} exact />
      <Route path="/page/:pageNumber" component={HomeScreen} exact />
      <Route
        path="/search/:keyword/page/:pageNumber"
        component={HomeScreen}
        exact
      />
      <Route path="/" component={HomeScreen} exact />
      
    </>
  );
};

export default PublicScreens;
