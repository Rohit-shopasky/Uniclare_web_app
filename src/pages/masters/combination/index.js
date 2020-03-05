import React from "react";
import { Card, Button, Form, Divider, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchDegrees, showError } from "../../../actions";
import {
  fetchComb,
  fetchCombSub,
  changeComb,
  addCombSub,
  cancelComb,
  saveCombination,
  deleteCombination
} from "../../../actions/masters/combination";
import { wHeight } from "../../parms";
import { Link } from "react-router-dom";
import DegreeDropdown from "../../common/DegreeDropdown";
import CombSubjectGrid from "./CombSubjectGrid";
import { ReportAPI } from "../../../apis/consts";
class Combination extends React.Component {
  state = {
    frmSubmit: false
  };

  componentDidMount() {
    this.props.fetchDegrees(this.props.user.fdeggrp);
  }

  changeDegree = async (e, data) => {
    await this.props.fetchComb(data.value);
    this.props.changeComb({
      [data.name]: data.value,
      fcombcode: "",
      fcombdesc: ""
    });
  };

  changeComb = async (e, data) => {
    const comb = this.props.combination.combs.filter((el, i) => {
      return el.fcombcode == data.value.toUpperCase();
    })[0];
    // if it is new addition
    if (comb === undefined) {
      this.setState({
        comb: {
          fcombcode: data.value,
          fcombdesc: ""
        }
      });
    } else {
      this.setState({ comb: comb });
    }
    this.props.changeComb(comb);
    await this.props.fetchCombSub(data.value);
    this.setState({ frmSubmit: true });
  };

  handleAddition = async (e, { name, value }) => {
    this.props.changeComb({
      combs: [
        ...this.props.combination.combs,
        { fcombcode: value, fcombdesc: "" }
      ],
      fcombcode: value,
      fcombdesc: ""
    });

    this.props.changeComb({
      [name]: value
    });
  };

  handleChange = (e, data) => {
    this.props.changeComb({ [data.name]: data.value });
  };

  changeCombsub = (data, el, i) => {
    const { combsubs } = this.props.combination;
    const new_combsubs = combsubs.map((el, j) => {
      if (i === j) {
        return { ...el, [data.name]: data.value };
      } else return el;
    });
    this.props.changeComb({ combsubs: new_combsubs });
  };

  deletesub = (e, el, i) => {
    const { combsubs } = this.props.combination;
    const new_combsubs = combsubs.map((el, j) => {
      if (i === j) {
        return { ...el, [e.target.name]: e.target.checked };
      } else return el;
    });
    this.props.changeComb({ combsubs: new_combsubs });
  };

  addsubs = () => {
    const { combsubs } = this.props.combination;
    const el = combsubs[combsubs.length - 1];
    if (el.fsubcode === "") {
      const error = { header: "Error", content: "Select the subject" };
      this.props.showError(error);
      return;
    }
    this.props.addCombSub();
  };

  handleSave = async () => {
    await this.props.saveCombination();
    this.handleCancel();
  };

  handleCancel = () => {
    this.props.cancelComb();
    this.setState({ frmSubmit: false });
  };

  componentWillUnmount() {
    this.handleCancel();
  }

  deleteComb = async () => {
    await this.props.deleteCombination();
    this.handleCancel();
  };

  handleReport = () => {
    const { fdegree } = this.props.combination;
    if (fdegree === "") {
      const error = { header: "Error", content: "Select Degree." };
      this.props.showError(error);
      return;
    }

    window.open(
      ReportAPI +
        "degreeWiseCombinationList&univcode=" +
        this.props.user.fcuruniv +
        "&fdegree=" +
        fdegree,
      "_blank"
    );
  };

  render() {
    const wheight = wHeight();
    const {
      fdegree,
      combs,
      fcombcode,
      fcombdesc,
      combsubs,
      optsubs
    } = this.props.combination;
    const comb_options = combs.map((el, i) => {
      return {
        key: i,
        value: el.fcombcode,
        text: el.fcombcode
      };
    });
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Combination</h4>
              <div className="ml-auto">
                <Button
                  basic
                  color="green"
                  content="Save"
                  onClick={this.handleSave}
                  icon="save"
                  disabled={!this.state.frmSubmit}
                />
                <Button
                  basic
                  color="red"
                  content="Delete"
                  icon="trash"
                  onClick={this.deleteComb}
                  disabled={!this.state.frmSubmit}
                />
                <Button
                  basic
                  color="blue"
                  content="Report"
                  onClick={this.handleReport}
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
              style={{ height: `${wheight}px`, overflowY: "auto" }}
            >
              <Form>
                <Form.Group style={{ margin: "0em 0em 0.51em" }}>
                  <Form.Field width="12">
                    <DegreeDropdown
                      frmdegree={fdegree}
                      degrees={this.props.degrees}
                      changeDegree={this.changeDegree}
                    />
                  </Form.Field>
                </Form.Group>

                <Form.Group style={{ margin: "0em 0em 0.51em" }}>
                  <Form.Field width={4}>
                    <label>Comb. Code</label>
                    <Dropdown
                      size="mini"
                      fluid
                      search
                      selection
                      value={fcombcode}
                      name="fcombcode"
                      onChange={this.changeComb}
                      allowAdditions
                      onAddItem={this.handleAddition}
                      placeholder="Comb. Code"
                      disabled={this.state.frmSubmit}
                      openOnFocus={false}
                      options={comb_options}
                      selectOnBlur={false}
                    />
                  </Form.Field>
                  <Form.Field width={8}>
                    <Form.Input
                      placeholder="Description"
                      value={fcombdesc}
                      label="Description"
                      name="fcombdesc"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
              {this.state.frmSubmit ? (
                <div>
                  <Divider />
                  <CombSubjectGrid
                    opt_subjects={optsubs}
                    combsubs={combsubs}
                    changeSub={this.changeCombsub}
                    deleteRow={this.deletesub}
                    addSub={this.addsubs}
                  />
                </div>
              ) : null}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    combination: state.combination,
    deggrp: state.deggrp,
    degrees: state.degrees,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {
    fetchDegrees,
    fetchComb,
    fetchCombSub,
    changeComb,
    addCombSub,
    showError,
    cancelComb,
    saveCombination,
    deleteCombination
  }
)(Combination);
