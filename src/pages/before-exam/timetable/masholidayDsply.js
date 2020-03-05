import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Divider } from "semantic-ui-react";
import {
  changeHolidayMaster,
  addHoliday
} from "../../../actions/masters/holidayMaster";
import { showError } from "../../../actions";
import InputMask from "react-input-mask";

class HolidayMasterDisplay extends Component {
  componentDidMount() {
    this.props.onRef(this);
  }

  // On every Change dispatch action to change in store
  changeCell = (e, el, i) => {
    var data = { ...el, [e.target.name]: e.target.value };
    this.props.changeHolidayMaster(data, i);
  };

  // Add Row in the grid
  addRow = () => {
    // get the length of array
    let i = this.props.holidayMaster.length;
    // get the last element in the array
    const el = this.props.holidayMaster[i - 1];
    // if last values are blank then display error
    if (el.fremarks === "" || el.fdate === "") {
      const error = {
        header: "Error",
        content: "Date and remarks cannot be blank"
      };
      this.props.showError(error);
      return;
    }
    // get the year from date of last row
    let year = el.fdate.substr(el.fdate.length - 4);

    // Check wheather it is matching with above selected year
    if (year != this.props.year) {
      const error = { header: "Error", content: "Enter the valid date" };
      this.props.showError(error);
      return;
    }
    // check Wheather date is duplicate or not
    var dupl = false;
    this.props.holidayMaster.map((item, j) => {
      if (item.fdate == el.fdate && i - 1 !== j) dupl = true;
    });
    // If it is duplicate show error
    if (dupl) {
      const error = {
        header: "Error",
        content: "Duplicate date. Enter another date."
      };
      this.props.showError(error);
      return;
    }
    // Create empty object
    const item = { fremarks: "", fdate: "", fdeleted: false };
    // dispatch add holiday action
    this.props.addHoliday(item);
  };

  // On Delete row change fdeleted flag
  deleteRow = (e, el, i) => {
    const data = { ...el, [e.target.name]: e.target.checked };
    this.props.changeHolidayMaster(data, i);
  };

  render() {
    const { holidayMaster } = this.props;
    const arlength = holidayMaster.length;

    // to restict the indian date format
    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };
    return (
      <div className="ui mini form">
        <Divider />
        <Table celled style={{ fontSize: "1.2536em" }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                style={{ width: "5%" }}
                singleLine
                textAlign="center"
              >
                Sl. No.
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "22%" }} textAlign="center">
                Date
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Remarks</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Del
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {holidayMaster.map((el, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell textAlign="center">{i + 1}</Table.Cell>

                  <Table.Cell>
                    <div className="field">
                      <InputMask
                        type="text"
                        style={{ textAlign: "center" }}
                        formatChars={formatChars}
                        mask="ed/nm/zyyy"
                        name="fdate"
                        value={el.fdate}
                        id={i}
                        onChange={e => this.changeCell(e, el, i)}
                        placeholder="dd/mm/yyyy"
                      />
                    </div>
                  </Table.Cell>

                  <Table.Cell textAlign="center" singleLine>
                    <input
                      className="field"
                      type="text"
                      name="fremarks"
                      id={i}
                      value={el.fremarks}
                      onChange={e => this.changeCell(e, el, i)}
                      placeholder="Remarks"
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {arlength == i + 1 ? (
                      <div className="ui checkbox">
                        <input
                          type="checkbox"
                          onKeyDown={e =>
                            e.keyCode === 9 ? this.addRow() : false
                          }
                          name="fdeleted"
                          value={el.fdeleted}
                          onChange={e => this.deleteRow(e, el, i)}
                          checked={el.fdeleted == "true" ? "checked" : null}
                        />
                        <label> </label>
                      </div>
                    ) : (
                      <div className="ui checkbox">
                        <input
                          type="checkbox"
                          name="fdeleted"
                          value={el.fdeleted}
                          onChange={e => this.deleteRow(e, el, i)}
                          checked={el.fdeleted == "true" ? "checked" : null}
                        />
                        <label> </label>
                      </div>
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    holidayMaster: state.holidayMaster
  };
};
export default connect(
  mapStateToProps,
  {
    changeHolidayMaster,
    showError,
    addHoliday
  }
)(HolidayMasterDisplay);
