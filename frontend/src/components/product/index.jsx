/*
 *
 * Category
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import actions from "../../actions/";

import List from "./List";
import Add from "./Add";
import Edit from "./Edit";
// import Page404 from "../../components/Common/Page404";

class Category extends React.PureComponent {
  render() {
    const { userInfo } = this.props;

    return (
      <Switch>
        <>
          <Route
            exact
            path="/dashboard/productlist/:pageNumber"
            component={List}
          />
          <Route exact path="/dashboard/productlist" component={List} />

          <Route exact path="/dashboard/product/:id/edit" component={Edit} />
          <Route exact path="/dashboard/product/add" component={Add} />
        </>

      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userLogin.userInfo,
  };
};

export default connect(mapStateToProps, actions)(Category);
