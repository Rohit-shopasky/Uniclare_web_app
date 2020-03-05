import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import ErrorModal from "../../../containers/DefaultLayout/errorMessage";
import { clearRegn } from "../../../actions/registration/loginRegn";
import InitForm from "./initform";
import RegnForm from "./RegnForm";
import OTPForm from "./OTPForm";

class Register extends Component {
  componentWillUnmount() {
    this.props.clearRegn();
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <ErrorModal />
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Registration</h1>
                  <p className="text-muted">Create your account</p>
                  <InitForm />
                  <RegnForm />
                  <OTPForm />
                  <div className="row">
                    <div style={{ margin: "1em auto" }}>
                      <b>
                        Have you already registered?
                        <Link to="/" className="ui link">
                          Click Here
                        </Link>
                      </b>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
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
    clearRegn
  }
)(Register);
