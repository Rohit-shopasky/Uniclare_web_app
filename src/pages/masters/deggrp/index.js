import React, { Component } from "react";
import { Card, Divider, Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchDegGrp, showError } from "../../../actions";
import {
  getDegreeGroupDegree,
  saveDeggrpDegrees
} from "../../../actions/masters/degreeGroup";

import { Link } from "react-router-dom";
import { wHeight } from "../../parms";
import DegreeGroupForm from "./deggrpForm";
import DegreeSelect from "./degreeSelect";
import { ReportAPI } from "../../../apis/consts";

class DegreeGroup extends Component {
  state = {
    deggroup: [
      {
        fdeggrp: "",
        fdescpn: "",
        fyear: "",
        ftype: "",
        fexamdate: "",
        fdeleted: false
      }
    ],
    error: false,
    errorMessage: "",
    del_deggrp: [],
    frmsubmit: false,
    fdeggrp: ""
  };

  setDeggrp = data => {
    this.setState({ fdeggrp: data });
  };

  handleReport = () => {
    if (this.state.fdeggrp === "") {
      const error = { header: "Error", content: "Degree Group required" };
      this.props.showError(error);
      return;
    }
    window.open(
      ReportAPI +
        "degreeGroupReport&univcode=" +
        this.props.univcode +
        "&fdeggrp=" +
        this.state.fdeggrp,
      "_blank"
    );
  };

  handleSave = async () => {
    await this.props.saveDeggrpDegrees(this.dgform.state.deggrp);
    this.setState({ frmsubmit: false });
  };

  handleCancel = () => {
    this.setState({ frmsubmit: false });
    this.dgform.handleCancel();
  };

  getDegreeSelect = async () => {
    if (this.state.fdeggrp === "") {
      const error = { header: "Error", content: "Degree Group required" };
      this.props.showError(error);
      return;
    }

    await this.props.getDegreeGroupDegree(this.state.fdeggrp);
    this.setState({ frmsubmit: true });
  };

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h4>Degree Group</h4>
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
            onClick={this.handleCancel}
            color="black"
            icon="ban"
            content="Cancel"
          />
          <Button
            basic
            color="blue"
            content="Report"
            icon="file"
            onClick={this.handleReport}
          />
          <Link to="/dashboard">
            <Button basic color="red" content="Exit" icon="home" />
          </Link>
        </div>
      </Card.Header>
    );
  };

  render() {
    const { frmsubmit } = this.state;

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
              <div className="col-md-8">
                <Form>
                  <DegreeGroupForm
                    disabled={frmsubmit}
                    onRef={ref => (this.dgform = ref)}
                    changeDeggrp={this.setDeggrp}
                    getDegrees={this.getDegreeSelect}
                  />
                </Form>
              </div>
              <Divider />
              {frmsubmit ? <DegreeSelect /> : null}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    saveDeggrp: state.saveDeggrp,
    univcode: state.user.fcuruniv
  };
};

export default connect(
  mapStateToProps,
  {
    saveDeggrpDegrees,
    fetchDegGrp,
    showError,
    getDegreeGroupDegree
  }
)(DegreeGroup);
