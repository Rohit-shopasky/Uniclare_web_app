import React, { Component } from "react";
import {
  Form,
  Card,
  Header,
  Button,
  Dropdown,
  Divider
} from "semantic-ui-react";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";
import {
  getUserType,
  getUserDetails,
  changeUserDetails,
  saveUserDetails
} from "../../../actions/utils/createUser";
import { fetchUnivs } from "../../../actions";
import { connect } from "react-redux";
import { showError } from "../../../actions";
import { wHeight } from "../../parms";

class CreateUser extends Component {
  state = {
    fdob: "",
    shwDet: false,
    fmobileno: "",
    sendSms: false
  };

  handleSubmit = async () => {
    let error = {
      header: "Error",
      content: "Please enter valid Mobile No."
    };

    const a =
      this.state.fmobileno.length < 10
        ? await this.props.showError(error)
        : (await this.props.getUserDetails(this.state.fmobileno),
          await this.props.getUserType("CreateUser"),
          await this.props.fetchUnivs(),
          this.setState({ disabled: true }),
          this.props.userDetails != ""
            ? this.setState({ shwDet: true })
            : this.props.userDetails.fname == ""
            ? alert(this.props.userDetails.fname)
            : this.setState({ shwDet: false }));
  };

  handleChangedate = async e => {
    this.setState({ fdob: e.target.value }, () =>
      this.props.changeUserDetails("fdob", this.state.fdob)
    );
  };

  handleChange = async (e, { name, value }) => {
    name == "fmobileno"
      ? this.setState({ [name]: value })
      : this.props.changeUserDetails(name, value);
  };

  handleMultiple = (e, { name, value }) => {
    var str = "";
    value.map((el, i) =>
      i < value.length && el != "" ? (str = `${el}*${str}`) : null
    );
    this.props.changeUserDetails(name, str);
  };

  changeCheckBox = () => {
    this.state.sendSms
      ? this.setState({ sendSms: false })
      : this.setState({ sendSms: true });
  };

  handleCreate = async () => {
    const data = this.props.userDetails;
    var error;
    if (!this.state.shwDet) {
      error = {
        header: "Error",
        content: "No Details to Update."
      };
    }
    if (data.fname == "") {
      error = {
        header: "Error",
        content: "Please enter Degree Despcription."
      };
    }
    if (data.fmobileno == "" || data.femail == "") {
      error = {
        header: "Error",
        content: "Contact Number or Email cannot be empty."
      };
    }
    if (data.priusertype == "") {
      error = {
        header: "Error",
        content: "Please enter Primary User Type."
      };
    }
    //console.log("ataaaa", error);
    // return (
    //   error != "" || typeof error != "undefined"
    //     ? await this.props.showError(error)
    //     : await this.props.saveUserDetails(),
    //   this.setState({ shwDet: false })
    // );

    if (typeof error == "undefined") {
      await this.props.saveUserDetails(this.state.sendSms);
      this.setState({ shwDet: false });
    } else {
      await this.props.showError(error);
    }
  };

  handleCancel = () => {
    this.setState({ shwDet: false, disabled: false, fmobileno: "" });
  }; //9738122862

  render() {
    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };
    const userTypeList = this.props.userTypeList;
    const userDetails = this.props.userDetails;
    const user = this.props.user;

    const userTypeOpt = userTypeList
      .filter((el, i) => {
        return el.FUSERTYPE > user.fcurtype;
      })
      .map((el, i) => {
        return {
          key: i,
          value: el.FUSERTYPE,
          text: `${el.FUSERTYPE} - ${el.FTYPEDESC}`
        };
      });

    const AdditionalUTOpt = userTypeList
      .filter((el, i) => {
        return (
          el.FUSERTYPE != userDetails.priusertype &&
          el.FUSERTYPE > user.fcurtype
        );
      })
      .map((el, i) => {
        return {
          key: i,
          value: el.FUSERTYPE,
          text: `${el.FUSERTYPE} - ${el.FTYPEDESC}`
        };
      });
    if (userDetails.addiusertype != null) {
      var str = userDetails.addiusertype;
      var addiusertype = str.split("*");
    }

    addiusertype = addiusertype == undefined ? [] : addiusertype;
    const wheight = wHeight();
    let univsOpt = this.props.univs.map((el, i) => {
      return {
        key: i,
        value: el.funivcode,
        text: `${el.funivcode} - ${el.funivname}`
      };
    });

    return (
      <>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <Header as="h3">Create User</Header>
              <div className="ml-auto">
                <Button
                  basic
                  color="blue"
                  content="Create / Update"
                  onClick={this.handleCreate}
                  icon="upload"
                />
                <Button
                  basic
                  color="black"
                  icon="ban"
                  onClick={this.handleCancel}
                  content="Cancel"
                />
                <Link to="/dashboard">
                  <Button basic color="red" content="Exit" icon="home" />
                </Link>
              </div>
            </Card.Header>
            <Divider />
            <Card.Description
              style={{
                overflowY: "auto",
                height: `${wheight}px`,
                width: "100%"
              }}
            >
              <Form>
                <Form.Field width={4}>
                  <Form.Input
                    id="fmobileno"
                    label="Enter Contact No."
                    placeholder="Contact No."
                    name="fmobileno"
                    value={this.state.fmobileno}
                    readOnly={this.state.disabled}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Button
                  content="Submit"
                  color="blue"
                  onClick={this.handleSubmit}
                />
              </Form>
              <Divider />
              {this.state.shwDet && (
                <Form>
                  <Form.Group>
                    <Form.Field width={8}>
                      <Form.Input
                        type="text"
                        placeholder="Name"
                        label="User Name"
                        name="fname"
                        value={userDetails.fname}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field width={2}>
                      <label>Date of Birth</label>
                      <InputMask
                        type="text"
                        placeholder="DOB"
                        name="fdob"
                        mask="ed/nm/zyyy"
                        formatChars={formatChars}
                        value={userDetails.fdob}
                        onChange={this.handleChangedate}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={4}>
                      <Form.Input
                        id="fmobileno"
                        name="fmobileno"
                        maxLength="10"
                        minLength="10"
                        value={userDetails.fmobileno}
                        onChange={this.handleChange}
                        label="Contact No."
                        placeholder="Contact No."
                        readOnly
                      />
                    </Form.Field>
                    <Form.Field width={6}>
                      <Form.Input
                        id="femail"
                        name="femail"
                        value={userDetails.femail}
                        onChange={this.handleChange}
                        label="Email ID"
                        placeholder="abc@xyz.com"
                      />
                    </Form.Field>
                  </Form.Group>

                  <Form.Group inline width={4}>
                    <label>Gender</label>
                    <Form.Radio
                      label="Male"
                      value="M"
                      name="fsex"
                      onChange={this.handleChange}
                      checked={userDetails.fsex == "M"}
                    />
                    <Form.Radio
                      label="Female"
                      value="F"
                      name="fsex"
                      checked={userDetails.fsex == "F"}
                      onChange={this.handleChange}
                    />

                    <label>Active Status</label>
                    <Form.Radio
                      label="Active"
                      value="T"
                      name="factive"
                      onChange={this.handleChange}
                      checked={userDetails.factive == "T"}
                    />
                    <Form.Radio
                      label="Inactive"
                      value="F"
                      name="factive"
                      checked={userDetails.factive == "F"}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Field width={10}>
                    <label>Select University</label>
                    <Dropdown
                      placeholder="Universities"
                      search
                      selection
                      // multiple
                      id="funivcode"
                      name="funivcode"
                      value={userDetails.funivcode}
                      onChange={this.handleChange}
                      options={univsOpt}
                    />
                  </Form.Field>
                  <Form.Field width={10}>
                    <label>Primary User Type</label>
                    <Dropdown
                      placeholder="Primary User Type"
                      search
                      selection
                      id="priusertype"
                      name="priusertype"
                      value={userDetails.priusertype}
                      options={userTypeOpt}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field width={10}>
                    <label>Additional User Type</label>
                    <Dropdown
                      placeholder="Additional User Type"
                      search
                      selection
                      multiple
                      id="addiusertype"
                      name="addiusertype"
                      value={addiusertype}
                      onChange={this.handleMultiple}
                      options={AdditionalUTOpt}
                    />
                  </Form.Field>

                  <Form.Field width={10}>
                    <label>Send login credentials to this user by SMS. </label>

                    <input
                      type="checkbox"
                      checked={this.state.sendSms}
                      onClick={this.changeCheckBox}
                      tabindex="0"
                      class="hidden"
                    />
                  </Form.Field>
                  {/* <Form.Field width={10}>
                    <Form.Input
                      type="text"
                      id="fpasswd"
                      name="fpasswd"
                      value={userDetails.fpasswd}
                      onChange={this.handleChange}
                      label="Default Password"
                      placeholder="Password"
                    />
                  </Form.Field> */}
                </Form>
              )}
            </Card.Description>
          </Card.Content>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userTypeList: state.userTypeList,
    userDetails: state.userDetails,
    user: state.user,
    univs: state.univs
  };
};
export default connect(
  mapStateToProps,
  {
    fetchUnivs,
    getUserType,
    getUserDetails,
    changeUserDetails,
    saveUserDetails,
    showError
  }
)(CreateUser);
