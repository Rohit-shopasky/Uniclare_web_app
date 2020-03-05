import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Form,
  Dropdown,
  Divider,
  Radio
} from "semantic-ui-react";
import { connect } from "react-redux";
import { ReportAPI } from "../../../apis/consts";
import { showError } from "../../../actions";
import InputMask from "react-input-mask";
import { wHeight } from "../../parms";
import moment from "moment";

class ValuationReports extends Component {
  state = {
    frmDeggrp: "",
    frmSubmit: false,
    ftcode: "",
    vdatefrom: moment()
      .subtract(7, "days")
      .format("DD/MM/YYYY"),
    vdateto: moment().format("DD/MM/YYYY")
  };

  handleChange = (e, data) => {
    switch (data.type) {
      case "text":
        this.setState({ [data.name]: data.value });
      default:
        this.setState({ [data.name]: data.value });
    }
    this.setState({ frmSubmit: false });
  };

  handleSubmit = () => {
    const { fdeggrp } = this.props.user;
    const { vdatefrom, vdateto } = this.state;
    console.log(vdatefrom, vdateto, fdeggrp);
    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }
    // this.props.getReport(reportType, "tables", fdeggrp);
    this.setState({ frmSubmit: true });
  };

  handleReport = () => {
    const { fdeggrp, fcuruniv } = this.props.user;
    const {
      reportType,
      rftype,
      tcodefrom,
      tcodeto,
      vdatefrom,
      vdateto
    } = this.state;
    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }
    window.open(
      ReportAPI +
        reportType +
        "&univcode=" +
        fcuruniv +
        "&deggrp=" +
        fdeggrp +
        "&tcodefrom=" +
        tcodefrom +
        "&tcodeto=" +
        tcodeto +
        "&vdatefrom=" +
        vdatefrom +
        "&vdateto=" +
        vdateto +
        "&format=" +
        rftype +
        "&user=" +
        JSON.stringify(this.props.user),
      "_blank"
    );
  };
  handleChangedate = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCancel = () => {
    this.setState({
      reportType: "",
      reportFormat: "",
      frmDeggrp: ""
    });
  };

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h3>Valuation Bill</h3>
        <div className="ml-auto">
          <Button
            basic
            color="blue"
            onClick={this.handleReport}
            content="Report"
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
    );
  };

  render() {
    const { frmSubmit, ftcode, vdatefrom, vdateto } = this.state;
    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };
    const wheight = wHeight();

    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            {this.renderHeader()}
            <Divider />
            <Card.Description
              style={{ overflowY: "auto", height: `${wheight}px` }}
            >
              <div className="col-md-6">
                <Form>
                  <Form.Group>
                    <Form.Field width={8}>
                      <label> Date Range </label>
                      <InputMask
                        formatChars={formatChars}
                        type="text"
                        value={vdatefrom}
                        mask="ed/nm/zyyy"
                        placeholder="Date From"
                        name="vdatefrom"
                        onChange={this.handleChangedate}
                      />
                    </Form.Field>
                    <Form.Field width={8}>
                      <InputMask
                        formatChars={formatChars}
                        type="text"
                        value={vdateto}
                        mask="ed/nm/zyyy"
                        placeholder="To"
                        name="vdateto"
                        onChange={this.handleChangedate}
                        style={{ marginTop: "1.6em" }}
                      />
                    </Form.Field>
                  </Form.Group>
                  {this.props.user.fcurtype < 600 ? (
                    <Form.Group>
                      <Form.Field width={16}>
                        <label> Teacher Code</label>
                        <Form.Input
                          formatChars={formatChars}
                          type="text"
                          value={ftcode}
                          placeholder="Enter Teacher Code"
                          name="ftcode"
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    </Form.Group>
                  ) : null}
                  <Button color="blue" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </Form>
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  {
    showError
  }
)(ValuationReports);
