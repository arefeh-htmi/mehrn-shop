/*
 *
 * List
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FormError from "../../components/Common/FormError";
import actions from "../../actions/index.js";
import Loader from "../Common/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";

class List extends React.PureComponent {
  render() {
    const { brands, isLoading } = this.props;
    return (
      <>
        {isLoading ? (
          <Loader />
        ) : brands && brands.length > 0 ? (
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>NAME</th>
                  <th>DESCRIPTION</th>
                  <th>BRAND CREATOR</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand, index) => (
                  <tr key={brand._id}>
                    <td>{brand._id}</td>
                    <td>{brand.createdAt.substring(0, 10)}</td>
                    <td>{brand.name}</td>
                    <td>{brand.description}</td>
                    <td>
                      {brand.merchant._id !== this.props.userInfo.merchant
                        ? brand.merchant.name
                        : null}
                    </td>
                    <td>
                      <LinkContainer to={`/dashboard/brand/edit/${brand._id}`}>
                        <Button variant="light" className="btn-sm">
                          Edit
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : //   <NotFound message="no brands found." />
        null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.brand.isLoading,
    brands: state.brand.brands,
    brandFormData: state.brand.brandFormData,
    formErrors: state.brand.formErrors,
    userInfo: state.userLogin.userInfo,
  };
};

export default connect(mapStateToProps, actions)(List);
