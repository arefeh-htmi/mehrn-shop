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
          {userInfo && userInfo.role === "ROLE_ADMIN" && (
            <>
              <Route exact path="/dashboard/category" component={List} />
              <Route exact path="/dashboard/category/edit/:id" component={Edit} />
              <Route exact path="/dashboard/category/add" component={Add} />
            </>
          )}
          {userInfo && userInfo.role === "ROLE_MERCHANT" && (
            <>
              <Route exact path="/dashboard/category" component={List} />
              <Route
                exact
                path="/dashboard/category/edit/:id"
                component={Edit}
              />
              <Route exact path="/dashboard/category/add" component={Add} />
            </>
          )}

          {/* <Route path="*" component={Page404} /> */}
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
