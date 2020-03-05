import React, { Component } from "react";
import { Card, Button, Form, Dropdown, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchDegrees, showError, fetchFaculty } from "../../../../actions";
import {
  getDegreeDet,
  changeDegDet,
  saveDegree,
  cancelDegreeDet
} from "../../../../actions/masters/DegEntryScrn";
import DisplaySemester from "./ displySem";
import { ReportAPI } from "../../../../apis/consts";
import { wHeight } from "../../../parms";
import { stringify } from "querystring";

class Degree extends Component {
  state = {
    degreeOpt: [],
    degDisable: false,
    ffacultyChanged: true
  };

  componentDidMount = async () => {
    await this.props.fetchFaculty();
    await this.props.fetchDegrees(this.props.user.fdeggrp);
  };

  componentDidUpdate = prevProps => {
    if (this.props.degrees !== prevProps.degrees) {
      this.setState({ degreeOpt: this.props.degrees });
    }
  };

  cancel = () => {
    this.props.cancelDegreeDet();
    this.setState({ degDisable: false });
  };

  handleChange = async (e, data) => {
    const fdegree = this.state.degreeOpt.filter((el, i) => {
      return el.fdegree == data.value.toUpperCase();
    })[0];

    if (fdegree != undefined) {
      await this.props.getDegreeDet(data.value);
      this.setState({ degDisable: true });
    }
  };

  handleAddition = async (e, data) => {
    var { name, value } = data;
    this.setState({
      degreeOpt: [...this.state.degreeOpt, { fdegree: value, fdescpn: "" }]
    });
    await this.props.changeDegDet(name, value);
    this.setState({ degDisable: true });
    this.setState({ newData: true });
  };

  handleChangedata = (e, data) => {
    this.props.changeDegDet(data.name, data.value);
    if (data.name == "ffaculty") {
      this.setState({ ffacultyChanged: false });
    }
  };

  handleSave = async () => {
    // if (this.state.ffacultyChanged) {
    //   console.log("SAVE", this.props.DegreeDet, this.state.ffacultyChanged);

    //   const error = {
    //     header: "Error",
    //     content: "Please select Faculty details"
    //   };
    //   this.props.showError(error);
    // }
    const DegreeDet = this.props.DegreeDet.DegDet;
    const SemDet = this.props.DegreeDet.SemDet;

    // if (this.state.newData) {
    //validations
    if (DegreeDet.fdescpn == "") {
      const error = {
        header: "Error",
        content: "Please enter Degree Despcription."
      };
      this.props.showError(error);
      return;
    }
    if (DegreeDet.ffaculty == "") {
      const error = {
        header: "Error",
        content: "Please enter Faculty Details."
      };
      this.props.showError(error);
      return;
    }
    if (DegreeDet.fdeggrp == "") {
      const error = {
        header: "Error",
        content: "Please enter Degree Groups."
      };
      this.props.showError(error);
      return;
    }
    if (DegreeDet.fadyear == "") {
      const error = {
        header: "Error",
        content: "Please enter Admission Year."
      };
      this.props.showError(error);
      return;
    }
    if (DegreeDet.fadexamtyp == "") {
      const error = {
        header: "Error",
        content: "Please enter Admission Type."
      };
      this.props.showError(error);
      return;
    }
    if (DegreeDet.fmeyear == "") {
      const error = { header: "Error", content: "Please enter Exam Year." };
      this.props.showError(error);
      return;
    }
    if (DegreeDet.fmeexamtyp == "") {
      const error = { header: "Error", content: "Please enter Exam Type." };
      this.props.showError(error);
      return;
    }
    // if (DegreeDet.feligrem01 == "") {
    //   const error = {
    //     header: "Error",
    //     content: "Please enter Eligibility, atleast one."
    //   };
    //   this.props.showError(error);
    //   return;
    // }
    if (DegreeDet.fexamdate == "") {
      const error = { header: "Error", content: "Please enter Exam date." };
      this.props.showError(error);
      return;
    }
    if (SemDet.fexamname == "") {
      const error = { header: "Error", content: "Please enter Exam Name." };
      this.props.showError(error);
      return;
    }
    if (SemDet.fexamno == "") {
      const error = { header: "Error", content: "Please enter Exam No." };
      this.props.showError(error);
      return;
    }
    if (SemDet.ftotsub == "") {
      const error = {
        header: "Error",
        content: "Please enter Total no. of subjects."
      };
      this.props.showError(error);
      return;
    }

    await this.props.saveDegree();
    // } else await this.props.saveDegree();

    this.setState({ degDisable: false });
  };

  handleReport = () => {
    window.open(
      ReportAPI +
        "degreeEtryRprt" +
        "&univcode=" +
        this.props.univcode +
        "&fdegree=" +
        this.props.DegreeDet.DegDet.fdegree +
        "&fdeggrp=" +
        this.props.DegreeDet.DegDet.fdeggrp,
      "_blank"
    );
    // "&DegreeDet=" +
    // JSON.stringify(this.props.DegreeDet);
  };

  render() {
    const deggrpOpt = this.props.fdeggrp;
    const ffacultyOpt = this.props.ffaculty;
    const degreeOpt = this.state.degreeOpt;
    const DegreeDet = this.props.DegreeDet.DegDet;

    var years = [];
    for (var j = 2019; j > 2000; j--) {
      years.push({ key: j, value: j, text: j });
    }
    const wheight = wHeight();
    return (
      <>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h3>Degree </h3>
              <div className="ml-auto">
                <Button
                  basic
                  color="green"
                  content="Save"
                  onClick={this.handleSave}
                  icon="save"
                />
                <Button
                  basic
                  onClick={this.handleReport}
                  color="blue"
                  icon="file"
                  content="Report"
                />
                <Button
                  basic
                  onClick={this.cancel}
                  color="black"
                  icon="times circle"
                  content="Cancel"
                />
                <Link to="/dashboard">
                  <Button basic color="red" content="Exit" icon="home" />
                </Link>
              </div>
            </Card.Header>
            <Divider />
            <Card.Description>
              <Form>
                <Form.Group>
                  <Form.Field width={4}>
                    <label>Degree </label>
                    <Dropdown
                      size="mini"
                      search
                      selection
                      placeholder="Select Degree"
                      openOnFocus={false}
                      selectOnBlur={false}
                      searchInput={{ autoFocus: true }}
                      allowAdditions
                      name="fdegree"
                      value={DegreeDet.fdegree}
                      options={degreeOpt.map((el, i) => {
                        return {
                          key: i,
                          value: el.fdegree,
                          text: `${el.fdegree}`
                        };
                      })}
                      onAddItem={this.handleAddition}
                      onChange={this.handleChange}
                      disabled={this.state.degDisable}
                    />
                  </Form.Field>
                  <Form.Field width={8}>
                    <Form.Input
                      placeholder="Degree Description"
                      value={DegreeDet.fdescpn}
                      label="Description"
                      name="fdescpn"
                      onChange={this.handleChangedata}
                    />
                  </Form.Field>
                  <Form.Field width={4}>
                    <label>Faculty </label>
                    <Dropdown
                      search
                      selection
                      placeholder="Select Faculty"
                      value={DegreeDet.ffaculty}
                      label="Faculty"
                      name="ffaculty"
                      options={ffacultyOpt.map((el, i) => {
                        return {
                          key: i,
                          value: el.ffacdesc,
                          text: `${el.ffacdesc}`
                        };
                      })}
                      onChange={this.handleChangedata}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={4}>
                    <label>Degree Group</label>
                    <Dropdown
                      search
                      selection
                      placeholder="Select Degree Group"
                      value={DegreeDet.fdeggrp}
                      label="Degree Groups"
                      name="fdeggrp"
                      options={deggrpOpt.map((el, i) => {
                        return {
                          key: i,
                          value: el.fdeggrp,
                          text: `${el.fdeggrp}`
                        };
                      })}
                      onChange={this.handleChangedata}
                    />
                  </Form.Field>
                  <Form.Field width={2}>
                    <Form.Input
                      placeholder="Admission Year"
                      value={DegreeDet.fadyear}
                      label="Admission Year"
                      name="fadyear"
                      maxLength="4"
                      onChange={this.handleChangedata}
                    />
                  </Form.Field>
                  <Form.Field width={2}>
                    <Form.Input
                      label="Type"
                      placeholder="Admission Type"
                      value={DegreeDet.fadexamtyp}
                      name="fadexamtyp"
                      onChange={this.handleChangedata}
                    />
                  </Form.Field>

                  <Form.Field width={2}>
                    <Form.Input
                      placeholder="Exam Year"
                      value={DegreeDet.fmeyear}
                      label="Exam Year"
                      maxLength="4"
                      name="fmeyear"
                      onChange={this.handleChangedata}
                    />
                  </Form.Field>

                  <Form.Field width={2}>
                    <Form.Input
                      label="Type"
                      placeholder="Exam Type"
                      value={DegreeDet.fmeexamtyp}
                      name="fmeexamtyp"
                      onChange={this.handleChangedata}
                    />
                  </Form.Field>
                  <Form.Field width={4}>
                    <label> Exam Date </label>
                    <Form.Input
                      type="text"
                      placeholder="Exam Date"
                      name="fexamdate"
                      value={DegreeDet.fexamdate}
                      onChange={this.handleChangedata}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={6}>
                    <Form.TextArea
                      label="Eligibility Details 1"
                      placeholder="Eligibility1"
                      value={DegreeDet.feligrem01}
                      name="feligrem01"
                      onChange={this.handleChangedata}
                    />
                  </Form.Field>
                  <Form.Field width={6}>
                    <Form.TextArea
                      label="Eligibility Details 2"
                      placeholder="Eligibility2"
                      value={DegreeDet.feligrem02}
                      // style={{ marginTop: "1.6em" }}
                      name="feligrem02"
                      onChange={this.handleChangedata}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={4}>
                    <label> RV Application Fee </label>
                    <Form.Input
                      type="text"
                      placeholder="RV Fee"
                      name="frvappfee"
                      value={DegreeDet.frvappfee}
                      onChange={this.handleChangedata}
                    />
                  </Form.Field>
                  <Form.Field width={4}>
                    <label> Photocopy Application Fee </label>
                    <Form.Input
                      type="text"
                      placeholder="PC Fee"
                      name="fxrappfee"
                      value={DegreeDet.fxrappfee}
                      onChange={this.handleChangedata}
                    />
                  </Form.Field>
                  <Form.Field width={4}>
                    <label> RV Application Fine </label>
                    <Form.Input
                      type="text"
                      placeholder="RV Fine"
                      name="frvappfine"
                      value={DegreeDet.frvappfine}
                      onChange={this.handleChangedata}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group inline>
                  <Form.Field width={4}>
                    <label>Admission Degree</label>
                    <Form.Radio
                      label="Yes"
                      value="T"
                      name="fadmdeg"
                      checked={DegreeDet.fadmdeg == "T"}
                      onChange={this.handleChangedata}
                    />
                    <Form.Radio
                      label="No"
                      value="F"
                      name="fadmdeg"
                      checked={DegreeDet.fadmdeg == "F"}
                      onChange={this.handleChangedata}
                    />
                  </Form.Field>
                  <Form.Field width={4}>
                    <label>Result Hold</label>
                    <Form.Radio
                      label="Yes"
                      value="T"
                      name="freshold"
                      checked={DegreeDet.freshold == "T"}
                      onChange={this.handleChangedata}
                    />
                    <Form.Radio
                      label="No"
                      value="F"
                      name="freshold"
                      checked={DegreeDet.freshold == "F"}
                      onChange={this.handleChangedata}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
              <DisplaySemester />
            </Card.Description>
          </Card.Content>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    fdeggrp: state.deggrp,
    user: state.user,
    degrees: state.degrees,
    ffaculty: state.getFaculty,
    DegreeDet: state.getDegreeDet,
    univcode: state.univ.funivcode
  };
};
export default connect(
  mapStateToProps,
  {
    fetchDegrees,
    showError,
    fetchFaculty,
    getDegreeDet,
    changeDegDet,
    saveDegree,
    cancelDegreeDet
  }
)(Degree);
