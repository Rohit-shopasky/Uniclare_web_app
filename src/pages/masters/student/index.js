import React, { Component } from "react";
import { Card, Input, Form, Button, Divider, Tab } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  getStudDet,
  getSubject,
  getExamApps,
  getIAMarks
} from "../../../actions/masters/student";
import StudInfoDisplay from "./studInfoDisplay";
import { Link } from "react-router-dom";
import { wHeight } from "../../parms";
import CurExamSubject from "./cur_subject";
import ExamApps from "./ExamApps";
import IAMarks from "./IAMarks";

class Student extends Component {
  state = { studid: "", fregno: "", frmsubmit: false };

  getStudentDet = evt => {
    this.setState({ studid: evt.target.value });
  };

  getStudent = async () => {
    this.setState({ frmsubmit: false });
    await this.props.getStudDet(this.state.studid);
    if (this.props.student.masuser.fregno === "") return;
    await this.setState({ fregno: this.props.student.masuser.fregno });
    await this.props.getSubject(this.state.fregno);
    this.setState({ frmsubmit: true });
  };

  handleChange = (e, data) => {
    switch (data.activeIndex) {
      case 0:
        this.props.getSubject(this.state.fregno);
        return;
      case 1:
        this.props.getExamApps(this.state.fregno);
        return;
      case 2:
        this.props.getIAMarks(this.state.fregno);
        return;
      default:
        return;
    }
  };

  renderForm = () => {
    const wheight = wHeight();
    const frmsubmit = this.state.frmsubmit;
    // examApp
    const panes = [
      {
        menuItem: { key: "Subjects", icon: "users", content: "Subjects" },
        render: () => (
          <Tab.Pane>
            <CurExamSubject subjects={this.props.student.subject} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Exam Applications",
        render: () => (
          <Tab.Pane>
            <ExamApps examapps={this.props.student.examApp} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "IA Marks",
        render: () => (
          <Tab.Pane>
            <IAMarks iamarks={this.props.student.iamarks} />
          </Tab.Pane>
        )
      }
    ];

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header style={{ display: "flex" }}>
            <h3>Student Information</h3>
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
          <Divider />
          <Card.Description
            style={{ height: `${wheight}px`, overflowY: "auto" }}
          >
            <div className="col-md-3">
              <Form>
                <Form.Field>
                  <label>Mobile No. / Reg. No.</label>
                  <Input
                    type="text"
                    placeholder="Mobile No. / Reg. No."
                    id="studid"
                    value={this.state.studid}
                    onChange={evt => this.getStudentDet(evt)}
                  />
                </Form.Field>
                <Button color="blue" onClick={this.getStudent}>
                  Submit
                </Button>
              </Form>
            </div>

            {frmsubmit ? (
              <div>
                <StudInfoDisplay studet={this.props.student} />
                <Tab
                  // menu={{ fluid: true, vertical: true }}
                  // menuPosition="left"
                  panes={panes}
                  renderActiveOnly={true}
                  onTabChange={this.handleChange}
                />
              </div>
            ) : null}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  };

  render() {
    // console.log(this.props.studentInfo);
    return this.renderForm();
  }
}

const mapStateToProps = state => {
  return {
    student: state.studentInfo
  };
};
export default connect(
  mapStateToProps,
  { getStudDet, getSubject, getExamApps, getIAMarks }
)(Student);
