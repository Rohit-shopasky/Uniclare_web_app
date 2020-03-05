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
import {
  fetchDailyValuation,
  clearDailyValuation
} from "../../../actions/index";
class DailyValuation extends Component {
  state = {
    showtable: false,
    frmDeggrp: "",
    reportType: "datewWiseValDet",
    frmSubmit: false,
    rftype: "PDF",
    tcodefrom: "0000",
    tcodeto: "zzzz",
    vdatefrom: moment().format("DD/MM/YYYY"),
    vdateto: moment().format("DD/MM/YYYY"),
    boardfrom: "000",
    boardto: "zzz"
  };

  handleChange = (e, data) => {
    switch (data.type) {
      case "text":
        this.setState({ [data.name]: data.value });
      default:
        this.setState({ [data.name]: data.value });
    }
    this.setState({ frmSubmit: false });
    console.log(this.state);
  };

  handleSubmit = async () => {
    let { fcurtype } = this.props.user;
    fcurtype = Number(fcurtype);
    if (fcurtype >= 400) {
      await this.setState({ boardfrom: this.props.user.fdegree });
      await this.setState({ boardto: this.props.user.fdegree });
    }

    let sendParams = {};
    sendParams.dateFrom = this.state.vdatefrom;
    sendParams.dateTo = this.state.vdateto;
    sendParams.boardfrom = this.state.boardfrom;
    sendParams.boardto = this.state.boardto;
    console.log("sendParams", sendParams);
    this.props.clearDailyValuation();
    await this.props.fetchDailyValuation(sendParams);
    // console.log(this.props.dailyValuation);
    // console.log("this.props.data.", this.props.data2);
    // if (this.props.data2 != []) {
    //   this.setState({ showtable: true });
    // }

    // if (fdeggrp === "") {
    //   const error = { header: "Error", content: "Select Degree Group" };
    //   this.props.showError(error);
    //   return;
    // }
    // // this.props.getReport(reportType, "tables", fdeggrp);
    // this.setState({ frmSubmit: true });
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
        <h3>Daily Valuation</h3>
        <div className="ml-auto">
          {/* <Button
            basic
            color="blue"
            onClick={this.handleReport}
            content="Report"
            icon="file"
          /> */}
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
      // frmSubmit,
      // reportType,
      // rftype,
      // tcodefrom,
      // tcodeto,
      vdatefrom,
      vdateto,
      boardfrom,
      boardto
    } = this.state;

    // const reporttypeOptions = [
    //   { value: "datewWiseValDet", text: "Date Wise Valuation Details" }
    // ];
    console.log("dailyValuation", this.props.dailyValuation);
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

                  {userType < 400 && (
                    <Form.Group>
                      <Form.Field width={8}>
                        <label> Board Range </label>
                        <Form.Input
                          //formatChars={formatChars}
                          type="text"
                          value={boardfrom}
                          //mask=""
                          placeholder="Board From"
                          name="boardfrom"
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Form.Field width={8}>
                        <Form.Input
                          //formatChars={formatChars}
                          type="text"
                          value={boardto}
                          // mask="ed/nm/zyyy"
                          placeholder="Board To"
                          name="boardto"
                          onChange={this.handleChange}
                          style={{ marginTop: "1.6em" }}
                        />
                      </Form.Field>
                    </Form.Group>
                  )}

                  <Button color="blue" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                  <br />
                </Form>
              </div>
              {this.props.dailyValuation.length != 0 && (
                <Table
                  celled
                  padded
                  selectable
                  size="small"
                  color="olive"
                  className="tbl sticky1"
                >
                  <Table.Header style={{ backgroundColor: "bule !important" }}>
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
                        style={{ width: "10%" }}
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
                        Board Name
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        style={{ width: "10%" }}
                        textAlign="center"
                        rowSpan="2"
                      >
                        QP Code
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        //style={{ width: "20%" }}
                        textAlign="center"
                        rowSpan="2"
                      >
                        Subject Name
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        textAlign="center"
                        style={{ width: "10%" }}
                      >
                        Packet Cnt.
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        textAlign="center"
                        style={{ width: "10%" }}
                      >
                        Valued Script Cnt.
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        textAlign="center"
                        style={{ width: "10%" }}
                      >
                        Reviewed Script Cnt.
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.dailyValuation.map((el, i) => {
                      return (
                        <Table.Row
                          key={i}
                          style={{ overflow: "hidden", textAlign: "center" }}
                        >
                          <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                          <Table.Cell>{el.fdate}</Table.Cell>
                          <Table.Cell style={{ textAlign: "left" }}>
                            {el.fboardname}
                          </Table.Cell>
                          <Table.Cell style={{ textAlign: "center" }}>
                            {el.fqpcode}
                          </Table.Cell>
                          <Table.Cell style={{ textAlign: "left" }}>
                            {el.fsubname}
                          </Table.Cell>

                          <Table.Cell style={{ textAlign: "center" }}>
                            {el.fpktcnt}
                          </Table.Cell>

                          <Table.Cell>{el.fvcount}</Table.Cell>
                          <Table.Cell>{el.frcount}</Table.Cell>
                          {/* <Table.Cell>{el.frvpktcnt}</Table.Cell>
                          <Table.Cell>{el.frscriptcnt}</Table.Cell>
                          <Table.Cell style={{ textAlign: "left" }}>
                            {el.fpkts}
                          </Table.Cell> */}
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
  return {
    user: state.user,
    // state.allworkDOneReport
    dailyValuation: state.dailyValuation
  };
};
export default connect(
  mapStateToProps,
  {
    showError,
    fetchDailyValuation,
    clearDailyValuation
  }
)(DailyValuation);
