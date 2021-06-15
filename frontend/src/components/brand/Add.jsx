/*
 *
 * Add
 *
 */

import React from "react";
import { connect } from "react-redux";
import FormError from "../../components/Common/FormError";
import actions from "../../actions/index.js";
import FormContainer from "../FormContainer";
import { Form, Button } from "react-bootstrap";

class Add extends React.PureComponent {
  render() {
    const { brandFormData, formErrors, brandChange, addBrand } = this.props;

    const handleSubmit = (event) => {
      event.preventDefault();
      addBrand();
    };
    const formFieldNames = ["name", "description", "isActive"];
    return (
      <>
        {formErrors ? (
          <FormError errors={formErrors} fieldNames={formFieldNames} />
        ) : null}
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={brandFormData.name}
                onChange={(e) => brandChange("name", e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand description"
                value={brandFormData.description}
                onChange={(e) => brandChange("description", e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Is the brand active?"
                checked={brandFormData.isActive}
                onChange={(value) => brandChange("isActive", value)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" text="Add Brand" />
          </Form>
        </FormContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    brandFormData: state.brand.brandFormData,
    formErrors: state.brand.formErrors,
  };
};

export default connect(mapStateToProps, actions)(Add);
