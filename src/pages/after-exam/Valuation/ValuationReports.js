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
    reportType: "datewWiseValDet",
    frmSubmit: false,
    rftype: "PDF",
    tcodefrom: "0000",
    tcodeto: "zzzz",
    vdatefrom: moment()
      .subtract(7, "days")
      .format("DD/MM/YYYY"),
    vdateto: moment().format("DD/MM/YYYY")
  };

  getDegrees = (e, data) => {
    // console.log(data.value);
    this.setState({ frmDeggrp: data.value });
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
    const { reportType } = this.state;
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
        <h3>Valuation Reports</h3>
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
    const {
      frmSubmit,
      reportType,
      rftype,
      tcodefrom,
      tcodeto,
      vdatefrom,
      vdateto
    } = this.state;

    const reporttypeOptions = [
      { value: "datewWiseValDet", text: "Date Wise Valuation Details" },
      { value: "teachWorkDone", text: "Work Done Statement" }
    ];
    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };
    const wheight = wHeight();
    console.log(reportType, frmSubmit);
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
                  <Form.Field>
                    <label>Report Type</label>
                    <Dropdown
                      placeholder="Select Report Type"
                      name="reportType"
                      value={reportType}
                      selection
                      search
                      options={reporttypeOptions}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  {reportType === "datewWiseValDet" ? (
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
                  ) : null}
                  <Form.Group>
                    <Form.Input
                      placeholder="From"
                      value={tcodefrom}
                      width={8}
                      name="tcodefrom"
                      onChange={this.handleChange}
                      maxLength="5"
                      label="Teacher code Range"
                    />
                    <Form.Input
                      placeholder="To"
                      name="tcodeto"
                      value={tcodeto}
                      width={8}
                      onChange={this.handleChange}
                      maxLength="5"
                      style={{ marginTop: "1.6em" }}
                    />
                  </Form.Group>

                  {/* <Form.Group inline>
                    <Form.Field
                      control={Radio}
                      name="rftype"
                      label="PDF"
                      value="PDF"
                      checked={rftype === "PDF"}
                      onChange={this.handleChange}
                    />
                    <Form.Field
                      control={Radio}
                      name="rftype"
                      label="EXCEL"
                      value="Excel"
                      checked={rftype === "Excel"}
                      onChange={this.handleChange}
                    />
                  </Form.Group> */}

                  {/* <Button color="blue" onClick={this.handleSubmit}>
                    Submit
                  </Button> */}
                  <br />
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
