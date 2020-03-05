import React, { Component } from 'react';
import { Card, Divider, Form, Button, Table, Input, Label, Checkbox, Tab } from 'semantic-ui-react';
import '../../../index.css';

class ExamcntrTable extends Component {
  state = { tdata: false, cntrdet: [], searchVal: "" }

  componentDidMount() {
    this.setState({ cntrdet: this.props.tblData });
  }
  componentDidUpdate(prevProps) {
    if (this.props.tblData !== prevProps.tblData) {
      this.setState({ cntrdet: this.props.tblData });
    }
  }

  searchTable = (e, data) => {
    const string = data.value;
    const searchPrbatch = this.props.tblData.filter(o => Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
    this.setState({ cntrdet: searchPrbatch, searchVal: data.value });
  }

  render() {
    const data = this.state.cntrdet;
    // console.log("tblData", data);
    if (data.lenght = 0) {

    } else {
      return (
        <div >
          <Divider />
          <div style={{
            marginBottom: '1em', backgroundColor: 'white'
          }} className="stick">
            <Input icon='search' fluid placeholder='Search...' onChange={this.searchTable} value={this.state.searchVal} style={{ fontSize: '1.1em' }} />
          </div>
          <div>
            <Table celled padded selectable size='small' color='olive' className="sticky">
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.HeaderCell>Sl.No.</Table.HeaderCell>
                  <Table.HeaderCell>QP Code</Table.HeaderCell>
                  <Table.HeaderCell>Subject Name </Table.HeaderCell>
                  <Table.HeaderCell>Center Code</Table.HeaderCell>
                  <Table.HeaderCell>College Name</Table.HeaderCell>
                  <Table.HeaderCell>Town</Table.HeaderCell>
                  <Table.HeaderCell>Date of Exam</Table.HeaderCell>
                  <Table.HeaderCell>Total Count</Table.HeaderCell>
                  <Table.HeaderCell>Absent Count</Table.HeaderCell>
                  <Table.HeaderCell>MalPractice Count</Table.HeaderCell>
                  <Table.HeaderCell>Present Count </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {data.map((el, i) => {
                  return (
                    <Table.Row key={i} style={{ overflow: "hidden" }}>
                      <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                      <Table.Cell textAlign="center">{el.fqpcode}</Table.Cell>
                      <Table.Cell>{el.fsubname}</Table.Cell>
                      <Table.Cell textAlign="center">{el.fcntrcode}</Table.Cell>
                      <Table.Cell>{el.fcollname}</Table.Cell>
                      <Table.Cell>{el.ftown}</Table.Cell>
                      <Table.Cell>{el.fdoe}</Table.Cell>
                      <Table.Cell>{el.tcount}</Table.Cell>
                      <Table.Cell>{el.abcount}</Table.Cell>
                      <Table.Cell>{el.mpcount}</Table.Cell>
                      <Table.Cell>{el.prcount}</Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table >
          </div>
        </div>)
    }



  }
}

export default ExamcntrTable;