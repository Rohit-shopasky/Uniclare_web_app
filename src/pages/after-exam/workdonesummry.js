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
import { ReportAPI } from "../../apis/consts";
import { showError } from "../../actions";
import InputMask from "react-input-mask";
import { wHeight } from "../parms";
import moment from "moment";
import { getWorkDoneSummry } from "../../actions/after-exam/workdoneSummry";
class WorkDoneReport extends Component {
  state = {
    showtable: false,
    frmDeggrp: "",
    reportType: "datewWiseValDet",
    frmSubmit: false,
    rftype: "PDF",
    tcodefrom: "0000",
    tcodeto: "zzzz",
    vdatefrom: moment()
      .subtract(7, "days")
      .format("DD/MM/YYYY"),
    vdateto: moment().format("DD/MM/YYYY")
  };

  handleChange = (e, data) => {
    switch (data.type) {
      case "text":
        this.setState({ [data.name]: data.value });
      default:
        this.setState({ [data.name]: data.value });
    }
    this.setState({ frmSubmit: false });
  };

  handleSubmit = async () => {
    const { fdeggrp } = this.props.user;
    const { reportType } = this.state;
    await this.props.getWorkDoneSummry(
      this.state,
      this.props.user.fuserid,
      this.props.user.fcurtype
    );
    console.log("this.props.data.", this.props.data);

    if (this.props.data.valdet.length > 0) {
      this.setState({ showtable: true });
    }

    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }
    // this.props.getReport(reportType, "tables", fdeggrp);
    this.setState({ frmSubmit: true });
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
    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }
    // var C = " http://192.168.0.32/univadmin
    //     / app.php ? a = teachWorkDone
    //     & univcode=041 &
    //         deggrp=UG &
    //             tcodefrom=0000
    //                 & tcodeto=zzzz
    //                     & vdatefrom=13 / 11 / 2019 &
    //                         vdateto=20 / 11 / 2019 &
    //                             format=PDF & user=""
    console.log(
      ReportAPI +
        "teachWorkDone" +
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
        "&format=PDF",
      this.props.user.fuserid
    );

    if (this.props.user.fcurtype == "600") {
      window.open(
        ReportAPI +
          "teachWorkDone" +
          "&univcode=" +
          fcuruniv +
          "&deggrp=" +
          fdeggrp +
          "&tcodefrom=" +
          this.props.user.fuserid +
          "&tcodeto=" +
          this.props.user.fuserid +
          "&vdatefrom=" +
          vdatefrom +
          "&vdateto=" +
          vdateto +
          "&format=PDF" +
          "&fcollcode=" +
          this.props.user.fcollcode,
        "_blank"
      );
    } else if (parseInt(this.props.user.fcurtype) >= 500) {
      window.open(
        ReportAPI +
          "teachWorkDone" +
          "&univcode=" +
          fcuruniv +
          "&deggrp=" +
          fdeggrp +
          "&tcodefrom=0000" +
          "&tcodeto=ZZZZ" +
          "&vdatefrom=" +
          vdatefrom +
          "&vdateto=" +
          vdateto +
          "&format=PDF" +
          "&fcollcode=" +
          this.props.user.fcollcode,
        "_blank"
      );
    } else {
      window.open(
        ReportAPI +
          "teachWorkDone" +
          "&univcode=" +
          fcuruniv +
          "&deggrp=" +
          fdeggrp +
          "&tcodefrom=0000" +
          "&tcodeto=ZZZZ" +
          "&vdatefrom=" +
          vdatefrom +
          "&vdateto=" +
          vdateto +
          "&format=PDF",
        "_blank"
      );
    }
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
        <h3>Work Done Summary</h3>
        <div className="ml-auto">
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
      frmSubmit,
      reportType,
      rftype,
      tcodefrom,
      tcodeto,
      vdatefrom,
      vdateto
    } = this.state;
    var ttl = 0;

    const reporttypeOptions = [
      { value: "datewWiseValDet", text: "Date Wise Valuation Details" }
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
              <div className="col-md-6 col-lg-6 col-xl-6">
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

                  <Button color="blue" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                  <br />
                </Form>
              </div>
              {this.state.showtable && (
                <Table
                  celled
                  padded
                  selectable
                  size="small"
                  color="olive"
                  className="tbl sticky"
                >
                  <Table.Header style={{ backgroundColor: "bule !important" }}>
                    <Table.Row>
                      <Table.HeaderCell
                        width={1}
                        singleLine
                        textAlign="center"
                        rowSpan="1"
                      >
                        Sl. No.
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        width={1}
                        textAlign="center"
                        rowSpan="1"
                      >
                        QP Code
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        width={6}
                        singleLine
                        textAlign="center"
                        rowSpan="1"
                      >
                        Subject Name
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        width={1}
                        textAlign="center"
                        rowSpan="1"
                      >
                        Teacher Code
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        width={6}
                        textAlign="center"
                        rowSpan="1"
                      >
                        Teacher name
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        width={1}
                        textAlign="center"
                        rowSpan="1"
                      >
                        Total Scripts
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.props.data.valdet.map((el, i) => {
                      ttl += +el.cnt;
                      return (
                        <Table.Row
                          key={i}
                          style={{
                            overflow: "hidden",
                            textAlign: "center"
                          }}
                        >
                          <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                          <Table.Cell textAlign="center">
                            {el.fqpcode}
                          </Table.Cell>
                          <Table.Cell style={{ textAlign: "left" }}>
                            {el.fsubname}
                          </Table.Cell>
                          <Table.Cell>{el.fteachcode}</Table.Cell>
                          <Table.Cell style={{ textAlign: "left" }}>
                            {el.fteachname}
                          </Table.Cell>
                          <Table.Cell>{el.cnt}</Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                  <Table.Footer>
                    <Table.Row textAlign="center">
                      <Table.HeaderCell colSpan="5">Total</Table.HeaderCell>
                      <Table.HeaderCell>{ttl}</Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
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
    data: state.allworkDoneReportSummary
  };
};
export default connect(
  mapStateToProps,
  {
    showError,
    getWorkDoneSummry
  }
)(WorkDoneReport);
