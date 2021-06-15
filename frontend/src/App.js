import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Loader from "./components/Common/Loader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MerchantScreens from "./screens/merchantScreens/index";
import PublicScreens from "./screens/publicScreens/index";
import CustomerScreens from "./screens/customerScreens/index";
import AdminScreens from "./screens/adminScreens/index";
import Notification from "./components/Common/Notification.jsx";
import { Suspense } from "react";
const Page404 = lazy(() => import("./components/Common/page404"));
const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Notification />
        <Header />
        <main className="py-3">
          <Container>
            <Switch>
              <PublicScreens />
              <MerchantScreens />
              <CustomerScreens />
              <AdminScreens />
              <Route path="/404" component={Page404} />
              <Route path="*" component={Page404} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </Suspense>
    </Router>
  );
};

export default App;
