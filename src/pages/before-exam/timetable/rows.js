import React, { Component } from 'react';
import ReasonDropdown from '../../common/reasonDropdown';
import DateDropdown from '../../common/DateDropDown';
import { connect } from 'react-redux';
import { changett } from '../../../actions';
import { Table } from 'semantic-ui-react';

class Rows extends Component {

  state = { el: {} }

  changeCell = (data, el, id) => {
    console.log(data, el, id);
    const newel = { ...el, [data.name]: data.value }
    this.setState({ el: { ...newel } });
    // this.props.changett(newel, id);
  }

  componentDidMount() {
    this.setState({ el: { ...this.props.el }, i: this.props.i, qpcode: this.props.qpcode });
    this.props.onRef(this);
  }

  render() {

    const { i, el } = this.state;
    // const i = parseInt(j);
    // const { masdate, reason } = this.props;

    return (<Table.Row key={i}>
      <Table.Cell textAlign="center">
        {i + 1}
      </Table.Cell>
      <Table.Cell textAlign="center" singleLine>
        {el.fqpcode}
      </Table.Cell>
      <Table.Cell>
        {el.fsubname}
      </Table.Cell>
      <Table.Cell>
        <DateDropdown dateval={el.fdatecodep} name="fdatecodep"
          changedate={(e, data) => this.changeCell(data, el, i)} />
      </Table.Cell>
      <Table.Cell>
        <DateDropdown dateval={el.fdatecodet} name="fdatecodet"
          changedate={(e, data) => this.changeCell(data, el, i)} />
      </Table.Cell>
      <Table.Cell>
        <ReasonDropdown reasonval={el.fsession} name="fsession"
          changeReason={(e, data) => this.changeCell(data, el, i)} />
      </Table.Cell>
      <Table.Cell textAlign='center'>
        <div className="ui checkbox">
          <input type="checkbox" name="fdeleted" value={el.fdeleted}
            onChange={(e) => this.deleteRow(e, el, i)} checked={(el.fdeleted == "true" ? 'checked' : null)} />
          <label> </label>
        </div>
      </Table.Cell>
    </Table.Row>);
  }
}

const mapStateToProps = (state) => {
  return {
    timetable: state.timetable
  };
}

export default connect(mapStateToProps, { changett })(Rows);
