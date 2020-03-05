import React, { Component } from "react";
import {
  Card,
  Form,
  Divider,
  Dropdown,
  Button,
  Modal,
  Icon,
  Header
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { showError } from "../../../actions";
import { connect } from "react-redux";
import InputMask from "react-input-mask";
import { lastDateUpdate } from "../../../actions/utils/lastDateUpdate";

class LastDateUpdate extends Component {
  state = {
    fchndate: false,
    etype: "",
    fcollfrm: "",
    fcollto: "",
    fdegfrm: "",
    fdegto: "",
    fexmto: "",
    fexmfrm: "",
    fdatefrm: "",
    fdateto: "",
    open: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.lastDU !== prevProps.lastDU) {
      this.setState({
        fchndate: false,
        etype: "",
        fcollfrm: "",
        fcollto: "",
        fdegfrm: "",
        fdegto: "",
        fexmto: "",
        fexmfrm: "",
        fdatefrm: "",
        fdateto: "",
        open: false
      });
    }
  }

  handleChange = (e, data) => {
    switch (data.type) {
      case "text":
        this.setState({ [data.name]: data.value });
        return;
      default:
        this.setState({ [data.name]: data.value });
        return;
    }
  };

  handleChangedate = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const {
      etype,
      fcollfrm,
      fcollto,
      fdegfrm,
      fdegto,
      fexmto,
      fexmfrm
    } = this.state;
    const { fyear, fexamtype, fexamrange, fdeggrp } = this.props.degdet;

    console.log(
      "submitBtn",
      etype,
      fcollfrm,
      fcollto,
      fdegfrm,
      fdegto,
      fexmto,
      fexmfrm
    );
    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }
    if (fcollfrm === "") {
      const error = { header: "Error", content: "Enter College Range" };
      this.props.showError(error);
      return;
    }

    if (fdegfrm === "") {
      const error = { header: "Error", content: "Enter Degree range" };
      this.props.showError(error);
      return;
    }
    if (fexamrange === "") {
      const error = { header: "Error", content: "Enter Exam Range" };
      this.props.showError(error);
      return;
    }

    if (etype === "") {
      const error = { header: "Error", content: "Select Event Type" };
      this.props.showError(error);
      return;
    }
    this.setState({ fchndate: true });
  };

  handleSave = () => {
    const {
      fdatefrm,
      fdateto,
      etype,
      fcollfrm,
      fcollto,
      fdegfrm,
      fdegto,
      fexmto,
      fexmfrm,
      open
    } = this.state;
    const { fyear, fexamtype, fexamrange, fdeggrp } = this.props.degdet;

    if (fdatefrm === "" || fdateto === "") {
      const error = { header: "Error", content: "Enter New Date" };
      this.props.showError(error);
      return;
    } else {
      this.setState({ open: false });
    }
    const data = [
      {
        fdatefrm: fdatefrm,
        fdateto: fdateto,
        etype: etype,
        fcollfrm: fcollfrm,
        fcollto: fcollto,
        fdegfrm: fdegfrm,
        fdegto: fdegto,
        fexamrange: fexamrange,
        fdeggrp: fdeggrp
      }
    ];

    this.props.lastDateUpdate(data);
  };
  show = size => () => this.setState({ size, open: true });
  close = () => this.setState({ open: false });

  render() {
    const {
      etype,
      fcollfrm,
      fcollto,
      fdegfrm,
      fdegto,
      fexmto,
      fexmfrm,
      fchndate,
      fdatefrm,
      fdateto,
      open,
      size
    } = this.state;

    const event_options = [
      { key: "Admission", value: "Admission", text: "Admission" },
      {
        key: "Exam Registration",
        value: "Exam Registration",
        text: "Exam Registration"
      },
      { key: "Hall Ticket", value: "Hall Ticket", text: "Hall Ticket" },
      { key: "IA Marks", value: "IA Marks", text: "IA Marks" },
      {
        key: "Practical Marks",
        value: "Practical Marks",
        text: "Practical Marks"
      },
      {
        key: "Attendance Entry",
        value: "Attendance Entry",
        text: "Attendance Entry"
      }
    ];

    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };

    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Last Date Updation</h4>
              <div className="ml-auto">
                <Button
                  basic
                  color="blue"
                  onClick={this.show("mini")}
                  content="Save"
                  icon="file"
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
            <Card.Description style={{ overflowY: "auto", height: "69vh" }}>
              <div className="col-md-7 col-lg-7 col-sm-12">
                <Form>
                  <Form.Field width={10}>
                    <label>Events</label>
                    <Dropdown
                      placeholder="Select Events"
                      search
                      selection
                      name="etype"
                      value={etype}
                      options={event_options}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Group>
                    <Form.Field width={5}>
                      <Form.Input
                        placeholder="From"
                        name="fcollfrm"
                        value={fcollfrm}
                        onChange={this.handleChange}
                        maxLength="4"
                        label="College Range"
                      />
                    </Form.Field>
                    <Form.Field width={5}>
                      <Form.Input
                        placeholder="To"
                        name="fcollto"
                        value={fcollto}
                        onChange={this.handleChange}
                        maxLength="4"
                        style={{ marginTop: "1.6em" }}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={5}>
                      <Form.Input
                        placeholder="From"
                        name="fdegfrm"
                        value={fdegfrm}
                        onChange={this.handleChange}
                        maxLength="5"
                        label="Degree Range"
                      />
                    </Form.Field>
                    <Form.Field width={5}>
                      <Form.Input
                        placeholder="To"
                        name="fdegto"
                        value={fdegto}
                        onChange={this.handleChange}
                        maxLength="5"
                        style={{ marginTop: "1.6em" }}
                      />
                    </Form.Field>
                  </Form.Group>

                  <Button
                    color="blue"
                    onClick={this.handleSubmit}
                    content="Submit"
                  />
                </Form>
              </div>
              {fchndate ? (
                <div>
                  <Divider />
                  <div className="col-md-7">
                    <Form>
                      <Form.Group>
                        <Form.Field width={5}>
                          <label> New Date Range </label>
                          <InputMask
                            formatChars={formatChars}
                            type="text"
                            value={fdatefrm}
                            mask="ed/nm/zyyy"
                            placeholder="From"
                            name="fdatefrm"
                            onChange={this.handleChangedate}
                          />
                        </Form.Field>
                        <Form.Field width={5}>
                          <InputMask
                            formatChars={formatChars}
                            type="text"
                            value={fdateto}
                            mask="ed/nm/zyyy"
                            placeholder="To"
                            name="fdateto"
                            onChange={this.handleChangedate}
                            style={{ marginTop: "1.6em" }}
                          />
                        </Form.Field>
                      </Form.Group>
                    </Form>
                  </div>
                </div>
              ) : null}
            </Card.Description>
          </Card.Content>
        </Card>
        <Modal
          size={size}
          open={open}
          onClose={this.close}
          style={{ height: "auto" }}
        >
          <Modal.Header>Last Date Update</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to Update Dates</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.close}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yes"
              onClick={this.handleSave}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    degdet: state.user,
    lastDU: state.lastDU
  };
};

export default connect(
  mapStateToProps,
  {
    showError,
    lastDateUpdate
  }
)(LastDateUpdate);
