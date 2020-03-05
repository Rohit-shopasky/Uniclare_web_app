import React, { Component } from "react";
import { Form, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  changeRegn,
  validatemob
} from "../../../actions/registration/loginRegn";
import { showError } from "../../../actions";
class RegnForm extends Component {
  handleChange = (e, { name, value }) => {
    this.props.changeRegn(name, value);
  };

  validateMobileno = () => {
    const { fpasswd, fcpasswd } = this.props.regn;
    if (fpasswd !== fcpasswd) {
      const error = {
        header: "Error",
        content: "Password and confirm password should be same"
      };
      this.props.showError(error);
      return;
    }
    this.props.validatemob();
  };

  render() {
    const {
      fmobileno,
      femail,
      fpasswd,
      fcpasswd,
      fregvalid,
      fmobvalid
    } = this.props.regn;

    return (
      <div className="mt-3">
        {fregvalid ? (
          <Form onSubmit={this.validateMobileno}>
            <Form.Field>
              <Form.Input
                required
                autoComplete="off"
                name="fmobileno"
                type="text"
                icon="mobile alternate"
                iconPosition="left"
                placeholder="Mobile No."
                maxLength="10"
                minLength="10"
                value={fmobileno}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                required
                name="femail"
                type="email"
                icon="envelope outline"
                iconPosition="left"
                placeholder="Email ID"
                maxLength="70"
                minLength="6"
                value={femail}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                required
                name="fpasswd"
                type="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                minLength="8"
                maxLength="25"
                value={fpasswd}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                required
                name="fcpasswd"
                type="password"
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                minLength="8"
                maxLength="25"
                value={fcpasswd}
                onChange={this.handleChange}
              />

              <div className="row">
                <div className="col-md-6">
                  <Button color="blue" className="px-4">
                    {fmobvalid ? "Resend-OTP" : "Send-OTP"}
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
    validatemob
  }
)(RegnForm);
