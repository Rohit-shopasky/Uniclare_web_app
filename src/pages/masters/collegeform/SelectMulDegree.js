import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Dropdown } from "semantic-ui-react";
import { fetchDegrees } from "../../../actions";

class SelectMulDegree extends Component {
  componentDidMount() {
    this.props.fetchDegrees(this.props.user.fdeggrp);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.fdeggrp !== prevProps.user.fdeggrp) {
      this.props.fetchDegrees(this.props.user.fdeggrp);
    }
  }

  render() {
    const degrees = this.props.degrees;

    const deg_options = degrees.map((el, i) => {
      return {
        key: i,
        value: el.fdegree,
        text: el.fdegree
      };
    });

    return (
      <Form.Field>
        <label>Degree</label>
        <Dropdown
          name="fdegree"
          fluid
          search
          selection
          value={this.props.fdegree}
          onChange={this.props.onDegreeChange}
          placeholder="Select Degree"
          options={deg_options}
          multiple
          disabled={this.props.disabled}
        />
      </Form.Field>
    );
  }
}

const mapStateToProps = state => {
  return { degrees: state.degrees, user: state.user };
};

export default connect(
  mapStateToProps,
  { fetchDegrees }
)(SelectMulDegree);
