import React, { Component } from 'react'
import { Form, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

class ReasonDropDown extends Component {

  render() {
    const reason = this.props.reason;

    var reason_options = reason.map((el, i) => {
      return { key: i, value: el.freasoncd, text: `${el.freasoncd} - ${el.fdescpn}` }
    });

    return (
      <Form.Field>
        <Dropdown fluid search selection name={this.props.name} value={this.props.reasonval} onChange={this.props.changeReason}
          placeholder='Select Session' selectOnBlur={false}
          options={reason_options} />
      </Form.Field>
    )
  }
}

const mapStateToProps = (state) => {
  return { reason: state.reason };
}

export default connect(mapStateToProps, {})(ReasonDropDown);
