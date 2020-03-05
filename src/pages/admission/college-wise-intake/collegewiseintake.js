import React, { Component } from "react";
import {
  Card,
  Divider,
  Button,
  Form,
  Dropdown,
  Table
} from "semantic-ui-react";
import { connect } from "react-redux";
import {
  studentDegreeCombintaion,
  StudentDegreeCombinationADDrow,
  cancelCollegeComb,
  showErrorType,
  saveDegreeCombintaion,
  changeAdmissionData
} from "../../../actions/admissions/admission";

import { getCollegeList } from "../../../actions/masters/collegeform";

import { Link } from "react-router-dom";
import { wHeight } from "../../parms";
import Rowdata from "./rowdata";

var tableData = [];
var degrrelistoption = [];
var degreeData = [];
var particularClgdata = [];
var fcollcodeData = [];
var fcollcodeNewDataoption = [];
var fcollcodeNewData = [];

var finalData = [];
const Dropoption = props => {
  var deName = props.realdaata.particular_college_data[props.itemvalue].fdegree;

  tableData = props.value;
  fcollcodeData = tableData.filter(item => {
    return deName == item.fdegree
      ? {
          value: item.fcombcode,
          text: item.fcombcode
        }
      : "";
  });
  fcollcodeNewDataoption = [];
  fcollcodeNewDataoption = fcollcodeData.map(item => {
    return {
      value: item.fcombcode,
      text: item.fcombcode
    };
  });
  const a = async (e, el, i) => {
    var data = { ...el, [e.name]: e.value };

    await props.f(data, i);
  };
  return (
    <>
      <Dropdown
        label="sss"
        name="fcombcode"
        fluid
        search
        selection
        onChange={(e, data) =>
          a({ name: data.name, value: data.value }, props.el, props.i)
        }
        // onChange={a}
        placeholder="Select Degree"
        options={fcollcodeNewDataoption}
        defaultValue={deName}
        value={fcollcodeNewDataoption.fcombcode}
      />
    </>
  );
};

class Collegewiseintake extends Component {
  componentDidMount() {
    this.props.getCollegeList();
  }
  state = {
    emptyData: true,
    saveButton: true,
    duplicateData: false,
    addrowState: true,
    addrowdata: true,
    addrowData: true,
    dropDisable: false,
    checkbox: "",
    fcollcode: "",
    showoption: false,
    showfeild: false,
    getallclg: true,
    fcolcode: "",
    deggroup: [
      {
        fdeggrp: "",
        fdescpn: "",
        fyear: "",
        ftype: "",
        fexamdate: "",
        fdeleted: false
      }
    ]
  };

  onadd = async () => {
    await this.props.collcomb.map(async (item, i) => {
      console.log(
        "ietm",
        item.fcombcode,
        item.fdegree,
        item.fintake,
        item.fexamno
      );

      // (this.props.collcomb.length==i)

      if (
        i == this.props.collcomb.length - 1 &&
        item.fcombcode == "" &&
        item.fdegree == "" &&
        item.fintake == "" &&
        item.fexamno == ""
      ) {
        alert("w");
        await this.setState({ addrowData: false });
        // await this.props.StudentDegreeCombinationADDrow()
      }
    });
    console.log("addrowData", this.state.addrowData);
    if (!this.state.addrowData) {
      await this.props.showErrorType("Enter all row data");
    } else {
      this.props.StudentDegreeCombinationADDrow();
      await this.setState({ addrowData: true });
    }
  };

  changeCell = async (e, el, i) => {
    await this.setState({ frmsubmit: true });
    await this.setState({ duplicateData: false });
    console.log("droopp", "e", e, "el", el, "i", i);
    var data = { ...el, [e.target.name]: e.target.value };
    await this.props.changeAdmissionData(data, i);
  };

  handleSave = async () => {
    await this.setState({ duplicateData: false });
    var check = [];

    finalData = [];
    this.props.collcomb.map(async (item, i) => {
      if (
        i != this.props.collcomb.length - 1 &&
        (item.fcombcode != "" &&
          item.fdegree != "" &&
          item.fintake != "" &&
          item.fexamno != "")
      ) {
        this.setState({ emptyData: false });
      }
      if (
        item.fcombcode != "" &&
        item.fdegree != "" &&
        item.fintake != "" &&
        item.fexamno != ""
      ) {
        finalData.push({
          fdegree: item.fdegree,
          fexamno: item.fexamno,
          fcombcode: item.fcombcode,
          fintake: item.fintake,
          fdeleted: item.fdeleted
        });
      }

      console.log(
        "after before hcek",
        check.indexOf(`${item.fcombcode}+${item.fdegree}`),
        "check",
        check,
        `${item.fcombcode}+${item.fdegree}`
      );
      if (check.indexOf(`${item.fcombcode}+${item.fdegree}`) !== -1) {
        await this.setState({ duplicateData: true });
      }
      check.push(`${item.fcombcode}+${item.fdegree}`);
    });

    if (this.state.emptyData == false) {
      await this.props.saveDegreeCombintaion(
        this.props.collcomb,
        this.state.fcollcode,
        this.state.duplicateData,
        this.state.emptyData,
        finalData
      );

      await this.props.studentDegreeCombintaion(this.state.fcollcode);
    } else {
      this.props.showErrorType("Enter all data");
    }
  };

  getCollComb = async () => {
    this.setState({ saveButton: false });
    this.setState({ dropDisable: true });
    await this.props.studentDegreeCombintaion(this.state.fcollcode);

    this.setState({ showTable: true });
  };

  handleClgChange = (e, data) => {
    this.setState({ fcollcode: data.value });
  };

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h4>College Wise Intake</h4>
        <div className="ml-auto">
          <Button
            disabled={this.state.saveButton}
            basic
            color="green"
            content="Save"
            onClick={this.handleSave}
            icon="save"
          />
          <Button
            basic
            onClick={async () => {
              this.props.cancelCollegeComb();

              await this.setState({ dropDisable: false, saveButton: true });
              await this.setState({ showTable: false });
              await this.setState({ fcollcode: "" });
            }}
            color="black"
            icon="ban"
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
    const collegeOptionsList = this.props.collegeList.map(item => {
      return {
        value: item.fcollcode,
        text: `${item.fcollcode} ${item.fcollname}`
      };
    });
    const particularClgdata = this.props.collcomb;
    const wheight = wHeight();
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            {this.renderHeader()}
            <Divider />
            <Card.Description
              style={{ height: `${wheight}px`, overflowY: "auto" }}
            >
              <div className="col-md-12">
                <Form>
                  <Form.Group>
                    <Form.Field width={16}>
                      <label>College List</label>
                      <Dropdown
                        size="mini"
                        fluid
                        disabled={this.state.dropDisable ? true : false}
                        openOnFocus={false}
                        selectOnBlur={false}
                        searchInput={{ autoFocus: true }}
                        placeholder="Select College"
                        name="fcollcode"
                        selection
                        search
                        value={this.state.fcollcode}
                        options={collegeOptionsList}
                        onChange={this.handleClgChange}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Divider />
                  <Button
                    disabled={this.state.fcollcode == "" ? true : false}
                    onClick={this.getCollComb}
                    color="blue"
                    content="Submit"
                  />
                </Form>

                {this.state.showTable && (
                  <>
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell colSpan="9">
                            Combination Wise Intake
                            <b style={{ float: "right" }}>
                              <Button
                                basic
                                // disabled={this.state.addrowState ? false : true}
                                color="blue"
                                content="Add Row"
                                icon="plus"
                                onClick={this.onadd}
                              />
                            </b>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell
                            style={{ width: "5%" }}
                            singleLine
                            textAlign="center"
                          >
                            Sl. No.
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "30%" }}
                            textAlign="center"
                          >
                            Degree
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "5%" }}
                            textAlign="center"
                          >
                            Semester
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "30%" }}
                            textAlign="center"
                          >
                            Combination
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "5%" }}
                            textAlign="center"
                          >
                            Intake
                          </Table.HeaderCell>
                          <Table.HeaderCell
                            style={{ width: "5%" }}
                            textAlign="center"
                          >
                            Del
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {particularClgdata.map((el, i) => {
                          return (
                            <Table.Row key={i}>
                              <Rowdata el={el} i={i} />
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table>
                  </>
                )}
                {/* </Form> */}
              </div>
              <Divider />
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    collegeList: state.collegeList,
    collcomb: state.studentDegreeCombintaion.particular_college_data
  };
};

export default connect(
  mapStateToProps,
  {
    StudentDegreeCombinationADDrow,
    studentDegreeCombintaion,
    showErrorType,

    changeAdmissionData,
    getCollegeList,
    saveDegreeCombintaion,
    cancelCollegeComb
  }
)(Collegewiseintake);

// )(Collegewiseintake, { Dropoption });
