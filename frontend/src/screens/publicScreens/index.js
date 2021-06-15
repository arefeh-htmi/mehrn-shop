import React, { lazy } from "react";
import { Route } from "react-router-dom";
const MerchantSignup = lazy(() =>
  import("../../components/authentication/MerchantSignup")
);
const LoginScreen = lazy(() =>
  import("../../components/authentication/LoginScreen")
);
const RegisterScreen = lazy(() =>
  import("../../components/authentication/RegisterScreen")
);
const ForgotPassword = lazy(() =>
  import("../../components/authentication/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("../../components/authentication/ResetPassword")
);
const HomeScreen = lazy(() => import("./HomeScreen"));

const Contact = lazy(() => import("./ContactUsScreen"));
const SellWithUs = lazy(() => import("./SellWithUsScreen"));

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
