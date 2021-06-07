/*
 *
 * Edit
 *
 */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Switch from "../Common/Switch";
import SelectOption from "../Common/SelectOption";
import actions from "../../actions/index.js";
import FormError from "../../components/Common/FormError";
import { Container } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../FormContainer";

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
      brand,
      brandEditChange,
      formErrors,
      updateBrand,
      deleteBrand,
      activateBrand,
    } = this.props;
    const handleSubmit = (event) => {
      event.preventDefault();
      updateBrand();
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
                type="name"
                placeholder="Enter name"
                value={brand.name}
                onChange={(e) => brandEditChange("name", e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand description"
                value={brand.description}
                onChange={(e) => brandEditChange("description", e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Switch
                style={{ width: 100 }}
                tooltip={brand.isActive}
                tooltipContent={`Disabling ${brand.name} will also disable all ${brand.name} products.`}
                id={`enable-brand-${brand._id}`}
                name={"isActive"}
                label={"Active?"}
                checked={brand.isActive}
                toggleCheckboxChange={(value) =>
                  activateBrand(brand._id, value)
                }
              />
            </Form.Group>

            <Button type="submit" variant="secondary">
              Save
            </Button>
            <Button variant="danger" onClick={() => deleteBrand(brand._id)}>
              Delete
            </Button>
          </Form>
        </FormContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    brand: state.brand.brand,
    brandFormData: state.brand.brandFormData,
    formErrors: state.brand.formErrors,
  };
};

export default connect(mapStateToProps, actions)(Edit);
