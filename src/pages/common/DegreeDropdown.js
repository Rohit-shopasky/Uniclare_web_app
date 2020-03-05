import React, { Component } from "react";
import { Form, Dropdown } from "semantic-ui-react";

export default class SelectDegree extends Component {
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
          name="fdegree"
          value={this.props.frmdegree}
          onChange={this.props.changeDegree}
          placeholder="Select Degree"
          options={deg_options}
        />
      </Form.Field>
    );
  }
}
