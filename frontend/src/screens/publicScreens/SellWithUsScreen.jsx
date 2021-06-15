import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import FormError from "../../components/Common/FormError";
import Loader from "../../components/Common/Loader";
import FormContainer from "../../components/FormContainer";
import { sellWithUs, sellFormChange } from "../../actions/merchantActions";

class SellWithUsScreen extends React.PureComponent {
  render() {
    const {
      sellFormData,
      formErrors,
      sellFormChange,
      sellWithUs,
      isSubmitting,
      isLoading,
    } = this.props;

    const submitHandler = (e) => {
      e.preventDefault();
      sellWithUs();
    };
    const formFieldNames = [
      "name",
      "email",
      "phoneNumber",
      "brand",
      "business",
    ];
    return (
      <>
        <FormContainer>
          <h1>Become A MERN Shop Seller!</h1>
          {formErrors ? (
            <FormError errors={formErrors} fieldNames={formFieldNames} />
          ) : null}
          {isLoading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={sellFormData.name}
                onChange={(e) => sellFormChange("name", e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={sellFormData.email}
                onChange={(e) => sellFormChange("email", e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                value={sellFormData.phoneNumber}
                onChange={(e) => sellFormChange("phoneNumber", e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Business Brand"
                value={sellFormData.brand}
                onChange={(e) => sellFormChange("brand", e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="business">
              <Form.Label>Business Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please Describe Your Business"
                value={sellFormData.business}
                onChange={(e) => sellFormChange("business", e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        </FormContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sellFormData: state.merchant.sellFormData,
    formErrors: state.merchant.formErrors,
    isSubmitting: state.merchant.isSellSubmitting,
    isLoading: state.merchant.isSellLoading,
  };
};

export default connect(mapStateToProps, { sellWithUs, sellFormChange })(
  SellWithUsScreen
);
