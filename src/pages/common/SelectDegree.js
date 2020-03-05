import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Dropdown } from "semantic-ui-react";
import { fetchDegrees } from "../../actions";
import { fetchPrDegrees } from "../../actions/practicals/practicals";

class SelectDegree extends Component {
  componentDidUpdate(prevProps) {
    console.log(this.props);
    if (this.props.modType === "PRBOARD") {
      if (this.props.fboard !== prevProps.fboard) {
        this.props.fetchPrDegrees(
          this.props.deggrp,
          this.props.fboard,
          this.props.modType
        );
      }
    } else {
      if (this.props.deggrp !== prevProps.deggrp) {
        this.props.fetchDegrees(this.props.deggrp);
      }
    }
  }

  render() {
    const degrees = this.props.degrees;

    const deg_options = degrees.map((el, i) => {
      return {
        key: i,
        value: el.fdegree,
        text: `${el.fdegree} - ${el.fdescpn}`
      };
    });

    return (
      <Form.Field>
        <label>Degree</label>
        <Dropdown
          fluid
          search
          selection
          value={this.props.frmdegree}
          onChange={this.props.onDegreeChange}
          placeholder="Select Degree"
          options={deg_options}
        />
      </Form.Field>
    );
  }
}

const mapStateToProps = state => {
  return { degrees: state.degrees };
};

export default connect(
  mapStateToProps,
  { fetchDegrees, fetchPrDegrees }
)(SelectDegree);
