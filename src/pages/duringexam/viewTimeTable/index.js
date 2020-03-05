import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Divider, Form, Button, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { showError } from "../../../actions";
import { getTimeTables } from "../../../actions/before-exam/viewTimeTable";
import { ReportAPI } from "../../../apis/consts";
import InputMask from "react-input-mask";
import { wHeight } from "../../parms";
import ReportTimetable from "../../before-exam/timetable/report";
import ViewTimeTable from "./viewtimeTable";

class TimeTable extends Component {
  state = {
    timetabledata: false,
    fdegfrm: "0",
    fdegto: "zzzzz",
    fqpfrm: "0",
    fqpto: "zzzzz",
    fdatefrom: "",
    fdateto: "",
    rtype: "QPCode wise",
    stype: "b"
  };

  handleCancel = () => {
    this.setState({
      timetabledata: false,
      fdatefrom: "",
      fdateto: "",
      fdegfrm: "",
      fdegto: "",
      fqpfrm: "0",
      fqpto: "zzzzz",
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
    const { fqpfrm, fqpto, fdatefrom, fdateto, fdegfrm, fdegto } = this.state;

    const { fdeggrp } = this.props.user;

    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }

    window.open(
      ReportAPI +
        "viewTimeTable&univcode=" +
        this.props.univcode +
        "&dgp=" +
        fdeggrp +
        "&degfrm=" +
        fdegfrm +
        "&degto=" +
        fdegto +
        "&qpfrm=" +
        fqpfrm +
        "&qpto=" +
        fqpto +
        "&fdatefrom=" +
        fdatefrom +
        "&fdateto=" +
        fdateto,
      "_blank"
    );
  };

  handleTable = () => {
    const {
      fqpfrm,
      fqpto,
      fdatefrom,
      fdateto,
      stype,
      fdegfrm,
      fdegto
    } = this.state;

    const { fdeggrp } = this.props.user;

    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }
    this.props.getTimeTables(
      fqpfrm,
      fqpto,
      fdatefrom,
      fdateto,
      fdegfrm,
      fdegto
    );
    this.setState({ timetabledata: true });
  };

  show = dimmer => () => this.setState({ dimmer, open: true });

  close = (e, data) => {
    if (e.type == "keydown") return;
    this.setState({ open: false });
  };

  render() {
    const {
      fqpto,
      fqpfrm,
      fdatefrom,
      fdateto,
      stype,
      fdegfrm,
      fdegto,
      dimmer,
      open
    } = this.state;

    const session_options = [
      { key: "b", value: "b", text: "Both" },
      { key: "m", value: "m", text: "Morning Session" },
      { key: "n", value: "n", text: "Afternoon Session" }
    ];

    console.log("Time Table", this.props.timeTable);
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
              <h4>Exam Time Table Report</h4>
              <div className="ml-auto">
                <Button
                  basic
                  color="blue"
                  // onClick={this.handleReport}
                  content="Report"
                  icon="file"
                  onClick={this.show("blurring")}
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
                    <Form.Input
                      placeholder="From"
                      value={fdegfrm}
                      width={6}
                      name="fdegfrm"
                      onChange={this.handleChange}
                      maxLength="5"
                      label="Degree Range"
                    />
                    <Form.Input
                      placeholder="To"
                      name="fdegto"
                      value={fdegto}
                      width={6}
                      onChange={this.handleChange}
                      maxLength="5"
                      style={{ marginTop: "1.6em" }}
                    />
                  </Form.Group>
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

                  <Button
                    color="blue"
                    onClick={this.handleTable}
                    content="Submit"
                  />
                </Form>
              </div>
              <ReportTimetable open={open} dim={dimmer} close={this.close} />
              {this.state.timetabledata ? (
                <ViewTimeTable tblData={this.props.timeTable} />
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
    timeTable: state.viewTimeTable,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {
    showError,
    getTimeTables
  }
)(TimeTable);
