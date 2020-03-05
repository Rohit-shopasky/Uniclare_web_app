import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

class Dropoption extends Component {
  render() {
    return (
      <>
        <Dropdown
          name="fcombcode"
          fluid
          search
          selection
          disabled={this.props.editFlage ? false : true}
          placeholder="Select Combination"
          options={this.props.options}
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </>
    );
  }
}

export default Dropoption;
