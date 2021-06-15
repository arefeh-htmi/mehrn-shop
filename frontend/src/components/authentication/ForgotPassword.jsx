/*
 * ForgotPassword
 */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FormContainer from "../FormContainer";
import { Form, Button } from "react-bootstrap";
import {
  forgotPasswordChange,
  forgotPassowrd,
} from "../../actions/forgotPasswordActions";

class ForgotPassword extends React.PureComponent {
  render() {
    const { forgotFormData, forgotPasswordChange, forgotPassowrd } = this.props;

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
              type="text"
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
    forgotFormData: state.forgotPassword.forgotFormData,
    formErrors: state.forgotPassword.formErrors,
  };
};

export default connect(mapStateToProps, {
  forgotPasswordChange,
  forgotPassowrd,
})(ForgotPassword);
