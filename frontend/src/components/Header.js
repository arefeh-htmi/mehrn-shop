import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./Common/SearchBox";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="header">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MernShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.firstName} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {userInfo && userInfo.role === "ROLE_MERCHANT" && (
                    <>
                      <LinkContainer to="/dashboard/productlist">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/dashboard/review">
                        <NavDropdown.Item>Reviews</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/dashboard/orderlist">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/dashboard/brand">
                        <NavDropdown.Item>Brands</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/dashboard/brand">
                        <NavDropdown.Item>Brands</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  {userInfo && userInfo.role === "ROLE_ADMIN" && (
                    <>
                      <LinkContainer to="/dashboard/userlist">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/dashboard/merchants">
                        <NavDropdown.Item>Merchants</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/dashboard/productlist">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/dashboard/orderlist">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/dashboard/review">
                        <NavDropdown.Item>Reviews</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/dashboard/category">
                        <NavDropdown.Item>Categories</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/dashboard/brand">
                        <NavDropdown.Item>Brands</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i class="fas fa-user-plus"></i> Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
