import React, { Component } from "react";
import { Modal, Button, Dropdown } from "semantic-ui-react";
import { ReportAPI } from "../../apis/consts";
//import axios from 'axios';

class ReportModal extends Component {
  state = {
    rttype: ""
  };

  setReportType = (e, data) => {
    this.setState({ rttype: data.value });
  };

  GenerateReoprt = () => {
    switch (this.props.screen) {
      case "examcenter": {
        if (this.state.rttype === "ECL") {
          window.location =
            ReportAPI +
            "getCenterList&univcode=041&deggrp=" +
            this.props.deggrp;
        }

        if (this.state.rttype === "ECT") {
          window.location =
            ReportAPI +
            "getCntWiseColgList&univcode=041&deggrp=" +
            this.props.deggrp;
        }
        break;
      }
      case "qpindent": {
        if (this.state.rttype === "Total Indent")
          window.location =
            ReportAPI +
            "getqpIndentReport&univcode=041&dgp=" +
            this.props.deggrp +
            "&rt=" +
            this.state.rttype +
            "&rf=" +
            this.props.rftype +
            "&rd=" +
            true;

        if (this.state.rttype === "Answer Book Indent")
          window.location =
            ReportAPI +
            "getqpIndentReport&univcode=041&dgp=" +
            this.props.deggrp +
            "&rt=" +
            this.state.rttype +
            "&rf=" +
            this.props.rftype;

        if (this.state.rttype === "Centrewise Indent")
          window.location =
            ReportAPI +
            "getqpIndentReport&univcode=041&dgp=" +
            this.props.deggrp +
            "&rt=" +
            this.state.rttype +
            "&rf=" +
            this.props.rftype;
        break;
      }
      default:
        break;
    }
  };

  render() {
    return (
      <Modal
        style={{ height: "50%", top: "10%", left: "20%", right: "20%" }}
        dimmer={this.props.dimmer}
        open={this.props.open}
        onClose={this.props.close}
      >
        <Modal.Header style={{ display: "flex" }}>
          {this.props.report} Report
          <div className="ml-auto">
            <Button.Group>
              <Button
                size="mini"
                basic
                color="blue"
                content="Generate"
                onClick={this.GenerateReoprt}
                icon="file pdf outline"
              />
              <Button
                size="mini"
                basic
                color="black"
                icon="ban"
                onClick={this.props.close}
                content="Cancel"
              />
            </Button.Group>
          </div>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            Report Type :{" "}
            <Dropdown
              placeholder="Report"
              search
              selection
              options={this.props.report_options}
              onChange={this.setReportType}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default ReportModal;
