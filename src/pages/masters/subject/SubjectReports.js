import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Form, Dropdown, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchDegGrp, getReport } from "../../../actions";
import { ReportAPI } from "../../../apis/consts";
import { showError } from "../../../actions";
import { wHeight } from "../../parms";

class SubjectReports extends Component {
  state = {
    fdegfrm: '0',
    fdegto: 'zzzzz',
    fdeggrpfrm: this.props.user.fdeggrp,
    fdeggrpto: this.props.user.fdeggrp,
    fboardfrm: '0',
    fboardto: 'zzzzz',
    fqpfrm: '0',
    fqpto: 'zzzzz',
    fsemRng: 'ABCDEF',
    frmDeggrp: "",
    reportType: "degreeWiseSubjectList",
    frmSubmit: false
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
    const { reportType, fdeggrpfrm, fdeggrpto, fdegfrm, fdegto, fsemRng, fboardfrm, fboardto, fqpfrm, fqpto } = this.state;
    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }
    let fsemno = fsemRng.split("").join("','");
    console.log("kjLashfkj ", fsemno);
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
      "&semRng=" +
      fsemno +
      "&boardfrm=" +
      fboardfrm +
      "&boardto=" +
      fboardto +
      "&qpfrm=" +
      fqpfrm +
      "&qpto=" +
      fqpto +
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
      fsemRng: 'ABCDEF',
      fboardfrm: '0',
      fboardto: 'zzzzz',
      fqpfrm: '0',
      fqpto: 'zzzzz',
      reportType: "degreeWiseSubjectList",
      reportFormat: "",
      frmDeggrp: ""
    });
  };

  renderHeader = () => {
    console.log("hgjfdf", this.state.fdeggrpto.fdeggrp);
    return (
      <Card.Header style={{ display: "flex" }}>
        <h3>Subject Reports</h3>
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
    const { frmSubmit, reportType, fdeggrpfrm, fdeggrpto, fdegfrm, fdegto, fsemRng, fboardfrm, fboardto, fqpfrm, fqpto } = this.state;

    const reporttypeOptions = [
      { value: "degreeWiseSubjectList", text: "Degree Wise Subject List" },
      { value: "qpWiseSubjectList", text: "QP Wise Subject List" },
      { value: "mainSubjectLevelList", text: "Main Subject Level List" }
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
                  {(this.state.reportType == 'degreeWiseSubjectList' || this.state.reportType == 'mainSubjectLevelList') ? (
                    <div>
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
                      <Form.Group>
                        <Form.Input
                          value={fsemRng}
                          width={16}
                          name="fsemRng"
                          onChange={this.handleChange}
                          label="Semester Range (Ex.:ABCDEF)"
                        />
                      </Form.Group>
                    </div>
                  ) : null}

                  {this.state.reportType == 'qpWiseSubjectList' ? (
                    <div>
                      <Form.Group>
                        <Form.Input
                          placeholder="From"
                          value={fboardfrm}
                          width={8}
                          name="fboardfrm"
                          onChange={this.handleChange}
                          label="Board Range"
                        />
                        <Form.Input
                          placeholder="To"
                          name="fboardto"
                          value={fboardto}
                          width={8}
                          onChange={this.handleChange}
                          style={{ marginTop: "1.6em" }}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Input
                          placeholder="From"
                          value={fqpfrm}
                          width={8}
                          name="fqpfrm"
                          onChange={this.handleChange}
                          maxLength="5"
                          label="QP Range"
                        />
                        <Form.Input
                          placeholder="To"
                          name="fqpto"
                          value={fqpto}
                          width={8}
                          onChange={this.handleChange}
                          maxLength="5"
                          style={{ marginTop: "1.6em" }}
                        />
                      </Form.Group>
                    </div>
                  ) : null}
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
)(SubjectReports);
