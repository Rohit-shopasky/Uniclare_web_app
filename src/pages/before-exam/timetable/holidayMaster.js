import React, { Component } from "react";
import { Card, Button, Form, Dropdown, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getHolidayMaster,
  saveHolidayMaster,
  deleteHoliday
} from "../../../actions/masters/holidayMaster";
import { showError } from "../../../actions";
import HolidayMasterDisplay from "./masholidayDsply";

class HolidayMaster extends Component {
  state = {
    displayTbl: false,
    year: new Date().getFullYear(),
    frmSubmit: false
  };

  handleChange = (e, data) => {
    this.setState({ year: data.value });
  };

  // Get year dropdown for current year till next 4 years
  getYear = () => {
    const year = new Date().getFullYear();
    var yearAr = [];
    for (let i = year - 1; i <= year + 4; i++) {
      let el = { key: i, value: i, text: i };
      yearAr.push(el);
    }
    return yearAr;
  };

  // Get the holidays from Api and show it on the screen
  getHolidayMaster = () => {
    this.props.getHolidayMaster(this.state.year);
    this.setState({ displayTbl: true, frmSubmit: true });
  };

  // Call Add row function in child component with the help of ref
  addRow = () => {
    this.holidaytable.addRow();
  };

  // Set the screen to default state
  handleCancel = () => {
    this.setState({
      displayTbl: false,
      year: new Date().getFullYear(),
      frmSubmit: false
    });
    this.props.deleteHoliday();
  };

  // Save holiday master
  handleSave = async () => {
    const { holidayMaster } = this.props;
    var seenDuplicate = false,
      testObject = {};
    // Check Duplicates in the Array of objects
    holidayMaster.map(item => {
      var itemPropertyName = item["fdate"];
      if (itemPropertyName in testObject) {
        testObject[itemPropertyName].duplicate = true;
        item.duplicate = true;
        seenDuplicate = true;
      } else {
        testObject[itemPropertyName] = item;
        delete item.duplicate;
      }
    });

    if (seenDuplicate) {
      const error = {
        header: "Error",
        content: "Duplicate dates. Enter validates dates."
      };
      this.props.showError(error);
      return;
    }
    // Filter out the blanks
    const holiday = holidayMaster.filter(item => {
      if (item.fdate !== "" && item.fremarks !== "") {
        return item;
      }
    });
    // Save and wait till the response
    await this.props.saveHolidayMaster(this.state.year, holiday);

    // Get the error code of response and if success the clear the screen
    if (this.props.error.error_code == 0) this.handleCancel();
  };

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h3>Holiday Master</h3>
        <div className="ml-auto">
          <Button
            disabled={!this.state.frmSubmit}
            basic
            color="blue"
            content="Add"
            onClick={this.addRow}
            icon="plus"
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
            basic
            onClick={this.handleCancel}
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
    const { displayTbl, year } = this.state;
    const year_options = this.getYear();
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            {this.renderHeader()}
            <Divider />
            <Card.Description style={{ height: "72vh", overflowY: "auto" }}>
              <Form>
                <div className="col-md-4">
                  <Form.Field>
                    <label>Year</label>
                    <Dropdown
                      size="mini"
                      fluid
                      search
                      selection
                      value={year}
                      onChange={this.handleChange}
                      placeholder="Select Year"
                      disabled={this.props.disabled}
                      options={year_options}
                    />
                  </Form.Field>
                  <Button
                    color="blue"
                    className="small ui button"
                    onClick={this.getHolidayMaster}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
              {displayTbl ? (
                <div className="col-md-8">
                  {/* Create the ref for the child component for further use */}
                  <HolidayMasterDisplay
                    year={year}
                    onRef={ref => (this.holidaytable = ref)}
                  />
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
  return {
    holidayMaster: state.holidayMaster,
    error: state.error
  };
};
export default connect(
  mapStateToProps,
  {
    getHolidayMaster,
    showError,
    saveHolidayMaster,
    deleteHoliday
  }
)(HolidayMaster);
