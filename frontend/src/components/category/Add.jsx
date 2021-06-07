/*
 *
 * Add
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FormError from "../../components/Common/FormError";
import actions from "../../actions/index.js";
import Loader from "../Loader";
import SelectOption from "../Common/SelectOption";
import FormContainer from "../FormContainer";
import { Form, Button } from "react-bootstrap";

class Add extends React.PureComponent {
  render() {
    const {
      history,
      products,
      categoryFormData,
      formErrors,
      categoryChange,
      addCategory,
    } = this.props;

    const handleSubmit = (event) => {
      event.preventDefault();
      addCategory();
    };
    const formFieldNames = ["name", "description", "products", "isActive"];
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
                type="name"
                placeholder="Enter name"
                value={categoryFormData.name}
                onChange={(e) => categoryChange("name", e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand description"
                value={categoryFormData.description}
                onChange={(e) => categoryChange("description", e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <SelectOption
                error={formErrors["products"]}
                label={"Select Products"}
                multi={true}
                value={categoryFormData.products}
                options={products}
                handleSelectChange={(value) => {
                  categoryChange("products", value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Is the brand active?"
                checked={categoryFormData.isActive}
                onChange={(value) => categoryChange("isActive", value)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit">Add Brand</Button>
          </Form>
        </FormContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.productsSelect,

    categoryFormData: state.brand.categoryFormData,
    formErrors: state.brand.formErrors,
  };
};

export default connect(mapStateToProps, actions)(Add);
