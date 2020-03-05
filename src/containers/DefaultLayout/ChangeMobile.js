import React, { Component } from "react";
import { connect } from "react-redux";
import { showError } from "../../actions";
import {
  changeMobSendOTP,
  changeMobileNo
} from "../../actions/registration/loginRegn";
//
import { Button, Modal, Form, Icon } from "semantic-ui-react";

class ChangeMobile extends Component {
  state = {
    fmobileno: "",
    fpasswd: "",
    spass: true,
    frmsubmit: false,
    fmotp: ""
  };

  close = () => {
    this.setState({
      fmobileno: "",
      fpasswd: "",
      spass: true,
      frmsubmit: false,
      fotp: ""
    });
    this.props.close();
  };

  handleChange = (e, data) => {
    if (
      !/^\d*$/.test(data.value) &&
      (data.name === "fmobileno" || data.name === "fmotp")
    )
      return;
    this.setState({ [data.name]: data.value });
  };

  handleSubmit = () => {
    const { fmobileno, fmotp, frmsubmit } = this.state;

    if (!frmsubmit || fmotp === "") {
      const error = {
        header: "Error",
        content: "Enter OTP to update Mobile No."
      };
      this.props.showError(error);
      return;
    }
    if (fmotp.length < 6) {
      const error = {
        header: "Error",
        content: "Enter minimum of 6 charcters for OTP"
      };
      this.props.showError(error);
      return;
    }

    const req = { fmobileno, fmotp };
    this.props.changeMobileNo(req);
    this.close();
  };

  sendOtp = async () => {
    const { fmobileno, fpasswd } = this.state;

    if (fmobileno === "") {
      const error = { header: "Error", content: "Enter Mobile No." };
      this.props.showError(error);
      return;
    }
    if (fmobileno.length !== 10) {
      const error = {
        header: "Error",
        content: "Enter valid Mobile no."
      };
      this.props.showError(error);
      return;
    }

    if (fpasswd === "") {
      const error = { header: "Error", content: "Enter Passwd" };
      this.props.showError(error);
      return;
    }
    if (fpasswd.length <= 7) {
      const error = {
        header: "Error",
        content: "Enter minimum of 8 charcters for Passwd"
      };
      this.props.showError(error);
      return;
    }
    const res = await this.props.changeMobSendOTP({ fmobileno, fpasswd });
    if (res === 0) this.setState({ frmsubmit: true });
  };

  seePasswd = (e, data) => {
    this.setState({ ...this.state, [data.id]: !this.state[data.id] });
  };

  render() {
    const wHeight = (window.innerHeight * 50) / 100;
    const { fmobileno, fpasswd, frmsubmit, fmotp } = this.state;
    return (
      <div>
        <Modal
          dimmer="inverted"
          style={{ height: `${wHeight}px` }}
          size="mini"
          open={this.props.open}
          onClose={this.close}
        >
          <Modal.Header
            style={{
              color: "#fff",
              backgroundColor: "#1e799e",
              padding: "0.5em 1em"
            }}
          >
            Update Mobile No.
          </Modal.Header>
          <Modal.Content style={{ height: "73%", overflowY: "auto" }}>
            <Form>
              <Form.Field>
                <Form.Input
                  maxLength="10"
                  minLength="10"
                  name="fmobileno"
                  placeholder="New Mobile No."
                  value={fmobileno}
                  onChange={this.handleChange}
                  autoComplete="off"
                  label="New Mobile No"
                  readOnly={frmsubmit}
                />
              </Form.Field>

              <Form.Input
                placeholder="Enter Password"
                type={this.state.spass ? "password" : "text"}
                name="fpasswd"
                onChange={this.handleChange}
                value={fpasswd}
                icon={
                  <Icon
                    name={this.state.spass ? "eye slash" : "eye"}
                    id="spass"
                    link
                    onClick={this.seePasswd}
                  />
                }
                maxLength="25"
                minLength="8"
                autoComplete="off"
                label="Password"
              />
              <Button
                style={{ padding: "0.5em 1em" }}
                color="blue"
                onClick={this.sendOtp}
              >
                {frmsubmit ? "Resend-OTP" : "Send-OTP"}
              </Button>
              {frmsubmit ? (
                <Form.Field style={{ marginTop: "10px" }}>
                  <Form.Input
                    name="fmotp"
                    type="text"
                    placeholder="OTP"
                    maxLength="6"
                    minLength="6"
                    value={fmotp}
                    onChange={this.handleChange}
                    label="OTP"
                  />
                </Form.Field>
              ) : null}
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              style={{ padding: "0.5em 1em" }}
              color="blue"
              onClick={this.handleSubmit}
              content="Update"
            />

            <Button
              ref="error_ok"
              style={{ padding: "0.5em 1em" }}
              color="black"
              onClick={this.close}
              content="Close"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(
  mapStateToProps,
  { showError, changeMobSendOTP, changeMobileNo }
)(ChangeMobile);

// export default ErrorModal
