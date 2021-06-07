/*
 *
 * Merchant
 *
 */

import React from "react";
import { Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import actions from "../../actions";
// import NotFound from "../../components/Common/NotFound";
import Loader from "../../components/Loader";
import { formatDate } from "../../utils/date";
class Merchant extends React.PureComponent {
  componentDidMount() {
    this.props.fetchMerchants();
  }

  render() {
    const {
      merchants,
      isLoading,
      approveMerchant,
      rejectMerchant,
      deleteMerchant,
    } = this.props;

    return (
      <div className="merchant-dashboard">
        {isLoading ? (
          <Loader />
        ) : merchants.length > 0 ? (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Business</th>
                <th>Brand</th>
                <th>Status</th>
                <th>Request date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((merchant, index) => (
                <tr key={index}>
                  <td>{merchant.name}</td>
                  <td>{merchant.email ? merchant.email : "N/A"}</td>
                  <td>{merchant.phoneNumber}</td>
                  <td>{merchant.business}</td>
                  <td>{merchant.brand}</td>
                  <td>
                    {merchant.status === "Approved" && (
                      <>
                        <p> {merchant.name} is approved</p>
                        <Button
                          text="Delete"
                          onClick={() => deleteMerchant(merchant._id)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                    {merchant.status === "Rejected" && (
                      <>
                        <p> {merchant.name} is rejected</p>
                        <Button
                          variant="primary"
                          onClick={() => approveMerchant(merchant)}
                        >
                          Approve
                        </Button>
                      </>
                    )}
                    {merchant.status !== "Approved" &&
                      merchant.status !== "Rejected" && (
                        <>
                          <Button
                            text="Delete"
                            onClick={() => deleteMerchant(merchant._id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => approveMerchant(merchant)}
                          >
                            Approve
                          </Button>
                        </>
                      )}
                  </td>

                  <td>{formatDate(merchant.created)}</td>

                  <td>
                    <Button
                      onClick={() => deleteMerchant(merchant._id)}
                      variant="danger"
                    >
                      Delete Merchant
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          // <NotFound message="no merchants found." />
          <></>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    merchants: state.merchant.merchants,
    isLoading: state.merchant.isLoading,
  };
};

export default connect(mapStateToProps, actions)(Merchant);
