/*
 * Edit
 */

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Switch from "../Common/Switch";
import SelectOption from "../Common/SelectOption";
import actions from "../../actions/index.js";
import FormError from "../../components/Common/FormError";
import { Container } from "react-bootstrap";
import FormContainer from "../FormContainer";
import { Form, Button } from "react-bootstrap";

class Edit extends React.PureComponent {
  componentDidMount() {
    const brandId = this.props.match.params.id;
    this.props.fetchBrand(brandId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const brandId = this.props.match.params.id;
      this.props.fetchBrand(brandId);
    }
  }
  render() {
    const {
      history,
      products,
      category,
      formErrors,
      categoryEditChange,
      updateCategory,
      deleteCategory,
      activateCategory,
    } = this.props;

    const handleSubmit = (event) => {
      event.preventDefault();
      updateCategory();
    };
    const formFieldNames = ["name", "description", "products", "isActive"];

    return (
      <>
        <Container>
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
                  value={category.name}
                  onChange={(e) => categoryEditChange("name", e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter brand description"
                  value={category.description}
                  onChange={(e) =>
                    categoryEditChange("description", e.target.value)
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <SelectOption
                  error={formErrors["products"]}
                  label={"Select Products"}
                  multi={true}
                  defaultValue={category.products}
                  options={products}
                  handleSelectChange={(value) => {
                    categoryEditChange("products", value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Switch
                  style={{ width: 100 }}
                  tooltip={category.isActive}
                  tooltipContent={`Disabling ${category.name} will also disable all ${category.name} products.`}
                  id={`enable-brand-${category._id}`}
                  name={"isActive"}
                  label={"Active?"}
                  checked={category.isActive}
                  toggleCheckboxChange={(value) =>
                    activateCategory(category._id, value)
                  }
                />
              </Form.Group>

              <Button type="submit" variant="secondary">
                Save
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteCategory(category._id)}
              >
                Delete
              </Button>
            </Form>
          </FormContainer>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.productsSelect,

    brandFormData: state.brand.brandFormData,
    formErrors: state.brand.formErrors,
  };
};

export default connect(mapStateToProps, actions)(Edit);
