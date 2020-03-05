import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "semantic-ui-react";
import { Button, Card, CardBody, CardGroup, Container } from "reactstrap";
import { connect } from "react-redux";
import { login } from "../../../actions/registration/loginRegn";
import { showError } from "../../../actions";
import ErrorModal from "../../../containers/DefaultLayout/errorMessage";

class Login extends Component {
  state = {
    fmobileno: "",
    fpasswd: "",
    fmobileerror: false,
    fpasswderror: false
  };

  login = async (e, data) => {
    e.preventDefault();
    const { fmobileno, fpasswd } = this.state;
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
    if (fpasswd === "") {
      const error = { header: "Error", content: "Enter Your password" };
      this.props.showError(error);
      this.setState({ fpasswderror: true });
      return;
    }
    const login = { fmobileno: fmobileno, fpasswd: fpasswd };
    await this.props.login(login);
  };

  handleChange = (e, data) => {
    // validation for accepting only numbers
    this.setState({ fmobileerror: false, fpasswderror: false });
    if (!/^\d*$/.test(data.value) && data.name == "fmobileno") return;
    this.setState({ [data.name]: data.value });
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <div className="row justify-content-center">
            <ErrorModal />
            <div className="col-md-8">
              <CardGroup>
                <Card
                  className="text-white bg-blue py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        alignContent: "center"
                      }}
                    >
                      <h2 style={{ width: "100%" }}>E-Governance Portal</h2>
                    </div>
                  </CardBody>
                </Card>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.login}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <Form.Field>
                        <Form.Input
                          error={this.state.fmobileerror}
                          maxLength="10"
                          minLength="10"
                          name="fmobileno"
                          autoFocus
                          icon="mobile alternate"
                          iconPosition="left"
                          placeholder="Mobile No."
                          value={this.state.fmobileno}
                          onChange={this.handleChange}
                          autoComplete="off"
                        />
                      </Form.Field>
                      <Form.Field>
                        <Form.Input
                          error={this.state.fpasswderror}
                          name="fpasswd"
                          type="password"
                          icon="lock"
                          iconPosition="left"
                          placeholder="Password...."
                          maxLength="25"
                          value={this.state.fpasswd}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <div className="row">
                        <div className="col-md-6">
                          <Button color="primary" className="px-4">
                            Login
                          </Button>
                        </div>
                        <div
                          className="col-md-6"
                          style={{ textAlign: "right" }}
                        >
                          <Link to="/forgot-passwd">
                            <Button color="link" className="px-0">
                              <b>Forgot password?</b>
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="row">
                        <div style={{ margin: "0 auto" }}>
                          <Link to="/register">
                            <Button
                              color="link"
                              className="mt-3"
                              active
                              tabIndex={-1}
                            >
                              <b>Click here to Register</b>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logindet: state.login
  };
};
export default connect(
  mapStateToProps,
  {
    login,
    showError
  }
)(Login);
