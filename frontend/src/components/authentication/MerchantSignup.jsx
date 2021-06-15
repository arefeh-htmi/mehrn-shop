/*
 * MerchantSignup
 */

import React from "react";
import { connect } from "react-redux";
import FormContainer from "../FormContainer";
import { Form, Button } from "react-bootstrap";
import actions from "../../actions/";


class MerchantSignup extends React.PureComponent {
  componentDidMount() {
    const email = this.props.location.search.split("=")[1];
    this.props.merchantSignupChange("email", email);
  }

  render() {
    const { signupFormData, merchantSignupChange, merchantSignUp } =
      this.props;

    const handleSubmit = (event) => {
      const token = this.props.match.params.token;
      event.preventDefault();

      merchantSignUp(token);
    };

    return (
      <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please Enter Your Email"
              value={signupFormData.email}
              onChange={(e) => merchantSignupChange("email", e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please Enter Your First name"
              value={signupFormData.firstName}
              onChange={(e) =>
                merchantSignupChange("firstName", e.target.value)
              }
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Please Enter Your Last name"
              value={signupFormData.lastName}
              onChange={(e) => merchantSignupChange("lastName", e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Please Enter Your password"
              value={signupFormData.password}
              onChange={(e) => merchantSignupChange("password", e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </FormContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    signupFormData: state.merchant.signupFormData,
    formErrors: state.merchant.signupFormErrors,
  };
};

export default connect(mapStateToProps, actions)(MerchantSignup);
