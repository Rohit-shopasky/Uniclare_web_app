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
import { ReportAPI } from "../../../apis/consts";
import { showError } from "../../../actions";
import {
  getNotval,
  reportNotval,
  getDropDownValue
} from "../../../actions/after-exam/notvalued";
import InputMask from "react-input-mask";
import { wHeight } from "../../parms";
import moment from "moment";
import StatTable from "./stattable";
var DropdownBordOption = [];
class Notvalued extends Component {
  state = {
    frmDeggrp: "",
    boardType: "",
    dropdownType: "",
    reportType: "ALL",
    frmSubmit: false,
    showtable: false,
    rftype: "PDF",
    tcodefrom: "0000",
    tcodeto: "zzzz",
    vdatefrom: "0000",
    vdateto: "zzzz"
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
    console.log("statetee", this.state);
    this.setState({ frmSubmit: false });
  };

  handleSubmit = async () => {
    console.log("submitttt", this.state);
    const { fdeggrp } = this.props.user;
    const { reportType } = this.state;
    console.log(this.state);

    await this.props.getNotval(this.state, this.props.user);

    // this.props.getReport(reportType, "tables", fdeggrp);
    this.setState({ frmSubmit: true });
    this.setState({ showtable: true });
  };

  handleReport = () => {
    const { fdeggrp, fcuruniv } = this.props.user;
    const {
      reportType,
      rftype,
      tcodefrom,
      tcodeto,
      vdatefrom,
      vdateto
    } = this.state;

    window.open(
      ReportAPI +
        "valuatorReport" +
        "&univcode=" +
        fcuruniv +
        "&deggrp=" +
        fdeggrp +
        "&tcodefrom=" +
        tcodefrom +
        "&tcodeto=" +
        tcodeto +
        "&vdatefrom=" +
        vdatefrom +
        "&vdateto=" +
        vdateto +
        "&format=" +
        rftype +
        "&user=" +
        JSON.stringify(this.props.user),
      "_blank"
    );
  };
  handleChangedate = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCancel = () => {
    this.setState({
      reportType: "",
      reportFormat: "",
      frmDeggrp: ""
    });
  };

  async componentDidMount() {
    await this.props.getDropDownValue(this.state, this.props.user);
  }

  renderHeader = () => {
    DropdownBordOption = [];
    this.props.dropdownData.board.map(item => {
      DropdownBordOption.push({
        value: item.fboardcode,
        text: item.fboardname
      });
    });
    console.log("DropdownBordOption", DropdownBordOption);
    return (
      <Card.Header style={{ display: "flex" }}>
        <h3>Valuatators Detail</h3>
        <div className="ml-auto">
          <Button
            basic
            color="black"
            icon="file"
            onClick={this.handleReport}
            content="Report"
          />
          <Button
            basic
            color="blue"
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
      frmSubmit,
      reportType,
      boardType,
      dropdownType,
      rftype,
      tcodefrom,
      tcodeto,
      vdatefrom,
      vdateto
    } = this.state;

    const reporttypeOptions = [
      { value: "ALL", text: "ALL" },
      { value: "val", text: "Doing Valuations" },
      { value: "nval", text: "Not Doing Valuation" }
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
                    <Form.Field width={8}>
                      <label> College Range </label>
                      <Form.Input
                        type="text"
                        value={vdatefrom}
                        placeholder="Date From"
                        name="vdatefrom"
                        onChange={this.handleChangedate}
                      />
                    </Form.Field>
                    <Form.Field width={8}>
                      <Form.Input
                        type="text"
                        value={vdateto}
                        placeholder="To"
                        name="vdateto"
                        onChange={this.handleChangedate}
                        style={{ marginTop: "1.6em" }}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Input
                      placeholder="From"
                      value={tcodefrom}
                      width={8}
                      name="tcodefrom"
                      onChange={this.handleChange}
                      maxLength="5"
                      label="Teacher code Range"
                    />
                    <Form.Input
                      placeholder="To"
                      name="tcodeto"
                      value={tcodeto}
                      width={8}
                      onChange={this.handleChange}
                      maxLength="5"
                      style={{ marginTop: "1.6em" }}
                    />
                  </Form.Group>
                  <Form.Field>
                    <label> Select Board</label>
                    <Dropdown
                      placeholder="Select Report Type"
                      name="boardType"
                      value={boardType}
                      selection
                      search
                      options={DropdownBordOption}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label> Type</label>
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

                  {/* <Form.Group inline>
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
                  </Form.Group> */}

                  <Button color="blue" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                  <br />
                </Form>
              </div>
              {this.state.showtable ? <StatTable /> : null}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    dropdownData: state.fetchDropNotValued
  };
};
export default connect(
  mapStateToProps,
  {
    showError,
    getNotval,
    getDropDownValue
  }
)(Notvalued);
