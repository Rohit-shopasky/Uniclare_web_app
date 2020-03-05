import React, { Component } from "react";
import {
  Card,
  Divider,
  Button,
  Form,
  Dropdown,
  Radio
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReportAPI } from "../../../apis/consts";
import { showError, getDropDownOptions } from "../../../actions";

class FeeReport extends Component {
  state = {
    fcollfrm: "00000",
    fcollto: "ZZZZZ",
    fdegfrm: "00000",
    fdegto: "ZZZZZ",
    rformat: "",
    rtype: "",
    range: false,
    rftype: "PDF Format",
    artype: "All",
    moduleType: "",
    report_options: [],
    moduleTypeOptions: [],
    examNoRange: "",
    showPdf: true,
    showExcel: true
  };

  handleChange = (e, data) => {
    let ddOptions = [];
    if (data.name == "moduleType") {
      // console.log(this.props.fetchDropDownOptions);
      if (data.value == "ADM") {
        this.props.fetchDropDownOptions.map(element => {
          if (element.fcode == "ADM") {
            let obj = {};
            obj.text = element.fdescpn;
            obj.value = element.fvalue;
            ddOptions.push(obj);
          }
        });
      } else if (data.value == "EXAM") {
        this.props.fetchDropDownOptions.map(element => {
          if (element.fcode == "EXAM") {
            let obj = {};
            obj.text = element.fdescpn;
            obj.value = element.fvalue;
            ddOptions.push(obj);
          }
        });
      }

      console.log("options", ddOptions);
      this.setState({ report_options: ddOptions });
    }

    this.setState({ [data.name]: data.value });
  };

  handleReport = () => {
    const {
      fcollfrm,
      fcollto,
      fdegfrm,
      fdegto,
      rformat,
      rtype,
      range,
      rftype,
      report_options,
      examNoRange
    } = this.state;

    const { fyear, fexamtype, fexamrange, fdeggrp } = this.props.degdet;
    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }
    if (range) {
      if (fcollfrm === "" || fcollto === "") {
        const error = { header: "Error", content: "Enter College Range" };
        this.props.showError(error);
        return;
      }

      if (fdegfrm === "" || fdegto === "") {
        const error = { header: "Error", content: "Enter Degree range" };
        this.props.showError(error);
        return;
      }
    }
    if (rformat === "") {
      const error = { header: "Error", content: "Select Report Format" };
      this.props.showError(error);
      return;
    }

    // if (rtype === "") {
    //   const error = { header: "Error", content: "Select Report Type" };
    //   this.props.showError(error);
    //   return;
    // }

    // if (rformat == "Duplicate Payment Report") {
    //   window.location.href =
    //     ReportAPI +
    //     "generateFeeSummaryReport.demo&Screentype=" +
    //     rformat +
    //     "&Degree=" +
    //     fdeggrp +
    //     "&cntr_from=" +
    //     fcollfrm +
    //     "&cntr_end=" +
    //     fcollto +
    //     "&degree_from=" +
    //     fdegfrm +
    //     "&degree_to=" +
    //     fdegto +
    //     "&exam_year=" +
    //     fyear +
    //     "&examno_from=" +
    //     fexamrange +
    //     "&exam_type=" +
    //     fexamtype +
    //     "&univcode=" +
    //     this.props.univcode;
    // } else if (
    //   rformat == "Studentwise Fee Report" &&
    //   rftype === "Excel Format"
    // ) {
    //   window.location.href =
    //     ReportAPI +
    //     "studwiseFeeReport&Screentype=" +
    //     rformat +
    //     "&Degree=" +
    //     fdeggrp +
    //     "&cntr_from=" +
    //     fcollfrm +
    //     "&cntr_end=" +
    //     fcollto +
    //     "&degree_from=" +
    //     fdegfrm +
    //     "&degree_to=" +
    //     fdegto +
    //     "&examno_from=" +
    //     fexamrange +
    //     // "&ReportType=" +
    //     // rtype +
    //     "&univcode=" +
    //     this.props.univcode +
    //     "&rftype=" +
    //     rftype;
    // } else if (rformat == "Studentwise Fee Report" && rftype === "PDF Format") {
    //   window.location.href =
    //     ReportAPI +
    //     "studwiseFeeReportPDF&Screentype=" +
    //     rformat +
    //     "&Degree=" +
    //     fdeggrp +
    //     "&cntr_from=" +
    //     fcollfrm +
    //     "&cntr_end=" +
    //     fcollto +
    //     "&degree_from=" +
    //     fdegfrm +
    //     "&degree_to=" +
    //     fdegto +
    //     "&examno_from=" +
    //     fexamrange +
    //     // "&ReportType=" +
    //     // rtype +
    //     "&univcode=" +
    //     this.props.univcode +
    //     "&rftype=" +
    //     rftype;
    // } else if (rformat == "Headwise Fee Report" && rftype === "PDF Format") {
    //   window.location.href =
    //     ReportAPI +
    //     "headwiseFeeReportPDF&Screentype=" +
    //     rformat +
    //     "&Degree=" +
    //     fdeggrp +
    //     "&cntr_from=" +
    //     fcollfrm +
    //     "&cntr_end=" +
    //     fcollto +
    //     "&degree_from=" +
    //     fdegfrm +
    //     "&degree_to=" +
    //     fdegto +
    //     "&examno_from=" +
    //     fexamrange +
    //     // "&ReportType=" +
    //     // rtype +
    //     "&univcode=" +
    //     this.props.univcode +
    //     "&rftype=" +
    //     rftype;
    // } else if (rformat == "Headwise Fee Report" && rftype === "Excel Format") {
    //   window.location.href =
    //     ReportAPI +
    //     "headwiseFeeReport&Screentype=" +
    //     rformat +
    //     "&Degree=" +
    //     fdeggrp +
    //     "&cntr_from=" +
    //     fcollfrm +
    //     "&cntr_end=" +
    //     fcollto +
    //     "&degree_from=" +
    //     fdegfrm +
    //     "&degree_to=" +
    //     fdegto +
    //     "&examno_from=" +
    //     fexamrange +
    //     // "&ReportType=" +
    //     // rtype +
    //     "&univcode=" +
    //     this.props.univcode +
    //     "&rftype=" +
    //     rftype;
    // } else if (
    //   rformat == "Fee Collection Report" &&
    //   rftype === "Excel Format"
    // ) {
    //   window.location.href =
    //     ReportAPI +
    //     "feeCollecReport&Screentype=" +
    //     rformat +
    //     "&Degree=" +
    //     fdeggrp +
    //     "&fcollfrm=" +
    //     fcollfrm +
    //     "&fcollto=" +
    //     fcollto +
    //     "&fdegfrm=" +
    //     fdegfrm +
    //     "&fdegto=" +
    //     fdegto +
    //     "&examno_from=" +
    //     fexamrange +
    //     // "&ReportType=" +
    //     // rtype +
    //     "&univcode=" +
    //     this.props.univcode +
    //     "&rftype=" +
    //     rftype;
    // } else {
    //   window.location.href =
    //     ReportAPI +
    //     "generateFeeSummaryReport.demo&Screentype=" +
    //     rformat +
    //     "&Degree=" +
    //     fdeggrp +
    //     "&cntr_from=" +
    //     fcollfrm +
    //     "&cntr_end=" +
    //     fcollto +
    //     "&degree_from=" +
    //     fdegfrm +
    //     "&degree_to=" +
    //     fdegto +
    //     "&examno_from=" +
    //     fexamrange +
    //     // "&ReportType=" +
    //     // rtype +
    //     "&univcode=" +
    //     this.props.univcode;
    // }

    console.log("rformat", rformat);
    window.open(
      ReportAPI +
        rformat +
        "&univcode=" +
        this.props.univcode +
        "&cntr_from=" +
        fcollfrm +
        "&cntr_end=" +
        fcollto +
        "&degree_from=" +
        fdegfrm +
        "&degree_to=" +
        fdegto +
        "&Degree=" +
        fdeggrp +
        "&examno_from=" +
        examNoRange,
      "_blank"
    );
  };

  componentDidMount = async () => {
    await this.props.getDropDownOptions();
    console.log("api called", this.props);
  };

  render() {
    const {
      fcollfrm,
      fcollto,
      fdegfrm,
      fdegto,
      rformat,
      rtype,
      rftype,
      artype,
      moduleType,
      report_options,
      examNoRange
    } = this.state;

    let moduleTypeOptions = [];
    this.props.fetchDropDownOptions.map(element => {
      if (element.fcode == "OPT1") {
        let obj = {};
        obj.text = element.fdescpn;
        obj.value = element.fvalue;
        moduleTypeOptions.push(obj);
      }
    });

    const report_type = [
      { key: "Summary", value: "Summary", text: "Summary" },
      { key: "Detail", value: "Detail", text: "Detailed" }
    ];

    // const module_type = [
    //   { key: "ADM", value: "ADM", text: "Admission" },
    //   { key: "EXAM", value: "EXAM", text: "EXAM" }
    // ];

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header style={{ display: "flex" }}>
            <h4>Fee Report</h4>
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
                // onClick={this.handleCancel}
                content="Cancel"
              />
              <Link to="/dashboard">
                <Button basic color="red" content="Exit" icon="home" />
              </Link>
            </div>
          </Card.Header>
          <Divider />
          <Card.Description style={{ overflowY: "auto", height: "70vh" }}>
            <div className="col-md-7">
              <Form>
                {/* <Form.Group inline>
                  <label>College Range</label>
                  <Form.Field
                    control={Radio}
                    name="artype"
                    label="All"
                    value="All"
                    checked={artype === "All"}
                    onChange={this.handleChange}
                  />
                  <Form.Field
                    control={Radio}
                    name="artype"
                    label="Range"
                    value="Range"
                    checked={artype === "Range"}
                    onChange={this.handleChange}
                  />
                </Form.Group> */}

                <div>
                  <Form.Field width={16}>
                    <label>Module Type</label>
                    <Dropdown
                      fluid
                      search
                      selection
                      onChange={this.handleChange}
                      value={moduleType}
                      name="moduleType"
                      placeholder="Select Report Type"
                      options={moduleTypeOptions}
                    />
                  </Form.Field>
                  <Form.Field width={16}>
                    <label>Report</label>
                    <Dropdown
                      fluid
                      search
                      selection
                      onChange={this.handleChange}
                      value={rformat}
                      name="rformat"
                      placeholder="Select Report"
                      options={this.state.report_options}
                    />
                  </Form.Field>
                  <Form.Group>
                    <Form.Field width={8}>
                      <label>College Range</label>
                      <Form.Input
                        placeholder="From"
                        name="fcollfrm"
                        value={fcollfrm}
                        onChange={this.handleChange}
                        maxLength="5"
                      />
                    </Form.Field>
                    <Form.Field width={8}>
                      <Form.Input
                        placeholder="To"
                        name="fcollto"
                        value={fcollto}
                        onChange={this.handleChange}
                        maxLength="5"
                        style={{ marginTop: "1.6em" }}
                      />
                    </Form.Field>
                  </Form.Group>
                </div>

                <Form.Group>
                  <Form.Field width={8}>
                    <Form.Input
                      placeholder="From"
                      name="fdegfrm"
                      value={fdegfrm}
                      onChange={this.handleChange}
                      maxLength="5"
                      label="Degree Range"
                    />
                  </Form.Field>
                  <Form.Field width={8}>
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

                <Form.Group>
                  <Form.Field width={16}>
                    <label>Exam No Range</label>
                    <Form.Input
                      placeholder="Exam No Range"
                      name="examNoRange"
                      value={examNoRange}
                      onChange={this.handleChange}
                      maxLength="5"
                      // style={{ marginTop: "1em" }}
                    />
                  </Form.Field>
                  {/* <Form.Field width={8}>
                    <label>Report Type</label>
                    <Dropdown
                      fluid
                      search
                      selection
                      onChange={this.handleChange}
                      value={rtype}
                      name="rtype"
                      placeholder="Select Report Type"
                      options={report_type}
                    />
                  </Form.Field> */}
                </Form.Group>
                {/* <Form.Group inline>
                  <Form.Field
                    control={Radio}
                    name="rftype"
                    label="PDF"
                    value="PDF Format"
                    checked={rftype === "PDF Format"}
                    onChange={this.handleChange}
                  />
                  <Form.Field
                    control={Radio}
                    name="rftype"
                    label="EXCEL"
                    value="Excel Format"
                    checked={rftype === "Excel Format"}
                    onChange={this.handleChange}
                  />
                </Form.Group> */}
              </Form>
            </div>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  console.log("state", state.fetchDropDownOptions);
  return {
    degdet: state.user,
    univcode: state.univ.funivcode,
    fetchDropDownOptions: state.fetchDropDownOptions
  };
};

export default connect(
  mapStateToProps,
  {
    showError,
    getDropDownOptions
  }
)(FeeReport);
