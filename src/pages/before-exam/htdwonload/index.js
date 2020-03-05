import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Divider, Button, Form, Dropdown } from "semantic-ui-react";
import DegreeGroupWithYearType from "../../common/degreeGroupWithYearType";
import { showError } from "../../../actions";
import { fetchHTDwonloadCnt } from "../../../actions/before-exam/htdwonload";
// import { HTCntTable } from './HTCntTable';
import HTCntTable from "./HTCntTable";

class HTCount extends Component {
  state = {
    fdeggrp: "",
    frmSubmit: false,
    frtype: ""
  };

  // changeDeggrp = data => {
  //   console.log(data);
  //   this.setState({ fdeggrp: data });
  // };

  changeRType = (e, data) => {
    this.setState({ frtype: data.value });
  };

  getPrBatchdet = () => {
    const { fdeggrp, frtype } = this.state;
    // if (fdeggrp == "") {
    //   const error = { header: "Error", content: "Degree Group required." };
    //   this.props.showError(error);
    //   return;
    // }

    if (frtype == "") {
      const error = { header: "Error", content: "Select Report Type" };
      this.props.showError(error);
      return;
    }
    this.setState({ frmSubmit: true });
    this.props.fetchHTDwonloadCnt(frtype);
  };
  handleCancel = () => {
    this.setState({ fdeggrp: "", frmSubmit: false, frtype: "" });
  };

  render() {
    let tablewidth = "col-md-12";
    const rtype = [
      {
        key: "Summary",
        text: "Summary",
        value: "Summary"
      },
      {
        key: "Collegewise",
        text: "Collegewise",
        value: "Collegewise"
      },
      {
        key: "Degreewise",
        text: "Degreewise",
        value: "Degreewise"
      }
    ];

    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Hall Ticket Download Status</h4>
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
            <Card.Description style={{ overflowY: "auto", height: "72vh" }}>
              <div className="col-md-12">
                <Form>
                  {/* <DegreeGroupWithYearType changeDeggrp={this.changeDeggrp} frmDeggrp={this.state.fdeggrp} /> */}

                  <Form.Field width={8}>
                    <label>Report Type</label>
                    <Dropdown
                      placeholder="Report Type"
                      fluid
                      search
                      selection
                      options={rtype}
                      value={this.state.frtype}
                      onChange={this.changeRType}
                    />
                  </Form.Field>

                  <Button color="blue" onClick={this.getPrBatchdet}>
                    Submit
                  </Button>
                </Form>
              </div>
              <div className="ui mini form" style={{ fontSize: "1.1536em" }}>
                {this.state.frmSubmit ? (
                  <HTCntTable type={this.state.frtype} wclass={tablewidth} />
                ) : null}
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { HTCnt: state.HTCnt };
};
export default connect(
  mapStateToProps,
  { showError, fetchHTDwonloadCnt }
)(HTCount);
