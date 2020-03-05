import React, { Component } from "react";
import {
  Card,
  Button,
  Form,
  Message,
  Radio,
  Checkbox
} from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchDegGrp } from "../../../actions";
import { generateTimetable } from "../../../actions/before-exam/timetable";
import SelectDeggrp from "../../common/SelectDeggrp";
import getToday from "../../common/todayDate";
import InputMask from "react-input-mask";

class GenTimeTableForm extends Component {
  state = {
    deggrp: [],
    fdeggrp: "",
    fyear: "",
    fexamtype: "",
    fexamdate: "",
    fexamrange: "",
    fdaytype: "C",
    fsunday: false,
    fstrdate: "",
    deggrpError: false,
    fexamrangeError: false,
    fstrdateError: false,
    frmSubmit: false,
    disabled: false
  };

  async componentDidMount() {
    await this.props.fetchDegGrp();
    this.props.onRef(this);
    this.setState({ deggrp: this.props.deggrp });
  }

  cancel = () => {
    this.setState({
      fdeggrp: "",
      fyear: "",
      fexamtype: "",
      fexamdate: "",
      fexamrange: "",
      fdaytype: "C",
      fsunday: false,
      fstrdate: getToday(),
      freset: false,
      deggrpError: false,
      fexamrangeError: false,
      fstrdateError: false,
      frmSubmit: false,
      disabled: false
    });
  };

  changeDeggrp = (e, data) => {
    let deggrpsel = this.state.deggrp.filter(
      (el, i) => el.fdeggrp === data.value
    );

    let deggrp = deggrpsel[0];

    this.setState({
      fyear: deggrp.fyear,
      fexamtype: deggrp.fexamtype,
      fexamdate: deggrp.fexamdate,
      fdeggrp: deggrp.fdeggrp
    });
  };

  handleChangedate = e => {
    this.setState({ [e.target.name]: e.target.value });
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
        return;
    }
  };

  validateForm = async () => {
    const {
      fdeggrp,
      fyear,
      fexamtype,
      fstrdate,
      fexamrange,
      fdaytype,
      fsunday
    } = this.state;

    if (fdeggrp == "") {
      this.setState({
        deggrpError: true,
        ferror: true,
        ferrorm: "Degree Group required."
      });
      return;
    } else {
      this.setState({ deggrpError: false, ferror: false, ferrorm: "" });
    }

    if (fexamrange == "") {
      this.setState({
        fexamrangeError: true,
        ferror: true,
        ferrorm: "Exam Range required."
      });
      return;
    } else {
      this.setState({ fexamrangeError: false, ferror: false, ferrorm: "" });
    }

    if (fstrdate == "") {
      this.setState({
        fstrdateError: true,
        ferror: true,
        ferrorm: "Starting date required."
      });
      return;
    } else {
      this.setState({ fexamrangeError: false, ferror: false, ferrorm: "" });
    }

    this.setState({ disabled: true });

    const data = {
      fdeggrp,
      fyear,
      fexamtype,
      fstrdate,
      fexamrange,
      fdaytype,
      fsunday
    };

    await this.props.setFromValues(data);
    return data;
  };

  generateTimeTable = async () => {
    const data = await this.validateForm();
    console.log(data);
    this.props.generateTimetable(data);
  };

  render() {
    const {
      fdeggrp,
      fyear,
      fexamtype,
      fexamdate,
      fstrdate,
      fexamrange,
      fdaytype,
      ferror,
      ferrorm,
      fsunday,
      deggrpError,
      fexamrangeError,
      disabled
    } = this.state;

    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };
    return (
      <div>
        <Form error>
          {ferror ? <Message error content={ferrorm} /> : null}
          <SelectDeggrp
            changeDeggrp={this.changeDeggrp}
            disabled={disabled}
            frmDeggrp={fdeggrp}
            dgerror={deggrpError}
          />
          <Form.Group>
            <Form.Input
              placeholder="Exam Year"
              value={fyear}
              width={4}
              label="Exam Year"
              readOnly
            />
            <Form.Input
              placeholder="Exam Type"
              value={fexamtype}
              width={3}
              label="Exam Type"
              readOnly
            />
            <Form.Input
              placeholder="Exam Date"
              label="Exam Date"
              width={10}
              value={fexamdate}
              readOnly
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              placeholder="Exam Range"
              width={5}
              onChange={this.handleChange}
              value={fexamrange}
              name="fexamrange"
              label="Exam Range"
              error={fexamrangeError}
              disabled={disabled}
            />

            <div className="field">
              <label> Starting Date </label>
              <InputMask
                type="text"
                formatChars={formatChars}
                width={5}
                mask="ed/nm/zyyy"
                name="fstrdate"
                value={fstrdate}
                onChange={this.handleChangedate}
                placeholder="dd/mm/yyyy"
                disabled={disabled}
              />
            </div>
            {/* <Form.Input placeholder='Starting Date' width={5} onChange={this.handleChange}
              label="Starting Date" name="fstrdate" value={fstrdate} error={fstrdateError}
              disabled={disabled} /> */}
          </Form.Group>
          <Form.Group inline>
            <Form.Field
              control={Radio}
              name="fdaytype"
              label="Continuous Days"
              value="C"
              checked={fdaytype === "C"}
              onChange={this.handleChange}
              disabled={disabled}
            />
            <Form.Field
              control={Radio}
              name="fdaytype"
              label="Alternate Days"
              value="A"
              checked={fdaytype === "A"}
              onChange={this.handleChange}
              disabled={disabled}
            />
          </Form.Group>

          <Form.Group inline>
            <Form.Field
              control={Checkbox}
              onChange={this.handleChange}
              name="fsunday"
              checked={fsunday === true}
              label="Consider Sunday`s"
              disabled={disabled}
            />
          </Form.Group>

          <Button color="blue" onClick={this.generateTimeTable}>
            Genarate
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deggrp: state.deggrp
  };
};

export default connect(
  mapStateToProps,
  {
    generateTimetable,
    fetchDegGrp
  }
)(GenTimeTableForm);
