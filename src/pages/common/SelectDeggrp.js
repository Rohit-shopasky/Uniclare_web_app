import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Form, Dropdown } from 'semantic-ui-react';
import { fetchDegGrp } from '../../actions';

class SelectDeggrp extends Component {

  componentDidMount() {
    this.props.fetchDegGrp();
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.props.fetchDegGrp();
    }
  }

  render() {
    const deggroup = this.props.deggrp;

    var deggroup_options = deggroup.map((el, i) => {
      return { key: i, value: el.fdeggrp, text: `${el.fdeggrp} - ${el.fdescpn}` }
    });

    return (
      <Form.Field>
        <label>Degree Group</label>
        <Dropdown size="mini" error={this.props.dgerror} fluid search selection
          value={this.props.frmDeggrp} onChange={this.props.changeDeggrp}
          placeholder='Select Degree Group' disabled={this.props.disabled} openOnFocus={false}
          options={deggroup_options} selectOnBlur={false} searchInput={{ autoFocus: true }} />
      </Form.Field>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deggrp: state.deggrp,
    user: state.user
  };
}

export default connect(mapStateToProps, { fetchDegGrp })(SelectDeggrp);