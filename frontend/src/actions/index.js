/**
 *
 * actions.js
 * actions configuration
 */

import { bindActionCreators } from "redux";

import * as authenticationActions from "./authenticationActions.js";
import * as cartActions from "./cartActions.js";
import * as contactUsActions from "./contactUsActions.js";
import * as forgotPasswordActions from "./forgotPasswordActions.js";
import * as merchantActions from "./merchantActions.js";
import * as newsletterActions from "./newsletterActions.js";
import * as orderActions from "./orderActions.js";
import * as productActions from "./productActions.js";
import * as resetPasswordActions from "./resetPasswordActions.js";
import * as userActions from "./userActions.js";
import * as brandActions from "./brandActions.js";
import * as categoryActions from './categoryActions.js'
export default function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...authenticationActions,
      ...cartActions,
      ...contactUsActions,
      ...forgotPasswordActions,
      ...resetPasswordActions,
      ...merchantActions,
      ...newsletterActions,
      ...orderActions,
      ...productActions,
      ...userActions,
      ...brandActions,
      ...categoryActions,

    },
    dispatch
  );
}
