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
import { ReportAPI } from "../../../../apis/consts";
import { showError } from "../../../../actions";
import { wHeight } from "../../../parms";

class SubjectWiseList extends Component {
  state = {
    frmDeggrp: "",
    reportType: "",
    reportTypeFor: "",
    rftype: "PDF",
    fdegfrom: "0000",
    fdegto: "zzzz",
    fcolfrom: "0000",
    fcolto: "zzzz",
    fsubfrom: "0000",
    fsubto: "zzzz",
    fexamRng: "",
    reportWise: ""
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
  };

  handleReport = () => {
    const { fdeggrp, fcuruniv } = this.props.user;
    const {
      reportType,
      rftype,
      fdegfrom,
      fdegto,
      fcolfrom,
      fcolto,
      fsubfrom,
      fsubto,
      vdatefrom,
      vdateto,
      reportTypeFor,
      fexamRng,
      reportWise
    } = this.state;

    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }
    console.log("report", this.state);

    let fexamno = fexamRng.split("").join("','");
    console.log("examno ", fexamno);
    window.open(
      `${ReportAPI}${reportTypeFor}&univcode=${fcuruniv}&deggrp=${fdeggrp}&fdegfrom=${fdegfrom}
    &fdegto=${fdegto}&fcolfrom=${fcolfrom}&fcolto=${fcolto}&fsubfrom=${fsubfrom}&fsubto=${fsubto}
    &fexamno=${fexamno}&rtype=${reportType}&reportWise=${reportWise}`,
      "_blank"
    );

    // window.location =
    //   ReportAPI +
    //   reportTypeFor +
    //   "&univcode=" +
    //   fcuruniv +
    //   "&deggrp=" +
    //   fdeggrp +
    //   "&fdegfrom=" +
    //   fdegfrom +
    //   "&fdegto=" +
    //   fdegto +
    //   "&vdatefrom=" +
    //   vdatefrom +
    //   "&vdateto=" +
    //   vdateto +
    //   "&format=" +
    //   rftype +
    //   "&user=" +
    //   JSON.stringify(this.props.user);
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
        <h3>Subject Wise List</h3>
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
      reportType,
      rftype,
      fdegfrom,
      fdegto,
      fcolfrom,
      fcolto,
      fsubfrom,
      fsubto,
      reportTypeFor,
      fexamRng,
      reportWise
    } = this.state;

    // console.log("State", this.state);
    const reportfor = [
      { value: "ExamRegistration", text: "Exam Registration" },
      { value: "Admission", text: "Admission" }
    ];

    const reporttypeOptions = [
      { value: "Summary", text: "Summary" },
      { value: "Detailed", text: "Detailed" }
    ];

    const reportWiseOpt = [
      { value: "College Wise", text: "College Wise" },
      { value: "Degree Wise", text: "Degree Wise" }
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
                    <Form.Field>
                      <label>Type</label>
                      <Dropdown
                        placeholder="Select Report Type"
                        name="reportTypeFor"
                        value={reportTypeFor}
                        selection
                        search
                        options={reportfor}
                        onChange={this.handleChange}
                        // width={8}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Form.Input
                        placeholder="Ex.:ABCD"
                        value={fexamRng}
                        // width={8}
                        name="fexamRng"
                        onChange={this.handleChange}
                        // maxLength="5"
                        label="Exam Range"
                      />
                    </Form.Field>
                  </Form.Group>

                  <Form.Group>
                    <Form.Input
                      placeholder="From"
                      value={fdegfrom}
                      width={8}
                      name="fdegfrom"
                      onChange={this.handleChange}
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

                  <Form.Field>
                    <label>Report Type</label>
                    <Dropdown
                      placeholder="Select Report Wise"
                      name="reportWise"
                      value={reportWise}
                      selection
                      search
                      options={reportWiseOpt}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
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
)(SubjectWiseList);
