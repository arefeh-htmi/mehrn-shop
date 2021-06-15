/*
 *
 * ResetPassword
 *
 */

import React from "react";
import { connect } from "react-redux";
import { resetPasswordChange, resetPassowrd } from "../../actions/resetPasswordActions";
import FormContainer from "../FormContainer";
import { Form, Button} from "react-bootstrap";

class ResetPassword extends React.PureComponent {
  render() {
    const {  resetFormData, resetPasswordChange } =
      this.props;

    const handleSubmit = (event) => {
      event.preventDefault();
      const token = this.props.match.params.token;
      this.props.resetPassowrd(token);
    };
    return (
      <FormContainer>
        <h2>Reset Password</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={resetFormData.password}
              onChange={(e) => resetPasswordChange("password", e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={resetFormData.confirmPassword}
              onChange={(e) =>
                resetPasswordChange("confirmPassword", e.target.value)
              }
            ></Form.Control>
          </Form.Group>
        </Form>
        <Button type="submit" variant="primary">
          Reset Password
        </Button>
      </FormContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authentication.authenticated,
    resetFormData: state.resetPassword.resetFormData,
    formErrors: state.resetPassword.formErrors
  };
};

export default connect(mapStateToProps, { resetPasswordChange, resetPassowrd })(
  ResetPassword
);
