import React, { Component } from "react";
import { Button, Modal, Form, Message, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import SelectDeggrp from "../../common/SelectDeggrp";
import { ReportAPI } from "../../../apis/consts";

class ReportTimeTable extends Component {
  state = {
    deggrp: [],
    fdeggrp: "",
    fyear: "",
    fexamtype: "",
    fexamdate: "",
    fexamrange: "",
    deggrpError: false,
    frtype: "",
    frtypes: ["Error Report", "QP Code Wise", "Degree Wise"],
    fexamrangeError: false,
    frtypeError: false,
    ferror: false,
    ferrorm: ""
  };

  componentDidMount() {
    this.setState({ deggrp: this.props.deggrp });
  }

  componentDidUpdate(prevProps) {
    if (this.props.deggrp !== prevProps.deggrp) {
      this.setState({ deggrp: [...this.props.deggrp] });
    }
  }

  changeDeggrp = (e, data) => {
    let deggrpsel = this.state.deggrp.filter(
      (el, i) => el.fdeggrp === data.value
    );

    let deggrp = deggrpsel[0];

    this.setState({
      fyear: deggrp.fyear,
      fexamtype: deggrp.fexamtype,
      fexamdate: deggrp.fexamdate,
      fdeggrp: deggrp.fdeggrp
    });
  };

  handleChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  generateReport = () => {
    const { fdeggrp, fexamrange, frtype } = this.state;

    if (fdeggrp == "") {
      this.setState({
        deggrpError: true,
        ferror: true,
        ferrorm: "Degree Group required."
      });
      return;
    } else {
      this.setState({ deggrpError: false, ferror: false, ferrorm: "" });
    }

    if (fexamrange == "") {
      this.setState({
        fexamrangeError: true,
        ferror: true,
        ferrorm: "Exam Range required."
      });
      return;
    } else {
      this.setState({ fexamrangeError: false, ferror: false, ferrorm: "" });
    }

    if (frtype == "") {
      this.setState({
        frtypeError: true,
        ferror: true,
        ferrorm: "Report Type required."
      });
      return;
    } else {
      this.setState({ frtypeError: false, ferror: false, ferrorm: "" });
    }

    if (frtype === "Error Report")
      window.open(
        ReportAPI +
          "GenerateExamTimetableError&deggrp=" +
          this.state.fdeggrp +
          "&univcode=" +
          this.props.univ.funivcode +
          "&examrange=" +
          this.state.fexamrange,
        "_blank"
      );
    else if (frtype === "Degree Wise")
      window.open(
        ReportAPI +
          "GenerateDGExamTimetable&deggrp=" +
          this.state.fdeggrp +
          "&univcode=" +
          this.props.univ.funivcode +
          "&examrange=" +
          this.state.fexamrange,
        "_blank"
      );
    else if (frtype === "QP Code Wise")
      window.open(
        ReportAPI +
          "GenerateQPExamTimetable&deggrp=" +
          this.state.fdeggrp +
          "&univcode=" +
          this.props.univ.funivcode +
          "&examrange=" +
          this.state.fexamrange,
        "_blank"
      );
  };

  render() {
    const {
      fdeggrp,
      fyear,
      fexamtype,
      fexamdate,
      fexamrange,
      frtype,
      frtypes,
      deggrpError,
      fexamrangeError,
      frtypeError,
      ferror,
      ferrorm
    } = this.state;

    const report_options = frtypes.map((el, i) => {
      return { key: i, value: el, text: el };
    });
    return (
      <div>
        {/* <Modal style={{ height: "50%", top: "28%", left: "28%", width: "50%" }} */}
        <Modal
          style={{ maxHeight: "60%", width: "50%" }}
          dimmer={this.props.dim}
          open={this.props.open}
          onClose={this.props.close}
          closeOnDimmerClick={false}
        >
          <Modal.Header style={{ display: "flex" }}>
            Time Table Report
            <div className="ml-auto">
              <Button
                basic
                color="blue"
                content="Generate"
                onClick={this.generateReport}
                icon="file pdf outline"
              />
              <Button
                basic
                color="black"
                icon="ban"
                onClick={this.props.close}
                content="Cancel"
              />
            </div>
          </Modal.Header>

          <Modal.Content style={{ height: "50vh", overflowY: "auto" }}>
            <Form error>
              {ferror ? <Message error content={ferrorm} /> : null}
              <SelectDeggrp
                changeDeggrp={this.changeDeggrp}
                frmDeggrp={fdeggrp}
                dgerror={deggrpError}
              />
              <Form.Group>
                <Form.Input
                  placeholder="Exam Year"
                  value={fyear}
                  width={4}
                  label="Exam Year"
                  readOnly
                />
                <Form.Input
                  placeholder="Exam Type"
                  value={fexamtype}
                  width={3}
                  label="Exam Type"
                  readOnly
                />
                <Form.Input
                  placeholder="Exam Date"
                  label="Exam Date"
                  width={10}
                  value={fexamdate}
                  readOnly
                />
              </Form.Group>
              <label>
                <b>Report Type</b>
              </label>
              <Dropdown
                size="mini"
                fluid
                search
                selection
                name="frtype"
                value={frtype}
                onChange={this.handleChange}
                placeholder="Report Type"
                label="Report Type"
                error={frtypeError}
                options={report_options}
              />
              <Form.Group>
                <Form.Input
                  placeholder="Exam Range"
                  error={false}
                  width={5}
                  onChange={this.handleChange}
                  value={fexamrange}
                  name="fexamrange"
                  label="Exam Range"
                  error={fexamrangeError}
                />
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deggrp: state.deggrp,
    univ: state.univ
  };
};

export default connect(
  mapStateToProps,
  {}
)(ReportTimeTable);

// export default ReportTimeTable
