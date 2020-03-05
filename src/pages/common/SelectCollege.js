import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Dropdown } from "semantic-ui-react";
import { fetchDegColl } from "../../actions/before-exam/centers";

class SelectCollege extends Component {
  render() {
    const degcoll = this.props.degcoll;

    const deggroup_options = degcoll.map((el, i) => {
      return { key: i, value: el.fcollcode, text: el.fcollname };
    });
    console.log(this.props.collref);
    return (
      <Form.Field>
        <label>Exam Center</label>
        <Dropdown
          ref={this.props.collref}
          fluid
          search
          selection
          value={this.props.examcntr}
          onChange={this.props.changeExamCntr}
          placeholder="Select Exam Center"
          disabled={this.props.disbal}
          selectOnBlur={false}
          options={deggroup_options}
        />
      </Form.Field>
    );
  }
}

const mapStateToProps = state => {
  return { deggrp: state.deggrp };
};

export default connect(
  mapStateToProps,
  { fetchDegColl }
)(SelectCollege);
