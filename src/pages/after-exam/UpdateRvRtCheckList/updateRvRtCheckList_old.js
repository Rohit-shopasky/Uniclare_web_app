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
  Checkbox
} from "semantic-ui-react";
import { connect } from "react-redux";
import { ReportAPI } from "../../../apis/consts";
import { showError } from "../../../actions";
import InputMask from "react-input-mask";
import { wHeight } from "../../parms";
import moment from "moment";
import {
  fetchRvPcReport,
  clearDailyValuation,
  saveRvRtCheckList
} from "../../../actions/index";
class UpdateRvRtCheckList extends Component {
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
    reportType: "CheckList"
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
    console.log(this.state);
  };

  handleSubmit = async () => {
    this.setState({ frmSubmit: true });
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

    if (
      sendParams.correctionType == "" ||
      sendParams.status == "" ||
      sendParams.reportType == ""
    ) {
      alert("All fields are mandatory");
      return;
    }

    await this.props.fetchRvPcReport(sendParams);
    await this.setState({ pd: this.props.dailyRvPcReport });
    console.log(this.state.pd);
  };

  handleChangedate = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSave = async () => {
    await this.props.saveRvRtCheckList(this.state.pd);
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
    console.log("usertyoe", typeof userType, userType);
    const wheight = wHeight();

    const correctionTypeOptions = [
      { value: "RV", text: "Revaluation" },
      { value: "RT", text: "Retotaling" },
      { value: "PC", text: "Photo Copy" },
      { value: "ALL", text: "ALL" }

      // { value: "", text: "Correction Type" }
    ];

    const statusTypeOptions = [
      { value: "Applied", text: "Applied" },
      { value: "Pulled", text: "Pulled" },
      { value: "ALL", text: "ALL" }

      // { value: "", text: "Correction Type" }
    ];

    const reportTypeOptions = [
      { value: "Summary", text: "Summary" },
      { value: "Detail", text: "Detail" },
      { value: "CheckList", text: "CheckList" }

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
                  <Form.Group>
                    <Form.Field width={8}>
                      <label> Date Range </label>
                      <InputMask
                        formatChars={formatChars}
                        type="text"
                        value={vdatefrom}
                        mask="ed/nm/zyyy"
                        placeholder="Date From"
                        name="vdatefrom"
                        onChange={this.handleChangedate}
                      />
                    </Form.Field>
                    <Form.Field width={8}>
                      <InputMask
                        formatChars={formatChars}
                        type="text"
                        value={vdateto}
                        mask="ed/nm/zyyy"
                        placeholder="To"
                        name="vdateto"
                        onChange={this.handleChangedate}
                        style={{ marginTop: "1.6em" }}
                      />
                    </Form.Field>
                  </Form.Group>

                  <Form.Group>
                    <Form.Field width={8}>
                      <label> QP Code Range </label>
                      <Form.Input
                        //formatChars={formatChars}
                        type="text"
                        value={qpcodeFrom}
                        //mask=""
                        placeholder="QP Code From"
                        name="qpcodeFrom"
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field width={8}>
                      <Form.Input
                        //formatChars={formatChars}
                        type="text"
                        value={qpcodeTo}
                        // mask="ed/nm/zyyy"
                        placeholder="QP Code To"
                        name="qpcodeTo"
                        onChange={this.handleChange}
                        style={{ marginTop: "1.6em" }}
                      />
                    </Form.Field>
                  </Form.Group>

                  <Form.Group>
                    <Form.Field width={8}>
                      <label> Regno Range </label>
                      <Form.Input
                        //formatChars={formatChars}
                        type="text"
                        value={regnoFrom}
                        //mask=""
                        placeholder="Regno From"
                        name="regnoFrom"
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field width={8}>
                      <Form.Input
                        //formatChars={formatChars}
                        type="text"
                        value={qpcodeTo}
                        // mask="ed/nm/zyyy"
                        placeholder="QP Code To"
                        name="qpcodeTo"
                        onChange={this.handleChange}
                        style={{ marginTop: "1.6em" }}
                      />
                    </Form.Field>
                  </Form.Group>

                  <Form.Group>
                    <Form.Field width={8}>
                      <label>Correction Type</label>
                      <Dropdown
                        placeholder="Correction Type"
                        name="correctionType"
                        value={correctionType}
                        selection
                        search
                        options={correctionTypeOptions}
                        onChange={this.handleChange}
                      />
                    </Form.Field>

                    <Form.Field width={8}>
                      <label>Status</label>
                      <Dropdown
                        placeholder="Status"
                        name="status"
                        value={status}
                        selection
                        search
                        options={statusTypeOptions}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                  </Form.Group>
                  {/* <Form.Field width={16}>
                                        <label>Report Type</label>
                                        <Dropdown
                                            placeholder="Report Type"
                                            name="reportType"
                                            value={reportType}
                                            selection
                                            search
                                            options={reportTypeOptions}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field> */}

                  <Button color="blue" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                  <br />
                </Form>
              </div>

              {this.props.dailyRvPcReport.length != 0 &&
                this.state.reportType == "CheckList" &&
                frmSubmit == true && (
                  <Table
                    celled
                    padded
                    selectable
                    size="small"
                    color="olive"
                    className="tbl sticky1"
                  >
                    <Table.Header
                      style={{ backgroundColor: "bule !important" }}
                    >
                      <Table.Row>
                        <Table.HeaderCell
                          style={{ width: "5%" }}
                          singleLine
                          textAlign="center"
                          rowSpan="2"
                        >
                          Sl. No.
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "5%" }}
                          textAlign="center"
                          rowSpan="2"
                        >
                          Date
                        </Table.HeaderCell>

                        <Table.HeaderCell
                          style={{ width: "15%" }}
                          textAlign="center"
                          rowSpan="2"
                        >
                          Subject Name
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "5%" }}
                          textAlign="center"
                          rowSpan="2"
                        >
                          QP Code
                        </Table.HeaderCell>

                        <Table.HeaderCell
                          style={{ width: "5%" }}
                          textAlign="center"
                          rowSpan="2"
                        >
                          Bundle No.
                        </Table.HeaderCell>

                        <Table.HeaderCell
                          style={{ width: "5%" }}
                          textAlign="center"
                          rowSpan="2"
                        >
                          Packet
                        </Table.HeaderCell>

                        <Table.HeaderCell
                          style={{ width: "5%" }}
                          textAlign="center"
                          rowSpan="2"
                        >
                          Reg. Code
                        </Table.HeaderCell>

                        <Table.HeaderCell
                          style={{ width: "5%" }}
                          textAlign="center"
                          rowSpan="2"
                        >
                          Pull Status
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.state.pd.map((el, i) => {
                        return (
                          <Table.Row
                            key={i}
                            style={{ overflow: "hidden", textAlign: "center" }}
                          >
                            <Table.Cell textAlign="center">{i + 1}</Table.Cell>

                            <Table.Cell style={{ textAlign: "center" }}>
                              {el.fappdate}
                            </Table.Cell>
                            <Table.Cell style={{ textAlign: "left" }}>
                              {el.fsubname}
                            </Table.Cell>
                            <Table.Cell style={{ textAlign: "center" }}>
                              {el.fqpcode}
                            </Table.Cell>

                            <Table.Cell>{el.fbundleno}</Table.Cell>
                            <Table.Cell>{el.fpacket}</Table.Cell>
                            <Table.Cell>{el.fregcode}</Table.Cell>

                            <Table.Cell>
                              <Checkbox
                                onClick={() => {
                                  const ar = this.state.pd;
                                  ar[i] = {
                                    fappdate: el.fappdate,
                                    fsubname: el.fsubname,
                                    fqpcode: el.fqpcode,
                                    fbundleno: el.fbundleno,
                                    fpacket: el.fpacket,
                                    fregcode: el.fregcode,
                                    fpullstatus:
                                      el.fpullstatus == "T" ? "F" : "T"
                                  };
                                  this.setState({ pd: ar });
                                }}
                                checked={el.fpullstatus == "T" ? "checked" : ""}
                                label=""
                              />
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                )}
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
)(UpdateRvRtCheckList);
