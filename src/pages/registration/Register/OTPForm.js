import React, { Component } from "react";
import { Form, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { changeRegn, signup } from "../../../actions/registration/loginRegn";
import { showError } from "../../../actions";
class OTPForm extends Component {
  handleChange = (e, { name, value }) => {
    this.props.changeRegn(name, value);
  };

  signup = () => {
    this.props.signup();
  };

  render() {
    const { fmotp, feotp, fmobvalid } = this.props.regn;

    return (
      <div className="mt-3">
        {fmobvalid ? (
          <Form onSubmit={this.signup}>
            <Form.Field>
              <Form.Input
                name="fmotp"
                type="text"
                icon="mobile alternate"
                iconPosition="left"
                placeholder="Mobile OTP"
                maxLength="6"
                minLength="6"
                value={fmotp}
                onChange={this.handleChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                name="feotp"
                type="text"
                icon="envelope outline"
                iconPosition="left"
                placeholder="Email OTP"
                maxLength="6"
                minLength="6"
                value={feotp}
                onChange={this.handleChange}
                required
              />
              <div className="row">
                <div className="col-md-6">
                  <Button color="blue" className="px-4">
                    Sign UP
                  </Button>
                </div>
              </div>
            </Form.Field>
          </Form>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    regn: state.regn
  };
};
export default connect(
  mapStateToProps,
  {
    showError,
    changeRegn,
    signup
  }
)(OTPForm);
