import React, { Component } from 'react'
import { Form, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';

class DateDropDown extends Component {

  render() {
    const masdate = this.props.masdate;

    var date_options = masdate.map((el, i) => {
      return { key: i, value: el.fdatecode, text: `${el.fdatecode} - ${el.fdate}` }
    });

    return (
      <Form.Field>
        <Dropdown fluid search name={this.props.name} selection value={this.props.dateval} onChange={this.props.changedate}
          placeholder='Select date' selectOnBlur={false}
          options={date_options} />
      </Form.Field>
    )
  }
}

const mapStateToProps = (state) => {
  return { masdate: state.masdate };
}

export default connect(mapStateToProps, {})(DateDropDown);
