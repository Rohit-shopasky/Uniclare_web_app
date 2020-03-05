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
import { fetchDegGrp, getReport, getDropDownOptions } from "../../../actions";
import { ReportAPI } from "../../../apis/consts";
import { showError } from "../../../actions";
import { wHeight } from "../../parms";
import { fetchDegColl } from "../../../actions/before-exam/centers";
import { getActiveCollegeList } from "../../../actions/masters/activeclglist";
import dateMaster from "../../before-exam/timetable/dateMaster";

class StudentReports extends Component {
  state = {
    frmDeggrp: "",
    reportType: "degreeWiseStudentCount",
    frmSubmit: false,
    rftype: "PDF",
    fcollcode: "",
    clgdrop: false,
    fdegfrom: 0,
    fdegto: "ZZZZ",
    fcolfrom: "0",
    fcolto: "ZZZZ",
    fsubfrom: "0",
    fsubto: "ZZZZ",
    showSubRange: false,
    fexamrange: "ABCD",
    fdeggrpfrom: "",
    fdeggrpto: "",
    moduleType: "",
    showRadioButton: false,
    showExamRange: false,
    reportOptions: [
      { value: "degreeWiseStudentCount", text: "Degree,Category,Genderwise Student Count", type: "GENDER" },
      { value: "studentwiseCollList", text: "Collegewise Students List", type: "GENDER" },
      { value: "collegewiseSummaryReport", text: "College, Category,Genderwise Student Count", type: "GENDER" },

      { value: "getCombwiseStudCunt", text: "Combinationwise student count", type: "ADM" },
      // { value: "generateCandidateListReport", text: "Candidate List" },
      { value: "examRegistrationSummary", text: "Exam Registration Summary", type: "EXAM" },
      { value: "examRegistrationDetail", text: "Exam Registration Detail", type: "EXAM" },
      { value: "admissionSummary", text: "Admission Summary", type: "ADM" },
      { value: "admissionDetail", text: "Admission Detail", type: "ADM" },
    ],

    currentReportType: "",

  };

  getDegrees = (e, data) => {
    // console.log(data.value);
    this.setState({ frmDeggrp: data.value });
  };

  handleChange = async (e, data) => {
    console.log("opt", this.props.dropDownOptions);

    // make range capital
    if (data.name == "fdegfrom" || data.name == "fdegto" || data.name == "fcolfrom" || data.name == "fcolto" || data.name == "fsubfrom" || data.name == "fsubto" || data.name == "fdeggrpfrom" || data.name == "fdeggrpto") {
      data.value = data.value.toUpperCase();
    }

    let ddOptions = [];
    if (data.name == "moduleType") {
      // console.log(this.props.fetchDropDownOptions);
      if (data.value == "ADM") {
        this.props.dropDownOptions.map(element => {
          if (element.fcode == "SRADM") {
            let obj = {};
            obj.text = element.fdescpn;
            obj.value = element.fvalue;
            ddOptions.push(obj);
          }
        });
      } else if (data.value == "EXAM") {
        this.props.dropDownOptions.map(element => {
          if (element.fcode == "SREXA") {
            let obj = {};
            obj.text = element.fdescpn;
            obj.value = element.fvalue;
            ddOptions.push(obj);
          }
        });
      }
      else if (data.value == "GEN") {
        this.props.dropDownOptions.map(element => {
          if (element.fcode == "SRGEN") {
            let obj = {};
            obj.text = element.fdescpn;
            obj.value = element.fvalue;
            ddOptions.push(obj);
          }
        });
      }
      console.log("options", ddOptions);
      this.setState({ currentReportType: ddOptions });
    }

    switch (data.type) {
      case "text":
        await this.setState({ [data.name]: data.value });

      default:
        this.setState({ [data.name]: data.value });
    }


    if (data.value == "ADM" || data.value == "EXAM") {
      this.setState({ showSubRange: true });
      this.setState({ showRadioButton: false });

    }
    if (data.value == "GEN") {
      this.setState({ showSubRange: false });
    }
    // else {
    //   this.setState({ showSubRange: false });
    // 

    if (data.value == "GEN")
      this.setState({ showRadioButton: true });

    if (data.value == "EXAM")
      this.setState({ showExamRange: true });

    if (data.value == "ADM" || data.value == "GEN")
      this.setState({ showExamRange: false });




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

    const { reportType, rftype } = this.state;
    if (this.state.showSubRange == true) {

      let er = this.state.fexamrange;
      er = er.split("").join("','");
      console.log("first");
      console.log(er);
      window.open(
        ReportAPI +
        reportType +
        "&univcode=" +
        this.props.univcode +
        "&deggrp=" +
        fdeggrp +
        "&format=" +
        rftype +
        "&fcollfrom=" +
        this.state.fcolfrom +
        "&fcollto=" +
        this.state.fcolto +
        "&fdegfrom=" +
        this.state.fdegfrom +
        "&fdegto=" +
        this.state.fdegto +
        "&fdeggrpfrom=" +
        this.state.fdeggrpfrom +
        "&fdeggrpto=" +
        this.state.fdeggrpto +
        "&fsubfrom=" +
        this.state.fsubfrom +
        "&fsubto=" +
        this.state.fsubto +
        "&fexamrange=" +
        er,
        "_blank"
      );
    }
    else {
      window.open(
        ReportAPI +
        reportType +
        "&univcode=" +
        this.props.univcode +
        "&deggrp=" +
        fdeggrp +
        "&format=" +
        rftype +
        "&fcollfrom=" +
        this.state.fcolfrom +
        "&fcollto=" +
        this.state.fcolto +
        "&fdegfrom=" +
        this.state.fdegfrom +
        "&fdegto=" +
        this.state.fdegto +
        "&fdeggrpfrom=" +
        this.state.fdeggrpfrom +
        "&fdeggrpto=" +
        this.state.fdeggrpto,
        "_blank"
      );
    }

  };

  handleCancel = () => {
    this.setState({
      reportType: "",
      reportFormat: "",
      frmDeggrp: "",
      studentType: ""
    });
  };

  handleFromChange = (e, data) => {
    // console.log("value", e.target.name, e.target.value);
    let name = e.target.name;
    let value = e.target.value;
    if (name == "fdegfrom" || name == "fcolfrom" || name == "fsubfrom") {
      if (name == "fdegfrom")
        value == "0" ? this.setState({ fdegto: "ZZZZ" }) : this.setState({ fdegto: value })
      if (name == "fcolfrom")
        value == "0" ? this.setState({ fcolto: "ZZZZ" }) : this.setState({ fcolto: value })
      if (name == "fsubfrom")
        value == "0" ? this.setState({ fsubto: "ZZZZ" }) : this.setState({ fsubto: value })

      if (name == "fdeggrpfrom")
        value == "0" ? this.setState({ fdeggrpto: "ZZZZ" }) : this.setState({ fdeggrpto: value })

    }


  }

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h3>Student Reports</h3>
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

  componentDidMount = () => {
    this.setState({ fdeggrpfrom: this.props.user.fdeggrp, fdeggrpto: this.props.user.fdeggrp });

    this.props.getDropDownOptions();
    console.log("api called", this.props.dropDownOptions);

  }

  render() {
    const { frmSubmit, reportType, rftype, fcollcode, fdegfrom, fdegto, fcolfrom, fcolto, fdeggrpfrom, fdeggrpto, fsubfrom, fsubto, clgdrop, showSubRange, fexamrange, moduleType, currentReportType } = this.state;


    const moduleTypeOptions = [
      { value: "ADM", text: "Admmision" },
      { value: "EXAM", text: "Exam" },
      { value: "GEN", text: "General Report" },
    ];

    const colgname = this.props.college.filter(
      item => item.fcollcode == this.props.user.fcollcode
    )[0];

    const collegeOptions =
      parseInt(this.props.user.fcurtype) < 499
        ? this.props.degcoll.map(item => {
          return {
            value: item.fcollcode,
            text: item.fcollname
          };
        })
        : [
          {
            value: colgname.fcollcode,
            text: `${colgname.fcollcode}  ${colgname.fcollname} `
          }
        ];

    const wheight = wHeight();
    // console.log(reportType, frmSubmit);
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
                    <label>Module Type</label>
                    <Dropdown
                      placeholder="Select Module Type"
                      name="moduleType"
                      value={moduleType}
                      selection
                      search
                      options={moduleTypeOptions}
                      onChange={this.handleChange}
                    />
                    <label>Report Type</label>
                    <Dropdown
                      placeholder="Select Report Type"
                      name="reportType"
                      value={reportType}
                      selection
                      search
                      options={currentReportType}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Group>
                    <Form.Input
                      placeholder="From"
                      value={fdeggrpfrom}
                      width={8}
                      name="fdeggrpfrom"
                      onChange={this.handleChange}
                      onBlur={this.handleFromChange}
                      maxLength="5"
                      label="Degree Group Range"
                    />
                    <Form.Input
                      placeholder="To"
                      name="fdeggrpto"
                      value={fdeggrpto}
                      width={8}
                      onChange={this.handleChange}
                      maxLength="5"
                      style={{ marginTop: "1.6em" }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      placeholder="From"
                      value={fdegfrom}
                      width={8}
                      name="fdegfrom"
                      onChange={this.handleChange}
                      onBlur={this.handleFromChange}

                      maxLength="5"
                      label="Degree Range"
                    />
                    <Form.Input
                      placeholder="To"
                      name="fdegto"
                      value={fdegto}
                      width={8}
                      onChange={this.handleChange}
                      maxLength="5"
                      style={{ marginTop: "1.6em" }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      placeholder="From"
                      value={fcolfrom}
                      width={8}
                      name="fcolfrom"
                      onChange={this.handleChange}
                      onBlur={this.handleFromChange}

                      maxLength="5"
                      label="College Range"
                    />
                    <Form.Input
                      placeholder="To"
                      name="fcolto"
                      value={fcolto}
                      width={8}
                      onChange={this.handleChange}
                      maxLength="5"
                      style={{ marginTop: "1.6em" }}
                    />
                  </Form.Group>



                  {showSubRange == true && (
                    <Form.Group>
                      <Form.Input
                        placeholder="From"
                        value={fsubfrom}
                        width={8}
                        name="fsubfrom"
                        onChange={this.handleChange}
                        maxLength="5"
                        label="Subject Code Range"
                      />
                      <Form.Input
                        placeholder="To"
                        name="fsubto"
                        value={fsubto}
                        width={8}
                        onChange={this.handleChange}
                        maxLength="5"
                        style={{ marginTop: "1.6em" }}
                      />

                    </Form.Group>

                  )}
                  {
                    this.state.showExamRange == true && (
                      <Form.Group>
                        <Form.Input
                          placeholder="To"
                          name="fexamrange"
                          value={fexamrange}
                          width={8}
                          onChange={this.handleChange}
                          maxLength="5"
                          // style={{ marginTop: "" }}
                          label="Exam Range"
                        />
                      </Form.Group>
                    )}
                  {this.state.showRadioButton && (
                    <Form.Group inline>
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
                    </Form.Group>
                  )}

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
  console.log("state", state.fetchDropDownOptions);
  return {
    deggrp: state.deggrp,
    collegeReport: state.collegeReport,
    univcode: state.univ.funivcode,
    user: state.user,
    menu: state.menu,
    degcoll: state.degcoll,
    college: state.activeCollege,
    dropDownOptions: state.fetchDropDownOptions

  };
};
export default connect(
  mapStateToProps,
  {
    fetchDegGrp,
    fetchDegColl,
    getReport,
    showError,
    getActiveCollegeList,
    getDropDownOptions
  }
)(StudentReports);
