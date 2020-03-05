import React, { Component } from "react";
import { connect } from "react-redux";
import { showError } from "../../actions";
import { changePassword } from "../../actions/registration/loginRegn";
//
import { Button, Modal, Form, Icon } from "semantic-ui-react";

class ChangePassword extends Component {
  state = {
    foldpasswd: "",
    ospass: "false",
    nspass: "false",
    cspass: "false",
    fnpasswd: "",
    fcpasswd: ""
  };

  close = () => {
    this.setState({
      foldpasswd: "",
      ospass: "false",
      nspass: "false",
      cspass: "false",
      fnpasswd: "",
      fcpasswd: ""
    });
    this.props.close();
  };

  handleChange = (e, data) => {
    this.setState({
      ...this.state,
      [data.name]: data.value
    });
  };

  handleSubmit = () => {
    const { foldpasswd, fnpasswd, fcpasswd } = this.state;
    if (foldpasswd === "") {
      const error = { header: "Error", content: "Enter old Passwd" };
      this.props.showError(error);
      return;
    }
    if (foldpasswd.length <= 7) {
      const error = {
        header: "Error",
        content: "Enter minimum of 8 charcters for old Passwd"
      };
      this.props.showError(error);
      return;
    }

    if (fnpasswd === "") {
      const error = { header: "Error", content: "Enter new Passwd" };
      this.props.showError(error);
      return;
    }
    if (fnpasswd.length <= 7) {
      const error = {
        header: "Error",
        content: "Enter minimum of 8 charcters for new Passwd"
      };
      this.props.showError(error);
      return;
    }

    if (fnpasswd !== fcpasswd) {
      const error = {
        header: "Error",
        content: "New Password and confirm password should be same"
      };
      this.props.showError(error);
      return;
    }

    if (foldpasswd === fcpasswd) {
      const error = {
        header: "Error",
        content: "Cannot change password since old and new password are same"
      };
      this.props.showError(error);
      this.close();
      return;
    }
    const req = { foldpasswd, fnpasswd, fcpasswd };
    console.log(req);
    this.props.changePassword(req);
    this.close();
  };

  seePasswd = (e, data) => {
    this.setState({ ...this.state, [data.id]: !this.state[data.id] });
  };

  render() {
    const wHeight = (window.innerHeight * 50) / 100;
    const { foldpasswd, fnpasswd, fcpasswd } = this.state;
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
            Update Password
          </Modal.Header>
          <Modal.Content style={{ height: "73%", overflowY: "auto" }}>
            <Form>
              <Form.Input
                placeholder="Enter old Password"
                type={this.state.ospass ? "password" : "text"}
                name="foldpasswd"
                onChange={this.handleChange}
                value={foldpasswd}
                // width={4}
                icon={
                  <Icon
                    name={this.state.ospass ? "eye slash" : "eye"}
                    id="ospass"
                    link
                    onClick={this.seePasswd}
                  />
                }
                maxLength="25"
                minLength="8"
                label="Old Password"
              />

              <Form.Input
                placeholder="Enter New Password"
                type={this.state.nspass ? "password" : "text"}
                name="fnpasswd"
                onChange={this.handleChange}
                value={fnpasswd}
                icon={
                  <Icon
                    name={this.state.nspass ? "eye slash" : "eye"}
                    id="nspass"
                    link
                    onClick={this.seePasswd}
                  />
                }
                maxLength="25"
                minLength="8"
                // width={4}
                label="New Password"
              />

              <Form.Input
                placeholder="Confirm Password"
                type={this.state.cspass ? "password" : "text"}
                name="fcpasswd"
                onChange={this.handleChange}
                value={fcpasswd}
                icon={
                  <Icon
                    name={this.state.cspass ? "eye slash" : "eye"}
                    id="cspass"
                    link
                    onClick={this.seePasswd}
                  />
                }
                maxLength="25"
                minLength="8"
                // width={4}
                label="ConfirmPassword"
              />
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
  { showError, changePassword }
)(ChangePassword);

// export default ErrorModal
