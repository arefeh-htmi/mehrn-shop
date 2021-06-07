/*
 * ForgotPassword
 */
import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  forgotPasswordChange,
  forgotPassowrd,
} from "../../actions/forgotPasswordActions";

// import Input from "../../components/Common/Input";
// import Button from "../../components/Common/Button";

class ForgotPassword extends React.PureComponent {
  render() {
    const {
      // authenticated,
      forgotFormData,
      formErrors,
      forgotPasswordChange,
      forgotPassowrd,
    } = this.props;

    // if (authenticated) return <Redirect to="/dashboard" />;

    const handleSubmit = (event) => {
      event.preventDefault();
      forgotPassowrd();
    };

    return (
      <FormContainer>
        <h2>Forgot Password</h2>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={forgotFormData.email}
              onChange={(e) => forgotPasswordChange("email", e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Send Email
          </Button>
          <Link className="redirect-link" to={"/login"}>
            Back to login
          </Link>
        </Form>
      </FormContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // authenticated: state.authentication.authenticated,
    forgotFormData: state.forgotPassword.forgotFormData,
    formErrors: state.forgotPassword.formErrors,
  };
};

export default connect(mapStateToProps, {
  forgotPasswordChange,
  forgotPassowrd,
})(ForgotPassword);
