import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Table } from 'semantic-ui-react';
import Rows from './rows';

class Editablett extends Component {


  render() {
    const { timetable } = this.props;

    return (
      <div className="ui mini form">
        <Divider />
        <Table celled style={{ fontSize: '1.1536em' }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: '5%' }} singleLine textAlign="center">Sl. No.</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '8%' }} textAlign="center">QP Code</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Subject Name</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '15%' }} textAlign="center">Perm. Date</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '15%' }} textAlign="center">Temp. Date</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '25%' }} textAlign="center">Time</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '5%' }} textAlign="center">Del</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {timetable.map((el, i) => {
              let nel = el.toJS()
              return <Rows key={i} i={i} el={nel} onRef={ref => (this.tr[nel.qpcode] = ref)} />
            })}
          </Table.Body>
        </Table>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    timetable: state.timetable
  };
}

export default connect(mapStateToProps, {})(Editablett);
