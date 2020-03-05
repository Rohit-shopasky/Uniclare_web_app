import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Divider, Form, Button, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { showError } from "../../../actions";
import { getExmCntr } from "../../../actions/during-exam/exmCntr";
import { ReportAPI } from "../../../apis/consts";
import ExamcntrTable from "./exmcntrtbl";
import InputMask from "react-input-mask";
import { wHeight } from "../../parms";

class ExamCntr extends Component {
  state = {
    cntrdata: false,
    fqpfrm: "",
    fqpto: "",
    fdatefrom: "",
    fdateto: "",
    rtype: "QPCode wise",
    stype: "b"
  };

  handleCancel = () => {
    this.setState({
      cntrdata: false,
      fqpfrm: "",
      fqpto: "",
      fdate: "",
      rtype: "QPCode wise",
      stype: "b"
    });
  };

  handleChangedate = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  handleReport = () => {
    const { fqpfrm, fqpto, fdatefrom, fdateto, rtype, stype } = this.state;

    const { fdeggrp } = this.props.user;

    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }

    window.open(
      ReportAPI +
        "examCntr&univcode=" +
        this.props.univcode +
        "&dgp=" +
        fdeggrp +
        "&qpfrm=" +
        fqpfrm +
        "&qpto=" +
        fqpto +
        "&fdatefrom=" +
        fdatefrom +
        "&fdateto=" +
        fdateto +
        "&rtype=" +
        rtype +
        "&stype=" +
        stype,
      "_blank"
    );
  };

  handleTable = () => {
    const { fqpfrm, fqpto, fdatefrom, fdateto, rtype, stype } = this.state;

    const { fdeggrp } = this.props.user;

    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }
    // fdeggrp, fqpfrm, fqpto, fdatefrm, fdateto, rtype, stype
    this.props.getExmCntr(fqpfrm, fqpto, fdatefrom, fdateto, rtype, stype);
    this.setState({ cntrdata: true });
  };

  render() {
    const { fqpto, fqpfrm, fdatefrom, fdateto, rtype, stype } = this.state;

    const report_options = [
      { key: "QPCode wise", value: "QPCode wise", text: "QPCode wise" },
      { key: "Center Wise", value: "Center Wise", text: "Center Wise" }
    ];

    const session_options = [
      { key: "b", value: "b", text: "Both" },
      { key: "m", value: "m", text: "Morning Session" },
      { key: "n", value: "n", text: "Afternoon Session" }
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

    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Exam Center Report</h4>
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
            <Divider />
            <Card.Description
              style={{ height: `${wheight}px`, overflowY: "auto" }}
            >
              <div className="col-md-8 col-lg-8 col-sm-12">
                <Form>
                  <Form.Group>
                    <Form.Field width={6}>
                      <label> Date Range </label>
                      <InputMask
                        formatChars={formatChars}
                        type="text"
                        value={fdatefrom}
                        mask="ed/nm/zyyy"
                        placeholder="From"
                        name="fdatefrom"
                        onChange={this.handleChangedate}
                      />
                    </Form.Field>
                    <Form.Field width={6}>
                      <InputMask
                        formatChars={formatChars}
                        type="text"
                        value={fdateto}
                        mask="ed/nm/zyyy"
                        placeholder="To"
                        name="fdateto"
                        onChange={this.handleChangedate}
                        style={{ marginTop: "1.6em" }}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      placeholder="From"
                      value={fqpfrm}
                      width={6}
                      name="fqpfrm"
                      onChange={this.handleChange}
                      maxLength="5"
                      label="QPCode Range"
                    />
                    <Form.Input
                      placeholder="To"
                      name="fqpto"
                      value={fqpto}
                      width={6}
                      onChange={this.handleChange}
                      maxLength="5"
                      style={{ marginTop: "1.6em" }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={6}>
                      <label>Session Type</label>
                      <Dropdown
                        placeholder="Report"
                        search
                        selection
                        name="stype"
                        value={stype}
                        options={session_options}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field width={6}>
                      <label>Report Type</label>
                      <Dropdown
                        placeholder="Report"
                        search
                        selection
                        name="rtype"
                        value={rtype}
                        options={report_options}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                  </Form.Group>

                  <Button
                    color="blue"
                    onClick={this.handleTable}
                    content="Submit"
                  />
                </Form>
              </div>

              {this.state.cntrdata ? (
                <ExamcntrTable tblData={this.props.getExmCntrs} />
              ) : null}
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
    univcode: state.univ.funivcode,
    getExmCntrs: state.getExmCntrs,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {
    showError,
    getExmCntr
  }
)(ExamCntr);
