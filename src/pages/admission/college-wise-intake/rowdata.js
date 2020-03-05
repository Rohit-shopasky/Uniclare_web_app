import React, { Component } from "react";
import { Dropdown, Table, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  studentDegreeCombintaion,
  StudentDegreeCombinationADDrow,
  showErrorType,
  filterFcombdata,
  changeAdmissionData
} from "../../../actions/admissions/admission";

import Dropoption from "./dropdownoption";

class RowData extends Component {
  state = {
    addrowdata: true,
    addrowData: true
  };
  dd = [this.props.CurentDegree.particular_college_data.length];

  chnagedata = async (e, el, i) => {
    var data = { ...el, [e.name]: e.value };
    await this.props.changeAdmissionData(data, i);
  };

  onadd = async () => {
    await this.props.particularData.map(async (item, i) => {
      if (
        i == this.props.particularData.length - 1 &&
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

    if (!this.state.addrowData) {
      await this.props.showErrorType("Enter all row data");
    } else {
      this.props.StudentDegreeCombinationADDrow();
      await this.setState({ addrowData: true });
    }
  };

  changeCell = (data, el, i) => {
    var ndata = { ...el, [data.name]: data.value };

    this.props.changeAdmissionData(ndata, i);
  };

  deleteRow = (e, el, i) => {
    const data = { ...el, [e.target.name]: e.target.checked ? "T" : "F" };
    this.props.changeAdmissionData(data, i);
  };

  render() {
    const degreeOptions = this.props.degrees.map((el, i) => {
      return {
        key: i,
        value: el.fdegree,
        text: `${el.fdegree} ${el.fdescpn}`
      };
    });

    const degcomb = this.props.combs.filter((el, i) => {
      return el.fdegree == this.props.el.fdegree;
    });

    const comboptions = degcomb.map((el, i) => {
      return {
        key: i,
        value: el.fcombcode,
        text: `${el.fcombcode} ${el.fcombdesc}`
      };
    });

    return (
      <>
        <Table.Cell textAlign="center">{this.props.i + 1}</Table.Cell>
        <Table.Cell textAlign="center" singleLine>
          <Dropdown
            size="mini"
            fluid
            id={this.props.i}
            openOnFocus={false}
            selectOnBlur={false}
            // searchInput={{ autoFocus: true }}
            placeholder="Select Degree"
            name="fdegree"
            disabled={this.props.el.editFlage ? false : true}
            value={this.props.el.fdegree}
            selection
            search
            options={degreeOptions}
            onChange={(e, data) =>
              this.changeCell(data, this.props.el, this.props.i)
            }
          />
        </Table.Cell>
        <Table.Cell textAlign="center" singleLine>
          <Input
            maxLength="1"
            minLength="1"
            className="field"
            type="text"
            name="fexamno"
            readOnly={this.props.el.editFlage ? false : true}
            id={this.props.i}
            value={this.props.el.fexamno}
            style={{ width: "5em" }}
            onChange={(e, data) => {
              if (data.value == "") {
              } else if (!/^[a-j]+$/i.test(data.value)) {
                return false;
              }
              data = { name: "fexamno", value: data.value.toUpperCase() };
              this.changeCell(data, this.props.el, this.props.i);
            }}

            // onChange={(e, data) => this.changeCell(data, this.props.el, this.props.i)}
          />
        </Table.Cell>
        <Table.Cell>
          <Dropoption
            editFlage={this.props.el.editFlage}
            options={comboptions}
            value={this.props.el.fcombcode}
            onChange={(e, data) =>
              this.changeCell(data, this.props.el, this.props.i)
            }
          />
        </Table.Cell>

        <Table.Cell>
          <Input
            className="field"
            pattern="[0-9]*"
            onChange={(e, data) => {
              if (isNaN(Number(e.target.value) || e.key === "Tab")) {
                return;
              } else {
                this.changeCell(data, this.props.el, this.props.i);
              }
            }}
            type="text"
            style={{ textAlign: "center", width: "5em" }}
            value={this.props.el.fintake}
            name="fintake"
            maxLength="3"
            minLength="3"
            id={this.props.i}
            // onChange={(e, data) => this.changeCell(data, this.props.el, this.props.i)}
          />
        </Table.Cell>
        <Table.Cell textAlign="center">
          <div className="ui checkbox">
            <input
              type="checkbox"
              name="fdeleted"
              onKeyDown={event => {
                if (
                  event.keyCode == 9 &&
                  this.props.i == this.props.particularData.length - 1
                ) {
                  this.onadd();
                }
              }}
              value={this.props.el.fdeleted}
              onChange={e => this.deleteRow(e, this.props.el, this.props.i)}
              checked={this.props.el.fdeleted == "T" ? "checked" : null}
            />
            <label> </label>
          </div>
        </Table.Cell>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    CurentDegree: state.studentDegreeCombintaion,
    filterFcombdataList: state.filterFcombdata,
    degrees: state.studentDegreeCombintaion.degrees,
    combs: state.studentDegreeCombintaion.data,
    particularData: state.studentDegreeCombintaion.particular_college_data
  };
};

export default connect(
  mapStateToProps,
  {
    StudentDegreeCombinationADDrow,
    studentDegreeCombintaion,

    changeAdmissionData,

    filterFcombdata,
    showErrorType
  }
)(RowData);
