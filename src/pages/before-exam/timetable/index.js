import React from "react";
import { Card, Divider, Button, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchDegGrp } from "../../../actions";
import {
  cancelTimetable,
  saveExamtimetable
} from "../../../actions/before-exam/timetable";
import TimeTableForm from "./timetableForm";
import ReportTimetable from "./report";
import Rows from "./rows";
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

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h4>Update Time Table</h4>
        <div className="ml-auto">
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
            onClick={this.cancel}
            color="black"
            icon="ban"
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

  handleSave = async () => {
    const timetable = this.state.trrefs.map((tr, i) => {
      return tr.state.el;
    });
    await this.props.saveExamtimetable(timetable, this.state.ttform);
    this.cancel();
  };

  renderForm = () => {
    const { frmSubmit, dimmer, open } = this.state;
    const { timetable } = this.props;
    var wheight = (window.innerHeight * 70) / 100;
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            {this.renderHeader()}
            <Divider />
            <Card.Description
              style={{ height: `${wheight}px`, overflowY: "auto" }}
            >
              <div className="col-md-8 col-sm-9">
                <TimeTableForm
                  setFromValues={this.setFromValues}
                  onRef={ref => (this.child = ref)}
                />
              </div>
              {frmSubmit ? (
                <div className="ui mini form">
                  <Divider />
                  <Table celled style={{ fontSize: "1.1536em" }}>
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
                          style={{ width: "8%" }}
                          textAlign="center"
                        >
                          QP Code
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">
                          Subject Name
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "15%" }}
                          textAlign="center"
                        >
                          Perm. Date
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "15%" }}
                          textAlign="center"
                        >
                          Temp. Date
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "25%" }}
                          textAlign="center"
                        >
                          Time
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
                      {timetable.map((el, i) => {
                        let nel = el.toJS();
                        return (
                          <Rows
                            key={i}
                            i={i}
                            el={nel}
                            onRef={ref => (this.state.trrefs[i] = ref)}
                          />
                        );
                      })}
                    </Table.Body>
                  </Table>
                </div>
              ) : null}
              <ReportTimetable open={open} dim={dimmer} close={this.close} />
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  };

  render() {
    return this.renderForm();
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
    cancelTimetable
  }
)(TimeTable);
