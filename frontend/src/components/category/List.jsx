/*
 * List
 */
import React from "react";
import { connect } from "react-redux";
import actions from "../../actions/index.js";
import Loader from "../Common/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";

class List extends React.PureComponent {
  render() {
    const { history, categories, isLoading } = this.props;

    return (
      <>
        {isLoading ? (
          <Loader />
        ) : categories && categories.length > 0 ? (
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
                {categories.map((brand, index) => (
                  <tr key={brand._id}>
                    <td>{brand._id}</td>
                    <td>{brand.createdAt.substring(0, 10)}</td>
                    <td>{brand.name}</td>
                    <td>{brand.description}</td>
                    <td>
                      {brand.merchant &&
                      brand.merchant._id !== this.props.userInfo.merchant
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
        ) : //   <NotFound message="no categories found." />
        null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    formErrors: state.brand.formErrors,
    userInfo: state.userLogin.userInfo,
  };
};

export default connect(mapStateToProps, actions)(List);
