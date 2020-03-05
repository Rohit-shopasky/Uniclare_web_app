import React, { Component } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchDegGrp, showError } from "../../../actions";
import { getupdateTimetable } from "../../../actions/before-exam/timetable";
import SelectDeggrp from "../../common/SelectDeggrp";
import getToday from "../../common/todayDate";

class TimeTableForm extends Component {
  state = {
    fexamrange: "",
    frmSubmit: false,
    disabled: false
  };

  async componentDidMount() {
    await this.props.fetchDegGrp();
    this.props.onRef(this);
    this.setState({ deggrp: this.props.deggrp, fstrdate: getToday() });
  }

  cancel = () => {
    this.setState({
      fexamrange: "",
      frmSubmit: false,
      disabled: false
    });
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

  generateTimeTable = () => {
    const { fdeggrp, fyear, fexamtype, fexamrange } = this.state;

    if (fexamrange == "") {
      const error = { header: "Error", content: "Exam Range required." };
      this.props.showError(error);
      return;
    }

    this.setState({ disabled: true });
    const data = { fdeggrp, fyear, fexamtype, fexamrange };
    this.props.setFromValues(data);
    this.props.getupdateTimetable(data);
  };

  render() {
    const {
      fexamrange,
      ferror,
      ferrorm,
      fexamrangeError,
      disabled
    } = this.state;
    return (
      <div>
        <Form error>
          {ferror ? <Message error content={ferrorm} /> : null}
          <Form.Group>
            <Form.Input
              placeholder="Exam Range"
              width={10}
              onChange={this.handleChange}
              value={fexamrange}
              name="fexamrange"
              label="Exam Range (Ex. ABCDEF)"
              error={fexamrangeError}
              disabled={disabled}
            />
          </Form.Group>

          <Button color="blue" onClick={this.generateTimeTable}>
            Submit
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
    fetchDegGrp,
    showError,
    getupdateTimetable
  }
)(TimeTableForm);
