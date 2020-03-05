import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Form,
  Dropdown,
  Divider,
  Radio,
  Table
} from "semantic-ui-react";
import { connect } from "react-redux";
import { ReportAPI } from "../../../apis/consts";
import { showError } from "../../../actions";
import InputMask from "react-input-mask";
import { wHeight } from "../../parms";
import moment from "moment";
//import { formFilters } from "./formFilters";
import { fetchRvPcReport, clearDailyValuation } from "../../../actions/index";
class GenerateCodeList extends Component {
  state = {
    showtable: false,
    frmDeggrp: "",

    statusType: "Pending"
  };

  handleReport = () => {
    const { fdeggrp, fcuruniv, fyear, fexamtype } = this.props.user;
    let sendParams = {};

    window.open(
      ReportAPI +
        "getRvPcSummaryList&status=" +
        this.state.statusType +
        "&fyear=" +
        fyear +
        "&fdeggrp=" +
        fdeggrp +
        "&univcode=" +
        fcuruniv +
        "&fexamtype=" +
        fexamtype +
        "&reportType=CheckList",
      "_blank"
    );
  };

  handleChange = (e, data) => {
    switch (data.type) {
      case "text":
        if (
          data.name === "regnoFrom" ||
          data.name === "regnoTo" ||
          data.name === "qpcodeFrom" ||
          data.name === "qpcodeTo"
        )
          data.value = data.value.toUpperCase();

        this.setState({ [data.name]: data.value });
      default:
        this.setState({ [data.name]: data.value });
    }
    this.setState({ frmSubmit: false });
    //this.props.dailyRvPcReport = null;
    // console.log(this.state);
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

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h3>Generate Code List Report</h3>
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
      vdatefrom,
      vdateto,
      qpcodeFrom,
      qpcodeTo,
      regnoFrom,
      regnoTo,
      correctionType,
      statusType,
      reportType,
      frmSubmit
    } = this.state;
    //console.log(this.props.dailyRvPcReport);
    // const reporttypeOptions = [
    //   { value: "datewWiseValDet", text: "Date Wise Valuation Details" }
    // ];
    // console.log("dailyValuation", this.props.dailyValuation);
    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };

    let userType = Number(this.props.user.fcurtype);
    //console.log("usertyoe", typeof userType, userType);
    const wheight = wHeight();

    const correctionTypeOptions = [
      { value: "RV", text: "Revaluation" },
      { value: "RT", text: "Retotaling" },
      { value: "PC", text: "Photo Copy" },
      { value: "ALL", text: "ALL" }

      // { value: "", text: "Correction Type" }
    ];

    const statusTypeOptions = [
      { value: "Pending", text: "Pending" }

      // { value: "", text: "Correction Type" }
    ];

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
                  <Form.Field width={16}>
                    <label>Report Type</label>
                    <Dropdown
                      placeholder="Report Type"
                      name="statusType"
                      value={statusType}
                      selection
                      search
                      options={statusTypeOptions}
                      onChange={this.handleChange}
                    />
                  </Form.Field>

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
  // console.log(state.dailyRvPcReport);
  return {
    user: state.user,
    // state.allworkDOneReport
    dailyRvPcReport: state.dailyRvPcReport
  };
};
export default connect(
  mapStateToProps,
  {
    showError,
    fetchRvPcReport,
    clearDailyValuation
  }
)(GenerateCodeList);
