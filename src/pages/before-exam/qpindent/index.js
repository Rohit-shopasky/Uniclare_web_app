import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Divider,
  Form,
  Button,
  Radio,
  Dropdown
} from "semantic-ui-react";
import { connect } from "react-redux";
import { ReportAPI } from "../../../apis/consts";
import { showError, compileQpIndent } from "../../../actions";
import { wHeight } from "../../parms";
class Centres extends Component {
  state = {
    rtype: "",
    rftype: "PDF Format",
    funivcopy: ""
  };

  handleChange = (e, data) => {
    switch (data.type) {
      case "text":
        this.setState({ [data.name]: data.value });
        return;
      case "radio":
        this.setState({ [data.name]: data.value });
        return;
      case "checkbox":
        this.setState({ [data.name]: data.checked });
        return;
      default:
        this.setState({ [data.name]: data.value });
        return;
    }
  };

  handleReport = () => {
    const { rtype, rftype, funivcopy, freset } = this.state;

    const fdeggrp = this.props.user.fdeggrp;

    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }
    if (rtype === "") {
      const error = { header: "Error", content: "Select Report Type" };
      this.props.showError(error);
      return;
    }
    if (funivcopy === "") {
      const error = {
        header: "Error",
        content: "Enter No. of University copies required"
      };
      this.props.showError(error);
      return;
    }

    window.open(
      ReportAPI +
        "getqpIndentReport&univcode=" +
        this.props.univcode +
        "&dgp=" +
        fdeggrp +
        "&rt=" +
        rtype +
        "&rf=" +
        rftype,
      "_blank"
    );
  };

  handleCancel = () => {
    this.setState({
      rtype: "",
      rftype: "PDF Format",
      funivcopy: ""
    });
  };

  render() {
    const { rftype, funivcopy, freset } = this.state;

    const report_options = [
      { key: "Total Indent", value: "Total Indent", text: "Total Indent" },
      {
        key: "Answer Book Indent",
        value: "Answer Book Indent",
        text: "Answer Book Indent"
      },
      {
        key: "Centrewise Indent",
        value: "Centrewise Indent",
        text: "Centrewise Indent"
      }
    ];
    const wheight = wHeight();

    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>QP Indent Report</h4>
              <div className="ml-auto">
                <Button
                  basic
                  color="blue"
                  onClick={this.handleReport}
                  content="Report"
                  icon="file"
                />
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
              style={{ overflowY: "auto", height: `${wheight}px` }}
            >
              <div className="col-md-8 col-lg-6 col-sm-12">
                <Form>
                  <Form.Group>
                    <Form.Field width={8}>
                      <label>Report Type</label>
                      <Dropdown
                        placeholder="Report"
                        search
                        selection
                        name="rtype"
                        options={report_options}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Input
                      placeholder="University Copies"
                      width={8}
                      onChange={this.handleChange}
                      label="University Copies"
                      name="funivcopy"
                      value={funivcopy}
                    />
                  </Form.Group>

                  <Form.Group inline>
                    <Form.Field
                      control={Radio}
                      name="rftype"
                      label="PDF"
                      value="PDF Format"
                      checked={rftype === "PDF Format"}
                      onChange={this.handleChange}
                    />
                    <Form.Field
                      control={Radio}
                      name="rftype"
                      label="EXCEL"
                      value="Excel Format"
                      checked={rftype === "Excel Format"}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Button color="blue" onClick={this.props.compileQpIndent}>
                    Compile
                  </Button>
                </Form>
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    univcode: state.univ.funivcode,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {
    showError,
    compileQpIndent
  }
)(Centres);
