import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { Card, Divider, Button, Message, Radio, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  fetchDegColl,
  fetchCntrListdet,
  saveExamCenter,
  deleteExamCenter
} from "../../../actions/before-exam/centers";
import SelectDeggrp from "../../common/SelectDeggrp";
import SelectCollege from "../../common/SelectCollege";
import ReportModal from "../../common/ReportModal";
import TagColl from "./tagColl";

class CCentres extends Component {
  state = {
    examcentreList: [{ fcollcode: "", fdeleted: false }],
    error: false,
    errorMessage: "",
    del_deggrp: [],
    degGrp: "",
    thpr: "",
    examcntr: "",
    frmSubmit: false,
    open: false,
    disbal: "",
    examCntrDetError: "",
    msgcolor: "negative",
    collref: React.createRef()
  };

  show = dimmer => () => {
    if (this.state.degGrp === "") {
      this.setState({ error: true, errorMessage: "Enter the Degree Group" });
      return;
    } else {
      this.setState({ error: false, errorMessage: "" });
    }

    this.setState({ dimmer, open: true });
  };

  close = () => this.setState({ open: false });

  setTHPR = (e, data) => {
    this.setState({ thpr: data.value });
  };

  setExamCntr = (e, data) => {
    this.setState({ examcntr: data.value });
  };

  getCollege = (e, data) => {
    this.setState({ degGrp: data.value });
    this.props.fetchDegColl(data.value);
  };

  feachcenterdet = async () => {
    //this.setState({ error: false, errorMessage: "" });
    if (this.state.degGrp === "") {
      this.setState({ error: true, errorMessage: "Enter the Degree Group" });
      return;
    } else if (this.state.examcntr === "") {
      this.setState({ error: true, errorMessage: "Enter the Exam Center" });
      return;
    } else if (this.state.thpr === "") {
      this.setState({ error: true, errorMessage: "Select Theory / Practical" });
      return;
    } else {
      this.setState({ error: false, errorMessage: "" });
    }

    await this.props.fetchCntrListdet(
      this.state.examcntr,
      this.state.degGrp,
      this.state.thpr
    );
    this.setState({ frmSubmit: true, disbal: "disabled" });
  };

  handleCancel = () => {
    this.setState({
      examcentreList: [{ fcollcode: "", fdeleted: false }],
      error: false,
      errorMessage: "",
      del_deggrp: [],
      thpr: "",
      examcntr: "",
      frmSubmit: false,
      open: false,
      disbal: ""
    });

    // console.log(this.state.collref);
    // this.state.collref.open = true;
    // ReactDOM.findDOMNode(this.refs.centre_select).focus()
  };

  handleSave = async () => {
    if (this.props.examCntrDet.length < 0) {
      this.setState({ msgcolor: "negative" });
      this.setState({ error: true, errorMessage: "Enter the Values" });
      return;
    } else {
      this.setState({ error: false, errorMessage: "" });
    }

    for (let i = 0; i < this.props.examCntrDet.length; i++) {
      let el = this.props.examCntrDet[i];
      if (el.fcollcode === "") {
        this.setState({ error: true, errorMessage: "Enter all the Values" });
        return;
      }
    }
    const el = { fcollcode: this.state.examcntr, fdeleted: false };

    const examcentreList = [el, ...this.props.examCntrDet];

    this.setState({ error: false, errorMessage: "" });
    await this.props.saveExamCenter(
      examcentreList,
      this.state.examcntr,
      this.state.degGrp,
      this.state.thpr
    );

    if (this.props.error.error_code === 0) this.handleCancel();
  };

  handleDelete = async () => {
    await this.props.deleteExamCenter(
      this.state.examcntr,
      this.state.degGrp,
      this.state.thpr
    );
    if (this.props.error.error_code === 0) this.handleCancel();
  };

  addRowTop = () => {
    this.tagcoll.addRowTop();
  };

  render() {
    const {
      error,
      errorMessage,
      frmSubmit,
      open,
      disbal,
      msgcolor
    } = this.state;
    const report_options = [
      { key: "ECL", value: "ECL", text: "Exam Center List" },
      { key: "ECT", value: "ECT", text: "Exam Center List with Taged College" }
    ];

    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Exam Center</h4>
              <div className="ml-auto">
                <Button
                  disabled={!this.state.frmSubmit}
                  basic
                  color="blue"
                  content="Add"
                  onClick={this.addRowTop}
                  icon="plus square"
                />
                <Button
                  disabled={!this.state.frmSubmit}
                  basic
                  color="green"
                  content="Save"
                  onClick={this.handleSave}
                  icon="save"
                />
                <Button
                  disabled={!this.state.frmSubmit}
                  basic
                  color="red"
                  content="Delete"
                  onClick={this.handleDelete}
                  icon="trash"
                />
                <Button
                  basic
                  color="black"
                  icon="ban"
                  onClick={this.handleCancel}
                  content="Cancel"
                />
                <Button
                  onClick={this.show("blurring")}
                  basic
                  color="blue"
                  content="Report"
                  icon="file"
                />
                <Link to="/dashboard">
                  <Button basic color="red" content="Exit" icon="home" />
                </Link>
              </div>
            </Card.Header>

            <Divider />
            <Card.Description style={{ overflowY: "auto", height: "72vh" }}>
              <div className="col-md-6">
                <Form>
                  <SelectDeggrp
                    changeDeggrp={this.getCollege}
                    disabled={disbal}
                    frmDeggrp={this.state.degGrp}
                  />

                  <SelectCollege
                    collref={this.state.collref}
                    degcoll={this.props.degcoll}
                    examcntr={this.state.examcntr}
                    changeExamCntr={this.setExamCntr}
                    disbal={disbal}
                  />

                  <Radio
                    label="Theory"
                    name="radioGroup"
                    value="TH"
                    // @ts-ignore
                    disabled={disbal}
                    checked={this.state.thpr === "TH"}
                    onChange={this.setTHPR}
                  />
                  <Radio
                    label="Practical"
                    name="radioGroup"
                    value="PR"
                    // @ts-ignore
                    disabled={disbal}
                    style={{ marginLeft: "2%" }}
                    checked={this.state.thpr === "PR"}
                    onChange={this.setTHPR}
                  />
                  <br />
                  <Button color="blue" onClick={this.feachcenterdet}>
                    Submit
                  </Button>
                </Form>
              </div>
              <br /> <br />
              {error ? (
                <Message className={msgcolor}>
                  <Message.Header> {errorMessage} </Message.Header>
                </Message>
              ) : null}
              <div className="ui mini form" style={{ fontSize: "1.1536em" }}>
                {frmSubmit ? (
                  <TagColl onRef={ref => (this.tagcoll = ref)} />
                ) : null}
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
        <ReportModal
          dimmer="blurring"
          open={open}
          close={this.close}
          report="Center List"
          report_options={report_options}
          deggrp={this.state.degGrp}
          screen="examcenter"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cntrList: state.cntrList,
    degcoll: state.degcoll,
    examCntrDet: state.examCntrDet,
    saveExamCntr: state.saveExamCenter,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  {
    saveExamCenter,
    fetchDegColl,
    fetchCntrListdet,
    deleteExamCenter
  }
)(CCentres);
