import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import FormError from "../../components/Common/FormError";
import FormContainer from "../../components/FormContainer";
import { contactUs, contactFormChange } from "../../actions/contactUsActions";
class ContactUs extends React.PureComponent {
  render() {
    const { contactFormData, contactFormChange, contactUs, formErrors } =
      this.props;
    const submitHandler = (e) => {
      e.preventDefault();
      contactUs();
    };
    const formFieldNames = ["email", "name", "message"];
    return (
      <FormContainer>
        <h1>Contact Information!</h1>
        {formErrors ? (
          <FormError errors={formErrors} fieldNames={formFieldNames} />
        ) : null}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              value={contactFormData.name}
              onChange={(e) => contactFormChange("name", e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              value={contactFormData.email}
              onChange={(e) => contactFormChange("email", e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Please Describe Your Business"
              value={contactFormData.message}
              onChange={(e) => contactFormChange("message", e.target.value)}
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
    contactFormData: state.contact.contactFormData,
    formErrors: state.contact.formErrors,
  };
};

export default connect(mapStateToProps, { contactUs, contactFormChange })(
  ContactUs
);
