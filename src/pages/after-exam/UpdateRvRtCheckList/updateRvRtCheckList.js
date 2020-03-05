import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Form,
  Dropdown,
  Divider,
  Radio,
  Table,
  Checkbox,
  Grid
} from "semantic-ui-react";
import { connect } from "react-redux";
import { ReportAPI } from "../../../apis/consts";
import { showError } from "../../../actions";
import InputMask from "react-input-mask";
import { wHeight } from "../../parms";
import moment from "moment";
import { formFilters } from "../../formFilters";

import {
  fetchRvPcReport,
  clearDailyValuation,
  saveRvRtCheckList
} from "../../../actions/index";
class RvPcDailyReport extends Component {
  state = {
    showtable: false,
    frmDeggrp: "",
    pd: [],
    reportType: "datewWiseValDet",
    frmSubmit: false,
    rftype: "PDF",
    tcodefrom: "0000",
    tcodeto: "zzzz",
    vdatefrom: moment().format("DD/MM/YYYY"),
    vdateto: moment().format("DD/MM/YYYY"),
    qpcodeFrom: "000",
    qpcodeTo: "zzz",
    regnoFrom: "000",
    regnoTo: "zzz",
    correctionType: "ALL",
    status: "ALL",
    reportType: "CheckList",
    barcode: "",
    detBC: [],
    displyBC: false,
    open: false,
    fdeleted: false
  };

  handleReport = () => {
    const { fdeggrp, fcuruniv } = this.props.user;
    let sendParams = {};
    sendParams.dateFrom = this.state.vdatefrom;
    sendParams.dateTo = this.state.vdateto;
    sendParams.qpcodeFrom = this.state.qpcodeFrom;
    sendParams.qpcodeTo = this.state.qpcodeTo;
    sendParams.regnoFrom = this.state.regnoFrom;
    sendParams.regnoTo = this.state.regnoTo;
    sendParams.correctionType = this.state.correctionType;
    sendParams.status = this.state.status;
    sendParams.reportType = this.state.reportType;

    if (sendParams.reportType == "Detail") {
      window.open(
        ReportAPI +
          "getRvPcReportList&univcode=" +
          fcuruniv +
          "&dateFrom=" +
          sendParams.dateFrom +
          "&dateTo=" +
          sendParams.dateTo +
          "&qpcodeFrom=" +
          sendParams.qpcodeFrom +
          "&qpcodeTo=" +
          sendParams.qpcodeTo +
          "&regnoFrom=" +
          sendParams.regnoFrom +
          "&regnoTo=" +
          sendParams.regnoTo +
          "&correctionType=" +
          sendParams.correctionType +
          "&status=" +
          sendParams.status +
          "&reportType=" +
          sendParams.reportType +
          "&fdeggrp=" +
          fdeggrp,
        "_blank"
      );
    }
  };

  handleChange = (e, data) => {
    switch (data.type) {
      case "text":
        this.setState({ [data.name]: data.value });
      default:
        this.setState({ [data.name]: data.value });
    }
    this.setState({ frmSubmit: false });
    // this.props.dailyRvPcReport = [];
    // console.log(this.state);
  };

  handleSubmit = async () => {
    const { fdeggrp, fcuruniv } = this.props.user;

    let sendParams = {};
    sendParams.dateFrom = this.state.vdatefrom;
    sendParams.dateTo = this.state.vdateto;
    sendParams.qpcodeFrom = this.state.qpcodeFrom;
    sendParams.qpcodeTo = this.state.qpcodeTo;
    sendParams.regnoFrom = this.state.regnoFrom;
    sendParams.regnoTo = this.state.regnoTo;
    sendParams.correctionType = this.state.correctionType;
    sendParams.status = this.state.status;
    sendParams.reportType = this.state.reportType;
    sendParams.fdeggrp = fdeggrp;
    sendParams.actionType = "GET_CHK_LIST";

    let filterArr = [
      {
        type: "dateFrom",
        data: sendParams.dateFrom
      },
      {
        type: "dateTo",
        data: sendParams.dateTo
      },
      {
        type: "regnoFrom",
        data: sendParams.regnoFrom
      },
      {
        type: "regnoTo",
        data: sendParams.regnoTo
      },
      {
        type: "qpcodeFrom",
        data: sendParams.qpcodeFrom
      },
      {
        type: "qpcodeTo",
        data: sendParams.qpcodeTo
      }
    ];

    let filterFields = await formFilters.filterFields(filterArr);
    if (filterFields.status == false) {
      alert(filterFields.msg);
    } else {
      await this.props.fetchRvPcReport(sendParams);
      await this.setState({ pd: this.props.dailyRvPcReport });
      this.setState({ frmSubmit: true });

      console.log(this.state.pd);
    }

    await this.props.fetchRvPcReport(sendParams);
    await this.setState({ pd: this.props.dailyRvPcReport });
    // console.log(this.state.pd)
  };

  handleChangedate = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSave = async () => {
    if (!this.state.detBC) {
      const error = { header: "Error", content: "Scan Barcode" };
      this.props.showError(error);
      return;
    }

    const bcarr = this.state.detBC.filter((el, i) => {
      if (el.fdeleted !== true) {
        return el;
      }
    });
    // console.log("SAVE", bcarr);
    // await this.props.saveRvRtCheckList(this.state.pd);
  };
  deleteRow = (e, el, i) => {
    let data = { ...el, [e.target.name]: e.target.checked };

    const bcarr = this.state.detBC.map((el, j) => {
      if (j === i) {
        return data;
      } else return el;
    });

    this.setState({ detBC: bcarr });
  };

  handleCancel = () => {
    this.setState({
      reportType: "",
      reportFormat: "",
      frmDeggrp: ""
    });
  };

  handleClick = () => {
    if (!this.state.barcode) {
      const error = {
        header: "Error",
        content: "Barcode length should be minimum 17"
      };
      this.props.showError(error);
    } else {
      const fslno = this.state.barcode.substring(0, 5);
      const fqpcode = this.state.barcode.substring(5, 9);
      const fbundno = this.state.barcode.substring(9, 11);
      //   const fttlscrpt = this.state.barcode.substring(14, 17);
      // console.log("BUNDleNo", this.state.barcode)
      const item = {
        fslno: fslno,
        fqpcode: fqpcode,
        fbundno: fbundno,
        // fttlscrpt: fttlscrpt,
        fdeleted: false
      };

      let i = this.state.barcode.length - 1;
      const el = item;
      var dupBC = false;

      this.state.detBC.map((item, j) => {
        if (item.fbundno === el.fbundno && i !== j) dupBC = true;
      });

      if (dupBC) {
        const error = {
          header: "Error",
          content: "Duplicate entry is not allowed."
        };
        this.props.showError(error);
        return;
      }
      this.setState({ displyBC: true, detBC: [...this.state.detBC, item] });
    }
  };

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h3>Update RV/RT CheckList</h3>
        <div className="ml-auto">
          <Button
            basic
            color="blue"
            onClick={this.handleSave}
            content="Save"
            icon="file"
          />
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
      status,
      reportType,
      frmSubmit,
      barcode,
      displyBC,
      detBC,
      dimmer,
      open,
      fdeleted
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
    // console.log("usertyoe", typeof userType, userType);
    const wheight = wHeight();

    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            {this.renderHeader()}
            <Divider />
            <Card.Description style={{ height: "72vh" }}>
              <Form>
                <Grid columns={2}>
                  <Grid.Column width={5} style={{ display: "flex" }}>
                    <Form.Input
                      width="16"
                      label="Barcode"
                      placeholder="Enter barcode here..."
                      maxLength="11"
                      name="barcode"
                      vlaue={barcode}
                      onChange={this.handleChange}
                    />
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <Button
                      style={{ marginTop: "25px" }}
                      content="GO"
                      size="mini"
                      color="facebook"
                      onClick={this.handleClick}
                    />
                  </Grid.Column>
                </Grid>
              </Form>
              {displyBC ? (
                <div
                  className="ui form"
                  style={{
                    maxHeight: "60vh",
                    overflowY: "scroll",
                    marginTop: "1rem"
                  }}
                >
                  <Table
                    celled
                    style={{
                      width: "auto",
                      tableLayout: "auto",
                      marginLeft: "auto",
                      marginRight: "auto"
                    }}
                    className="stick"
                  >
                    <Table.Header>
                      <Table.Row textAlign="center">
                        <Table.HeaderCell singleLine>Sl. No.</Table.HeaderCell>
                        <Table.HeaderCell>QP Code</Table.HeaderCell>
                        <Table.HeaderCell>Bundle No.</Table.HeaderCell>
                        <Table.HeaderCell>Bundle - Sl. No.</Table.HeaderCell>
                        {/* <Table.HeaderCell>Ttl. Script Count</Table.HeaderCell> */}
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {detBC.map((el, i) => {
                        return (
                          <Table.Row key={i} textAlign="center">
                            <Table.Cell>{i + 1}</Table.Cell>
                            <Table.Cell>{el.fqpcode}</Table.Cell>
                            <Table.Cell>{el.fbundno}</Table.Cell>
                            <Table.Cell>{el.fslno}</Table.Cell>
                            {/* <Table.Cell>{el.fttlscrpt}</Table.Cell> */}
                            <Table.Cell>
                              <input
                                className="ui checkbox"
                                type="checkbox"
                                name="fdeleted"
                                value={fdeleted}
                                onChange={e => this.deleteRow(e, el, i)}
                                checked={
                                  el.fdeleted == "true" ? "checked" : null
                                }
                                style={{ position: "inherit" }}
                              />
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                </div>
              ) : null}
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
    dailyRvPcReport: state.dailyRvPcReport,

    saveRvRtCheckList: state.saveRvRtCheckList
  };
};
export default connect(
  mapStateToProps,
  {
    showError,
    saveRvRtCheckList,
    fetchRvPcReport,
    clearDailyValuation
  }
)(RvPcDailyReport);
