import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Form, Dropdown, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchDegGrp, getReport } from "../../actions";
import { ReportAPI } from "../../apis/consts";
import { showError } from "../../actions";
import { wHeight } from "../parms";

class PgetReports extends Component {
  state = {
    frmDeggrp: "",
    reportType: "pgetAppliedList",
    frmSubmit: false
  };

  componentDidMount() {}

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
    // const { fdeggrp } = this.props.user;
    // const { reportType } = this.state;
    // if (fdeggrp === "") {
    //   const error = { header: "Error", content: "Select Degree Group" };
    //   this.props.showError(error);
    //   return;
    // }
    // this.props.getReport(reportType, "tables", fdeggrp);
    // this.setState({ frmSubmit: true });
  };

  handleReport = () => {
    const { fdeggrp } = this.props.user;
    const { reportType } = this.state;
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
      reportFormat: "",
      frmDeggrp: ""
    });
  };

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h3>PG Entrance Test Reports</h3>
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
    const { frmSubmit, reportType } = this.state;

    const reporttypeOptions = [
      { value: "pgetAppliedList", text: "Degree Wise Applied Student List" },
      { value: "pgetFeedetlList", text: "Fee Paid Student List" },
      { value: "pgetAppStatus", text: "Application Status" }
    ];
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

                  <Button color="blue" onClick={this.handleSubmit}>
                    Submit
                  </Button>
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
    deggrp: state.deggrp,
    collegeReport: state.collegeReport,
    univcode: state.univ.funivcode,
    user: state.user,
    menu: state.menu
  };
};
export default connect(
  mapStateToProps,
  {
    fetchDegGrp,
    getReport,
    showError
  }
)(PgetReports);
