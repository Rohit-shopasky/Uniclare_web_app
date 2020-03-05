import React from "react";
import { Card, Divider, Button, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchDegGrp } from "../../../actions";
import {
  cancelTimetable,
  saveExamtimetable,
  releaseTimeTable
} from "../../../actions/before-exam/timetable";
import GenTimeTableForm from "./genttform";
import ReportTimetable from "./report";
import { Link } from "react-router-dom";

class TimeTable extends React.Component {
  state = {
    ttform: {},
    trrefs: [],
    open: false,
    frmDeggrp: "",
    frmdegree: "",
    deggrpError: false,
    degreeError: false,
    frmSubmit: false
  };

  componentDidMount() {
    this.props.fetchDegGrp();
  }

  cancel = () => {
    this.child.cancel();
    this.props.cancelTimetable();
    this.setState({ frmSubmit: false });
  };

  show = dimmer => () => this.setState({ dimmer, open: true });

  close = (e, data) => {
    if (e.type == "keydown") return;
    this.setState({ open: false });
  };

  setFromValues = async values => {
    await this.setState({ ttform: values, frmSubmit: true });
  };

  releaseTimeTable = async () => {
    const data = await this.child.validateForm();
    if (data === undefined) return;

    // take Confirmation from user

    // call release to public action
    this.props.releaseTimeTable(data);
  };

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h4>Genarate Time Table</h4>
        <div className="ml-auto">
          <Button
            basic
            onClick={this.releaseTimeTable}
            color="teal"
            icon="share square"
            content="Release"
          />
          <Button
            basic
            onClick={this.cancel}
            color="black"
            icon="times circle"
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
    );
  };

  render() {
    const { dimmer, open } = this.state;
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            {this.renderHeader()}
            <Divider />
            <Card.Description style={{ height: "72vh", overflowY: "auto" }}>
              <div className="col-md-8 col-sm-9">
                <GenTimeTableForm
                  setFromValues={this.setFromValues}
                  onRef={ref => (this.child = ref)}
                />
              </div>
              <ReportTimetable open={open} dim={dimmer} close={this.close} />
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
    timetable: state.timetable
  };
};
// withRouter(connect(...)(MyComponent))
export default connect(
  mapStateToProps,
  {
    fetchDegGrp,
    saveExamtimetable,
    cancelTimetable,
    releaseTimeTable
  }
)(TimeTable);
