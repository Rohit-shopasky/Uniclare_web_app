import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Divider, Input } from 'semantic-ui-react';
import { showError } from '../../../actions';

class PrBatchTable extends Component {

  state = { prbatch: [], searchVal: '' }

  componentDidMount() {
    this.setState({ prbatch: this.props.prbatch, searchVal: '' });
  }

  componentDidUpdate(prevProps) {
    if (this.props.prbatch !== prevProps.prbatch) {
      this.setState({ prbatch: this.props.prbatch, searchVal: '' });
    }
  }

  searchTable = (e, data) => {
    const string = data.value;
    const searchPrbatch = this.props.prbatch.filter(o => Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
    this.setState({ prbatch: searchPrbatch, searchVal: data.value });
  }
  render() {
    const prbatch = this.state.prbatch;
    return (
      <div>
        <Divider />
        <div style={{
          margin: '1em 0em', backgroundColor: 'white'
        }} className="stick" >
          <Input icon='search' fluid placeholder='Search...'
            value={this.state.searchVal} onChange={this.searchTable} />
        </div>
        <Table celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: '5%' }} singleLine textAlign="center">Sl. No.</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '10%' }} textAlign="center">Exam Date</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '10%' }} textAlign="center">College Code</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">College Name</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '10%' }} textAlign="center">Batch Count</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '10%' }} textAlign="center">Student Count</Table.HeaderCell>
              <Table.HeaderCell style={{ width: '10%' }} textAlign="center">Marks Entry Pending</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {prbatch.map((el, i) => {
              return (<Table.Row key={i}>
                <Table.Cell textAlign="center">
                  {i + 1}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {el.fexamdate}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {el.focollcode}
                </Table.Cell>
                <Table.Cell>
                  {el.fcollname}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {el.fbatchcount}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {el.fstudcount}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {el.fpendstudcount}
                </Table.Cell>
              </Table.Row>);
            })}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { prbatch: state.prbatch };
}

export default connect(mapStateToProps, { showError })(PrBatchTable);