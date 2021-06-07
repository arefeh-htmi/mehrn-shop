import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MerchantScreens from "./screens/merchantScreens/index";
import PublicScreens from "./screens/publicScreens/index";
import CustomerScreens from "./screens/customerScreens/index";
import AdminScreens from "./screens/adminScreens/index";
import Notification from "./components/Notification.jsx";
import './styles/style.scss';
const App = () => {
  return (
    <Router>
      <Notification />
      <Header />
      <main className="py-3">
        <Container>
          <PublicScreens />
          {/* <Route path="/" component={Authentication(CustomerScreens)} /> */}
          <MerchantScreens />
          <CustomerScreens />
          <AdminScreens />
    
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
