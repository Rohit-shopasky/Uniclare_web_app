import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Form, Dropdown, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchDegGrp, getReport } from "../../../actions";
import { ReportAPI } from "../../../apis/consts";
import { showError } from "../../../actions";
import { wHeight } from "../../parms";

class DegreeReports extends Component {
  state = {
    frmDeggrp: "",
    fdeggrpfrm: this.props.user.fdeggrp,
    fdeggrpto: this.props.user.fdeggrp,
    fdegfrm: '0',
    fdegto: 'zzzzz',
    reportType: "degreeListSummary",
    frmSubmit: false
  };

  componentDidMount() {
    const resObj = this.searchObject(
      this.props.menu.items,
      this.props.location.pathname
    );
  }

  searchObject = (searchArr, search) => {
    // const string = search;
    var obj = [];
    const searchResult = searchArr.filter(o => {
      if (o.url === search) {
        obj = o;
        return;
      }
      if (o.hasOwnProperty("children")) {
        let res = o.children.filter(el => {
          return el.url === search;
        });
        if (res.length !== 0) {
          obj = res;
          return;
        }
      }
    });
    return obj[0];
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
    this.props.getReport(reportType, "tables", fdeggrp);
    this.setState({ frmSubmit: true });
  };

  handleReport = () => {
    const { fdeggrp } = this.props.user;
    const { reportType, fdeggrpfrm, fdeggrpto, fdegfrm, fdegto } = this.state;
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
      "&degfrm=" +
      fdegfrm +
      "&degto=" +
      fdegto +
      "&val=" +
      reportType +
      "&format=" +
      "PDF",
      "_blank"
    );
  };

  handleCancel = () => {
    this.setState({
      fdeggrpfrm: this.props.user.fdeggrp,
      fdeggrpto: this.props.user.fdeggrp,
      fdegfrm: '0',
      fdegto: 'zzzzz',
      reportType: "",
      reportFormat: "",
      frmDeggrp: ""
    });
  };

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h3>Degree Reports</h3>
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
    const { frmSubmit, fdeggrpfrm, fdeggrpto, fdegfrm, fdegto, reportType } = this.state;

    const reporttypeOptions = [
      { value: "degreeListSummary", text: "Degree List Summary" },
      { value: "degreeListDetailed", text: "Degree List Detailed" },
      { value: "degreeWiseCollegeList", text: "Degree Wise College List" },
      { value: "univAdmDegList", text: "University Admission Degree" }
    ];
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
                  <Form.Group>
                    <Form.Input
                      placeholder="From"
                      value={fdegfrm}
                      width={8}
                      name="fdegfrm"
                      onChange={this.handleChange}
                      label="Degree Range"
                    />
                    <Form.Input
                      placeholder="To"
                      name="fdegto"
                      value={fdegto}
                      width={8}
                      onChange={this.handleChange}
                      style={{ marginTop: "1.6em" }}
                    />
                  </Form.Group>
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
)(DegreeReports);
