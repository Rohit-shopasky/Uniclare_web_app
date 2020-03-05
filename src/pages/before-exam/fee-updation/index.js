import React from "react";
import { Card, Divider, Button, Form, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  saveFeeDetails,
  changefeeform,
  displayfeeDetails,
  cancelFeestr,
  getFeeParams
} from "../../../actions/finance/fee-str";
import { showError } from "../../../actions";
import { Link } from "react-router-dom";
import { wHeight } from "../../parms";
import SelectMulDegree from "./SelectMulDegree";
import SelectMulCategory from "./SelectMulCategory";
import FeeDetlTable from "./FeeDetlTable";
import { ReportAPI } from "../../../apis/consts";

class FeeUpdate extends React.Component {
  state = {
    exams: [
      { key: "A", value: "A", text: "I Semester" },
      { key: "B", value: "B", text: "II Semester" },
      { key: "C", value: "C", text: "III Semester" },
      { key: "D", value: "D", text: "IV Semester" },
      { key: "E", value: "E", text: "V Semester" },
      { key: "F", value: "F", text: "VI Semester" }
    ],
    feetype: [
      { key: "A", value: "Normal Fee", text: "Normal Fee" },
      { key: "B", value: "Low Income", text: "Low Income" }
    ],
    module: [
      { key: "A", value: "EXAM", text: "Exam Application" },
      { key: "B", value: "ADM", text: "Admission" },
      { key: "C", value: "PGET", text: "PG Entrence Test" }
    ],
    frmsubmit: false
  };

  componentDidMount() {
    this.props.getFeeParams();
  }

  cancel = () => {
    if (this.feetable !== undefined) this.feetable.cancel();
    this.props.cancelFeestr();
    this.setState({ frmsubmit: false });
  };

  show = dimmer => () => this.setState({ dimmer, open: true });

  close = (e, data) => {
    if (e.type == "keydown") return;
    this.setState({ open: false });
  };

  onValChange = (e, data) => {
    this.props.changefeeform(data.name, data.value);
  };
  handleSave = async () => {
    const feeDetl = this.feetable.state.feeDetl;
    const feearr = feeDetl.filter((el, i) => {
      if (
        el.ffee > 0 ||
        el.fmaxfee > 0 ||
        el.fprfee > 0 ||
        el.frepfee > 0 ||
        el.frepprfee > 0
      )
        return el;
    });
    if (feearr.length === 0) {
      const error = { header: "Error", content: "Enter the Fees" };
      this.props.showError(error);
      return;
    }
    await this.props.saveFeeDetails(feeDetl);
    this.cancel();
  };

  handleReport = () => {
    const {
      fdegree,
      fexamno,
      fcategory,
      fconstype,
      fcombcode
    } = this.props.feeStrForm;
    if (fdegree.length === 0) {
      const error = { header: "Error", content: "Select Degree / Degrees" };
      this.props.showError(error);
      return;
    }
    if (fcategory.length === 0) {
      const error = {
        header: "Error",
        content: "Select category / categories"
      };
      this.props.showError(error);
      return;
    }
    if (fexamno.length === 0) {
      const error = { header: "Error", content: "Select Semester / Semesters" };
      this.props.showError(error);
      return;
    }
    if (fconstype.length === 0) {
      const error = { header: "Error", content: "Select Fee Type" };
      this.props.showError(error);
      return;
    }
    if (fcombcode === "") {
      const error = { header: "Error", content: "Select Module" };
      this.props.showError(error);
      return;
    }
    console.log({ fcombcode, fconstype, fexamno, fdegree, fcategory });
    // console.log(var deg = fdegree.join("','"));
    var deg = fdegree.join("','");
    var cat = fcategory.join("','");
    var exm = fexamno.join("','");
    var cons = fconstype.join("','");
    const params =
      "&deg=" +
      deg +
      "&combcode=" +
      fcombcode +
      "&catcode=" +
      cat +
      "&exmno=" +
      exm +
      "&cons=" +
      cons;
    window.open(
      ReportAPI + "admFeeReport&" + "univcode=" + this.props.univcode + params,
      "_blank" // <- This is what makes it open in a new window.
    );
  };

  handleSubmit = async () => {
    const {
      fdegree,
      fexamno,
      fcategory,
      fconstype,
      fcombcode
    } = this.props.feeStrForm;
    if (fdegree.length === 0) {
      const error = { header: "Error", content: "Select Degree / Degrees" };
      this.props.showError(error);
      return;
    }
    if (fcategory.length === 0) {
      const error = {
        header: "Error",
        content: "Select category / categories"
      };
      this.props.showError(error);
      return;
    }
    if (fexamno.length === 0) {
      const error = { header: "Error", content: "Select Semester / Semesters" };
      this.props.showError(error);
      return;
    }
    if (fconstype.length === 0) {
      const error = { header: "Error", content: "Select Fee Type" };
      this.props.showError(error);
      return;
    }
    if (fcombcode === "") {
      const error = { header: "Error", content: "Select Module" };
      this.props.showError(error);
      return;
    }
    await this.props.displayfeeDetails();
    this.setState({ frmsubmit: true });
  };

  render() {
    const wheight = wHeight();
    const {
      fdegree,
      fexamno,
      fcategory,
      fconstype,
      fcombcode,
      module_opt,
      feetype
    } = this.props.feeStrForm;
    const frmsubmit = this.state.frmsubmit;
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Update Fee Structure</h4>
              <div className="ml-auto">
                <Button
                  disabled={!this.state.frmsubmit}
                  basic
                  color="green"
                  content="Save"
                  onClick={this.handleSave}
                  icon="save"
                />
                <Button
                  basic
                  onClick={this.cancel}
                  color="black"
                  icon="ban"
                  content="Cancel"
                />
                <Button
                  onClick={this.handleReport}
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
            <Card.Description
              style={{ height: `${wheight}px`, overflowY: "auto" }}
            >
              <div className="col-md-12">
                <Form>
                  <SelectMulDegree
                    fdegree={fdegree}
                    onDegreeChange={this.onValChange}
                    disabled={frmsubmit}
                  />
                  <Form.Group>
                    <Form.Field width="8">
                      <SelectMulCategory
                        fcategory={fcategory}
                        onCategoryChange={this.onValChange}
                        disabled={frmsubmit}
                      />
                    </Form.Field>
                    <Form.Field width="8">
                      <label>Semester / Year</label>
                      <Dropdown
                        fluid
                        search
                        selection
                        name="fexamno"
                        value={fexamno}
                        onChange={this.onValChange}
                        placeholder="Select Semester / Year"
                        options={this.state.exams}
                        multiple
                        disabled={frmsubmit}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width="4">
                      <label>Fee Type</label>
                      <Dropdown
                        fluid
                        search
                        selection
                        name="fconstype"
                        value={fconstype}
                        onChange={this.onValChange}
                        placeholder="Select Fee Type"
                        options={feetype}
                        disabled={frmsubmit}
                      />
                    </Form.Field>
                    <Form.Field width="4">
                      <label>Module</label>
                      <Dropdown
                        fluid
                        search
                        selection
                        value={fcombcode}
                        name="fcombcode"
                        onChange={this.onValChange}
                        placeholder="Select Module"
                        options={module_opt}
                        disabled={frmsubmit}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Button color="blue" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </Form>
              </div>
              {this.state.frmsubmit ? (
                <FeeDetlTable onRef={ref => (this.feetable = ref)} />
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
    feeStrForm: state.feeStrForm,
    univcode: state.user.fcuruniv
  };
};

export default connect(
  mapStateToProps,
  {
    saveFeeDetails,
    showError,
    changefeeform,
    displayfeeDetails,
    cancelFeestr,
    getFeeParams
  }
)(FeeUpdate);
