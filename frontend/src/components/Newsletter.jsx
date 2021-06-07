/*
 *
 * Newsletter
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";

import {
  newsletterChange,
  subscribeToNewsletter,
} from "../actions/newsletterActions";

// import Input from '../../components/Common/Input';
// import Button from '../../components/Common/Button';

class Newsletter extends React.PureComponent {
  render() {
    const {
      // email,

      newsletterChange,
      subscribeToNewsletter,

      // formErrors
    } = this.props;

    const handleSubmit = (event) => {
      event.preventDefault();
      subscribeToNewsletter();
    };

    return (
      <>
        <p>Sign Up for Our Newsletter</p>

        <Form onSubmit={handleSubmit} inline style={{ margin: 0 }}>
          <Form.Control
            type="text"
            name="email"
            onChange={(name, value) => {
              newsletterChange(name, value);
            }}
            style={{ marginRight: ".5rem" }}
            placeholder=""
          ></Form.Control>
          <Button type="submit" variant="outline-success" className="p-2">
            Subscribe
          </Button>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // email: state.newsletter.email,
    // formErrors: state.newsletter.formErrors,
  };
};

export default connect(mapStateToProps, {
  subscribeToNewsletter,
  newsletterChange,
})(Newsletter);
