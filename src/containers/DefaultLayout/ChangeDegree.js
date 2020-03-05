import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Form, Dropdown, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import ControlModal from "./controlModal";

import { wHeight } from "../../pages/parms/";

class ChangeDegree extends Component {
  state = {
    frmDeggrp: "",
    reportType: "Active College List",
    displayTbl: false
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
        <h3>College</h3>
        <div className="ml-auto">
          <Button basic color="blue" content="Report" icon="file" />
          <Button basic color="black" icon="ban" content="Cancel" />
          <Link to="/dashboard">
            <Button basic color="red" content="Exit" icon="home" />
          </Link>
        </div>
      </Card.Header>
    );
  };

  renderForm = () => {
    const { displayTbl, reportType } = this.state;

    const reporttypeOptions = [
      { value: "Active College List", text: "Active colleges" },
      { value: "Center College List", text: "Center List" },
      { value: "Center List With Tagged Colleges", text: "Tagged colleges" }
    ];
    const wheight = wHeight();
    console.log(reportType, displayTbl);
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Description
              style={{ overflowY: "auto", height: `${wheight}px` }}
            >
              <ControlModal open={true} />
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  };
  render() {
    // console.log("collegeReport",this.props.collegeReport);
    return this.renderForm();
  }
}

const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  {}
)(ChangeDegree);
