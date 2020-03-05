import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { Card, CardBody, Container } from "reactstrap";
import { connect } from "react-redux";
import {
  changefgt,
  sendFgtOtp,
  resetPassword,
  clearFgt
} from "../../../actions/registration/loginRegn";
import { showError } from "../../../actions";
import ErrorModal from "../../../containers/DefaultLayout/errorMessage";

class ForgotPasswd extends Component {
  sendOtp = async (e, data) => {
    e.preventDefault();
    const { fmobileno } = this.props.fgtpasswd;
    if (fmobileno === "") {
      const error = { header: "Error", content: "Enter Mobile No." };
      this.props.showError(error);
      this.setState({ fmobileerror: true });
      return;
    }
    if (fmobileno.length < 10) {
      const error = {
        header: "Error",
        content: "Enter 10 digits for Mobile No."
      };
      this.props.showError(error);
      this.setState({ fmobileerror: true });
      return;
    }
    await this.props.sendFgtOtp();
  };

  handleChange = (e, { name, value }) => {
    // validation for accepting only numbers
    if (!/^\d*$/.test(value) && (name === "fmobileno" || name === "fmotp"))
      return;
    this.props.changefgt(name, value);
  };

  resetPassword = () => {
    const { fmotp, fcpasswd, fpasswd } = this.props.fgtpasswd;
    if (fmotp === "") {
      const error = { header: "Error", content: "Enter OTP" };
      this.props.showError(error);
      this.setState({ fmobileerror: true });
      return;
    }
    if (fmotp.length < 6) {
      const error = { header: "Error", content: "Enter 6 digits for OTP" };
      this.props.showError(error);
      this.setState({ fmobileerror: true });
      return;
    }
    if (fpasswd === "") {
      const error = { header: "Error", content: "Enter Password" };
      this.props.showError(error);
      this.setState({ fmobileerror: true });
      return;
    }
    if (fpasswd.length < 8) {
      const error = { header: "Error", content: "Enter 8 digits for Password" };
      this.props.showError(error);
      this.setState({ fmobileerror: true });
      return;
    }
    if (fcpasswd === "") {
      const error = { header: "Error", content: "Enter confirm Password" };
      this.props.showError(error);
      this.setState({ fmobileerror: true });
      return;
    }
    if (fcpasswd.length < 8) {
      const error = {
        header: "Error",
        content: "Enter 8 digits for confirm Password"
      };
      this.props.showError(error);
      this.setState({ fmobileerror: true });
      return;
    }
    if (fcpasswd !== fpasswd) {
      const error = {
        header: "Error",
        content: "Password and confirm Password are not same."
      };
      this.props.showError(error);
      this.setState({ fmobileerror: true });
      return;
    }
    this.props.resetPassword();
  };

  componentWillUnmount() {
    this.props.clearFgt();
  }

  render() {
    const {
      fmobileno,
      fmotp,
      fcpasswd,
      fpasswd,
      fmobvalid
    } = this.props.fgtpasswd;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <div className="row justify-content-center">
            <ErrorModal />
            <div className="col-md-9 col-lg-6 col-xl-5">
              <Card className="p-4">
                <CardBody>
                  <Form>
                    <h1>Forgot Password</h1>
                    <p className="text-muted">Reset your password</p>
                    <Form.Field>
                      <Form.Input
                        maxLength="10"
                        minLength="10"
                        name="fmobileno"
                        autoFocus
                        icon="mobile alternate"
                        iconPosition="left"
                        placeholder="Registered Mobile No."
                        value={fmobileno}
                        onChange={this.handleChange}
                        autoComplete="off"
                        readOnly={fmobvalid}
                      />
                      <div className="row">
                        <div className="col-md-6">
                          <Button
                            color="blue"
                            className="px-4"
                            onClick={this.sendOtp}
                          >
                            {fmobvalid ? "Resend-OTP" : "Send-OTP"}
                          </Button>
                        </div>
                      </div>
                    </Form.Field>

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
                          <Button
                            color="blue"
                            className="px-4"
                            onClick={this.resetPassword}
                          >
                            Reset Password
                          </Button>
                        </div>
                      </div>
                    </Form.Field>
                    <div className="row">
                      <div style={{ margin: "0 auto" }}>
                        <div style={{ margin: "1em auto" }}>
                          <b>
                            <Link to="/" className="ui link">
                              Click here to Login
                            </Link>
                          </b>
                        </div>
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fgtpasswd: state.fgtpasswd
  };
};
export default connect(
  mapStateToProps,
  {
    changefgt,
    showError,
    sendFgtOtp,
    resetPassword,
    clearFgt
  }
)(ForgotPasswd);
