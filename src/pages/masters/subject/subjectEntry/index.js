import React, { Component } from "react";
import {
  Card,
  Button,
  Form,
  Dropdown,
  Divider,
  Checkbox,
  Grid
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchDegrees,
  showError,
  getExamNo,
  fetchBoards
} from "../../../../actions";
import {
  changeSubDet,
  getSubDet,
  getSubjectDet,
  saveSubDet,
  cancelDet
} from "../../../../actions/masters/subEntryScrn";
import InputMask from "react-input-mask";
import SubjectDet from "./subjectDet";

class SubjectEntry extends Component {
  state = {
    fsubject: "",
    SubjectOpt: [],
    Disable: false,
    fltp: "",
    fssubcodeDis: true
  };

  componentDidMount = async () => {
    await this.props.fetchDegrees(this.props.user.fdeggrp);
    await this.props.getExamNo();
  };

  componentDidUpdate = prevProps => {
    if (this.props.getSubjects !== prevProps.getSubjects) {
      this.setState({ SubjectOpt: this.props.getSubjects });
    }
  };

  handleMaskChange = async e => {
    this.setState({ fltp: e.target.value }, () =>
      this.props.changeSubDet("fltp", this.state.fltp)
    );
  };

  handleChange = async (_, { name, value }) => {
    await this.props.changeSubDet(name, value);

    if (
      name == "fexamno" ||
      (name == "fdegree" && this.props.subjectData.mainlvl.fexamno != "")
    ) {
      await this.props.getSubDet();
      await this.props.fetchBoards();
    }
  };

  handleSubjects = async (_, { name, value }) => {
    const fsubject = this.state.SubjectOpt.filter((el, i) => {
      return el.fsubcode == value.toUpperCase();
    })[0];

    if (fsubject != undefined) {
      await this.props.changeSubDet(name, value);
      await this.props.getSubjectDet(value);
      this.setState({ Disable: true });
    }
  };
  handleAddition = async (_, data) => {
    var { name, value } = data;
    const error = {
      header: "Error",
      content: "Subject code can only have 4 characters."
    };

    value.length > 4
      ? this.props.showError(error)
      : await this.setState(
          {
            SubjectOpt: [...this.state.SubjectOpt, { fsubcode: value }]
          },
          this.props.changeSubDet(name, value)
        );

    if (this.props.subjectData.sublvl[0]["fssubcode"] == "")
      this.setState({ fssubcodeDis: false });
    // this.setState({ degDisable: true });
    // this.setState({ newData: true });
  };

  handleChangedata = (e, data) =>
    this.props.changeSubDet(data.name, data.value);

  handleChekbox = (e, data) => {
    const value = data.checked ? "T" : "F";
    this.props.changeSubDet(data.name, value);
  };

  handleSave = async () => {
    const data = this.props.subjectData.mainlvl;
    var error = "";
    if (data.fdegree == "" || data.fexamno == "") {
      error = {
        header: "Error",
        content: "Please select Degree and Exam No."
      };
    }
    if (data.fsubcode == "" || data.fsubname == "") {
      error = {
        header: "Error",
        content: "Subject Code or Subject Name cannot be empty."
      };
    }
    if (data.fboard == "") {
      error = {
        header: "Error",
        content: "Please select Board."
      };
    }

    return (
      error != ""
        ? await this.props.showError(error)
        : await this.props.saveSubDet(),
      this.setState({ Disable: false })
    );

    // this.props.saveSubDet();
  };

  cancel = () => {
    this.props.cancelDet();
    this.setState({ Disable: false });
  };

  render() {
    const ExamNoOpt = this.props.ExamNoDet;
    const DegreeOpt = this.props.degrees;
    const SubjectOpt = this.state.SubjectOpt;
    const Mainlvl = this.props.subjectData.mainlvl;
    const fboardOpt = this.props.board;
    const formatChars = {
      n: "[0-9]",
      m: "[0-9]",
      e: "[0-9]",
      d: "[0-9]",
      z: "[0-9]",
      y: "[0-9]"
    };

    return (
      <>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h3>Subject Entry</h3>
              <div className="ml-auto">
                <Button
                  basic
                  color="green"
                  content="Save"
                  onClick={this.handleSave}
                  icon="upload"
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
                <Grid columns="three" divided className="mt-3">
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <Form.Group style={{ marginBottom: "1em" }}>
                        <Form.Field>
                          <label>Degree</label>
                          <Dropdown
                            search
                            placeholder="Degrees"
                            selection
                            options={DegreeOpt.map((el, i) => {
                              return {
                                key: i,
                                value: el.fdegree,
                                text: `${el.fdegree}`
                              };
                            })}
                            name="fdegree"
                            value={Mainlvl.fdegree}
                            onChange={this.handleChange}
                            disabled={this.state.Disable}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Exam No.</label>
                          <Dropdown
                            placeholder="Exam No."
                            search
                            selection
                            id="fexamno"
                            name="fexamno"
                            value={Mainlvl.fexamno}
                            options={ExamNoOpt.map((el, i) => {
                              return {
                                key: i,
                                value: el.fexamno,
                                text: `${el.fexamname}`
                              };
                            })}
                            onChange={this.handleChange}
                            disabled={this.state.Disable}
                          />
                        </Form.Field>
                      </Form.Group>
                      <Form.Group style={{ marginBottom: "1em" }}>
                        <Form.Field width={8}>
                          <label>Subject Code</label>
                          <Dropdown
                            placeholder="Select Subject Code"
                            search
                            selection
                            allowAdditions
                            openOnFocus={false}
                            selectOnBlur={false}
                            onAddItem={this.handleAddition}
                            id="fsubject"
                            name="fsubcode"
                            value={Mainlvl.fsubcode}
                            options={SubjectOpt.map((el, i) => {
                              return {
                                key: i,
                                value: el.fsubcode,
                                text: `${el.fsubcode}`
                              };
                            })}
                            onChange={this.handleSubjects}
                            disabled={this.state.Disable}
                          />
                        </Form.Field>
                        <Form.Field width={8}>
                          <Form.Input
                            placeholder="Short Name"
                            value={Mainlvl.fsubshort}
                            label="Subject Short Name"
                            name="fsubshort"
                            onChange={this.handleChangedata}
                          />
                        </Form.Field>
                      </Form.Group>
                      <Form.Field>
                        <Form.Input
                          placeholder="Subject Name"
                          value={Mainlvl.fsubname}
                          label="Subject Name"
                          name="fsubname"
                          onChange={this.handleChangedata}
                        />
                      </Form.Field>
                      <Form.Group style={{ marginBottom: "1em" }}>
                        <Form.Field width={8}>
                          <Form.Input
                            placeholder="Maximum Marks"
                            value={Mainlvl.fmaxmarks}
                            label="Maximum Marks"
                            name="fmaxmarks"
                            onChange={this.handleChangedata}
                          />
                        </Form.Field>
                        <Form.Field width={8}>
                          <Form.Input
                            placeholder="Minimum Marks"
                            value={Mainlvl.fminmarks}
                            label="Minimum Marks"
                            name="fminmarks"
                            onChange={this.handleChangedata}
                          />
                        </Form.Field>
                      </Form.Group>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <Form.Field>
                        <Form.Input
                          placeholder="Subject Name for Marks Card"
                          value={Mainlvl.fmarkdesc1}
                          label="Subject Name for Marks Card"
                          name="fmarkdesc1"
                          onChange={this.handleChangedata}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Form.Input
                          placeholder="FMARKDESC2"
                          value={Mainlvl.fmarkdesc2}
                          // label=""
                          maxLength="50"
                          name="fmarkdesc2"
                          onChange={this.handleChangedata}
                        />
                      </Form.Field>
                      <Form.Group style={{ marginBottom: "1em" }}>
                        <Form.Field width={8}>
                          <Form.Input
                            placeholder="Theory Exam Marks"
                            value={Mainlvl.ftheorymin}
                            label="Th. Exam Marks"
                            name="ftheorymin"
                            onChange={this.handleChangedata}
                          />
                        </Form.Field>
                        <Form.Field width={8}>
                          <Form.Input
                            placeholder="Practical Exam Marks"
                            value={Mainlvl.fpractmin}
                            label="Pr. Exam Marks"
                            name="fpractmin"
                            onChange={this.handleChangedata}
                          />
                        </Form.Field>
                      </Form.Group>
                      <Form.Group style={{ marginBottom: "1em" }}>
                        <Form.Field width={5}>
                          <Form.Input
                            placeholder="Credits"
                            value={Mainlvl.fcredits}
                            label="Credits"
                            name="fcredits"
                            onChange={this.handleChangedata}
                          />
                        </Form.Field>
                        <Form.Field width={6}>
                          <Form.Input
                            placeholder="Th. Credits"
                            value={Mainlvl.fthcr}
                            label="Th. Credits"
                            name="fthcr"
                            onChange={this.handleChangedata}
                          />
                        </Form.Field>
                        <Form.Field width={5}>
                          <Form.Input
                            placeholder="Pr. Credits"
                            value={Mainlvl.fprcr}
                            label="Pr. Credits"
                            name="fprcr"
                            onChange={this.handleChangedata}
                          />
                        </Form.Field>
                      </Form.Group>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <Form.Group style={{ marginBottom: "1em" }}>
                        <Form.Field>
                          <Form.Input
                            placeholder="Departmen Code"
                            value={Mainlvl.fdeptcode}
                            label="Departmen Code"
                            name="fdeptcode"
                            onChange={this.handleChangedata}
                          />
                        </Form.Field>
                        <Form.Field>
                          <Form.Input
                            placeholder="Carry Upto"
                            value={Mainlvl.fcarryupto}
                            label="Carry Upto"
                            name="fcarryupto"
                            onChange={this.handleChangedata}
                          />
                        </Form.Field>
                      </Form.Group>
                      <Form.Group style={{ marginBottom: "1em" }}>
                        <Form.Field width={9}>
                          <label> L /T /P </label>
                          <InputMask
                            type="text"
                            formatChars={formatChars}
                            mask="e:e:e"
                            placeholder="L:T:P"
                            name="fltp"
                            value={Mainlvl.fltp}
                            onChange={this.handleMaskChange}
                          />
                          {/* <Form.Input
                            placeholder="L / T / P"
                            value={Mainlvl.fltp}
                            label="L / T / P"
                            name="fltp"
                            onChange={this.handleChangedata}
                          /> */}
                        </Form.Field>
                        <Form.Field width={7}>
                          <Form.Input
                            placeholder="Block No."
                            value={Mainlvl.fblockno}
                            label="Block No."
                            name="fblockno"
                            onChange={this.handleChangedata}
                          />
                        </Form.Field>
                      </Form.Group>
                      {/* style={{ marginTop: "10%" }} */}
                      <Grid.Row style={{ padding: "1rem" }}>
                        <Grid.Column>
                          <Form.Group>
                            <Form.Field width={8}>
                              <label>Board</label>
                              <Dropdown
                                search
                                selection
                                value={Mainlvl.fboard}
                                name="fboard"
                                options={fboardOpt.map((el, i) => {
                                  return {
                                    key: i,
                                    value: el.fboardcode,
                                    text: `${el.fboardname}`
                                  };
                                })}
                                onChange={this.handleChangedata}
                              />
                            </Form.Field>
                          </Form.Group>
                        </Grid.Column>
                        <Grid.Column style={{ marginLeft: "1rem" }}>
                          <Form.Field
                            control={Checkbox}
                            label="Mandatory"
                            value={Mainlvl.fmandatory}
                            name="fmandatory"
                            checked={Mainlvl.fmandatory == "T" ? true : false}
                            onChange={this.handleChekbox}
                          />
                          <Form.Field
                            control={Checkbox}
                            label="Subsidary"
                            value={Mainlvl.fsubsidary}
                            name="fsubsidary"
                            checked={Mainlvl.fsubsidary == "T" ? true : false}
                            onChange={this.handleChekbox}
                          />
                          <Form.Field
                            control={Checkbox}
                            label="Suspended"
                            value={Mainlvl.fsuspend}
                            name="fsuspend"
                            checked={Mainlvl.fsuspend == "T" ? true : false}
                            onChange={this.handleChekbox}
                          />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
              <SubjectDet disabledStats={this.state.fssubcodeDis} />
            </Card.Description>
          </Card.Content>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    degrees: state.degrees,
    board: state.board,
    ExamNoDet: state.getExmNo,
    getSubjects: state.getSubjects,
    subjectData: state.subjectData
  };
};
export default connect(
  mapStateToProps,
  {
    fetchDegrees,
    showError,
    getExamNo,
    changeSubDet,
    getSubDet,
    getSubjectDet,
    saveSubDet,
    fetchBoards,
    cancelDet
  }
)(SubjectEntry);
