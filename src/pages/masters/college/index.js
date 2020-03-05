import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Form, Dropdown, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchDegGrp, getReport } from "../../../actions";
import ColgReportDisplay from "./colg_report";
import { ReportAPI } from "../../../apis/consts";
import { showError } from "../../../actions";
import { wHeight } from "../../parms";

class College extends Component {
  state = {
    frmDeggrp: "",
    reportType: "Active College List",
    fdeggrpfrm: "0",
    fdeggrpto: "zzzzz",
    fcollfrm: "0",
    fcollto: "zzzzz",
    displayTbl: false
  };

  getDegrees = (e, data) => {
    // console.log(data.value);
    this.setState({ frmDeggrp: data.value });
  };

  handleChange = (e, data) => {
    switch (data.type) {
      case "text":
        this.setState({
          [data.name]: data.value
        });
      default:
        this.setState({
          [data.name]: data.value
        });
    }
    this.setState({ displayTbl: false });
  };

  handleSubmit = () => {
    const { fdeggrp } = this.props.user;
    const { reportType, fdeggrpfrm, fdeggrpto, fcollfrm, fcollto } = this.state;
    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }
    this.props.getReport(
      reportType,
      "tables",
      fdeggrp,
      fdeggrpfrm,
      fdeggrpto,
      fcollfrm,
      fcollto
    );
    this.setState({ displayTbl: true });
  };

  handleReport = () => {
    const { fdeggrp } = this.props.user;
    const { reportType, fdeggrpfrm, fdeggrpto, fcollfrm, fcollto } = this.state;
    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }
    window.open(
      ReportAPI +
        reportType +
        "&univcode=" +
        this.props.univcode +
        "&deggrp=" +
        fdeggrp +
        "&deggrpfrm=" +
        fdeggrpfrm +
        "&deggrpto=" +
        fdeggrpto +
        "&collfrm=" +
        fcollfrm +
        "&collto=" +
        fcollto +
        "&val=" +
        reportType +
        "&format=" +
        "PDF",
      "_blank"
    );
  };

  handleCancel = () => {
    this.setState({
      reportType: "",
      fdeggrpfrm: "0",
      fdeggrpto: "zzzzz",
      fcollfrm: "0",
      fcollto: "zzzzz",
      reportFormat: "",
      frmDeggrp: ""
    });
  };

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h3>College</h3>
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

  renderForm = () => {
    const {
      displayTbl,
      reportType,
      fdeggrpfrm,
      fdeggrpto,
      fcollfrm,
      fcollto
    } = this.state;

    const reporttypeOptions = [
      { value: "Active College List", text: "Active colleges" },
      { value: "Center College List", text: "Center List" },
      { value: "Center List With Tagged Colleges", text: "Tagged colleges" }
    ];
    const wheight = wHeight();
    console.log(reportType, displayTbl);
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
                    <Form.Field width={16}>
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
                  </Form.Group>
                  {reportType == "Active College List" ? (
                    <div>
                      <Form.Group>
                        <Form.Input
                          placeholder="From"
                          value={fdeggrpfrm}
                          width={8}
                          name="fdeggrpfrm"
                          onChange={this.handleChange}
                          label="Degree Group Range"
                        />
                        <Form.Input
                          placeholder="To"
                          name="fdeggrpto"
                          value={fdeggrpto}
                          width={8}
                          onChange={this.handleChange}
                          style={{ marginTop: "1.6em" }}
                        />
                      </Form.Group>
                    </div>
                  ) : null}
                  <Form.Group>
                    <Form.Input
                      placeholder="From"
                      value={fcollfrm}
                      width={8}
                      name="fcollfrm"
                      onChange={this.handleChange}
                      label="College Code Range"
                    />
                    <Form.Input
                      placeholder="To"
                      name="fcollto"
                      value={fcollto}
                      width={8}
                      onChange={this.handleChange}
                      style={{ marginTop: "1.6em" }}
                    />
                  </Form.Group>

                  <Button color="blue" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                  <br />
                </Form>
              </div>
              {displayTbl ? (
                <ColgReportDisplay
                  reportdet={this.props.collegeReport}
                  rtype={reportType}
                />
              ) : null}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  };
  render() {
    // console.log("collegeReport",this.props.collegeReport);
    return this.renderForm();
  }
}

const mapStateToProps = state => {
  return {
    deggrp: state.deggrp,
    collegeReport: state.collegeReport,
    univcode: state.univ.funivcode,
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  {
    fetchDegGrp,
    getReport,
    showError
  }
)(College);
