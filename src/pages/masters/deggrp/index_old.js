import React, { Component } from 'react';

import { Card, Divider, Table, Button, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { saveDegreeGroup, fetchDegGrp } from '../../../actions';

class DegreeGroup extends Component {

  state = {
    deggroup: [{ fdeggrp: '', fdescpn: '', fyear: '', ftype: '', fexamdate: '', fdeleted: false }],
    error: false, errorMessage: "", del_deggrp: []
  }

  componentDidMount() {
    this.props.fetchDegGrp();
  }

  componentDidUpdate(prevProps) {
    if (this.props.deggrp !== prevProps.deggrp) {
      this.setState({ deggroup: [...this.props.deggrp] })
    }
  }

  changeCell = (e, el, i) => {
    const deggroup = this.state.deggroup;
    let arra = deggroup.map((item, j) => {
      let data = item;
      if (j === i) {
        data = { ...el, [e.target.name]: e.target.value }
      }
      return data;
    })
    this.setState({ deggroup: arra })
  }

  deleteRow = (e, el, i) => {

    const deggroup = this.state.deggroup;
    let arra = deggroup.map((item, j) => {
      let data = item;
      if (j === i) {
        data = { ...el, [e.target.name]: e.target.checked }
      }
      return data;
    })
    this.setState({ deggroup: arra })
  }

  addRow = (e, i) => {
    if (e.keyCode === 9) {
      const el = this.state.deggroup[i];
      if (el.fdeggrp === '' || el.fdescpn === '') {
        this.setState({ error: true, errorMessage: 'Enter the vlaues' });
        return;
      }
      else {
        this.setState({ error: false, errorMessage: "" });
      }

      const item = { fdeggrp: '', fdescpn: '', fyear: '', ftype: '', fexamdate: '', fdeleted: false };
      this.setState({ deggroup: [...this.state.deggroup, item] });
    }
  }

  handleSave = async () => {
    if (this.state.deggroup.length <= 1) {
      this.setState({ error: true, errorMessage: 'Enter the vlaues' });
      return;
    } else {
      this.setState({ error: false, errorMessage: '' });
    }

    for (let i = 0; i < this.state.deggroup.length; i++) {
      let el = this.state.deggroup[i];
      if (el.fdeggrp === '' || el.fdescpn === '' || el.fyear === '' || el.fexamtype === '' || el.fexamdate === '') {
        this.setState({ error: true, errorMessage: 'Enter all the vlaues' });
        return;
      }
    }
    this.setState({ error: false, errorMessage: '' });

    await this.props.saveDegreeGroup(this.state.deggroup);

    if (this.props.saveDeggrp.error_code !== 2) {
      const { error_code, msg } = this.props.saveDeggrp
      this.setState({ error: error_code, errorMessage: msg });
    }
    this.props.fetchDegGrp();
  }

  render() {
    const { deggroup, error, errorMessage } = this.state;
    const arlength = deggroup.length;
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: 'flex' }}>
              <h3 style={{ width: '95%' }}>Degree Group</h3>
              <div style={{ float: 'right' }}>
                <Button positive icon='checkmark' labelPosition='right'
                  content="Save" onClick={this.handleSave} />
              </div>
            </Card.Header>
            <Divider />
            <Card.Description>
              {error ? <Message negative>
                <Message.Header> {errorMessage} </Message.Header>
              </Message> : null}
              <div className="ui mini form">
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell style={{ width: '5%' }} singleLine textAlign="center">Sl. No.</Table.HeaderCell>
                      <Table.HeaderCell style={{ width: '10%' }} textAlign="center">Degree Group</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">Description</Table.HeaderCell>
                      <Table.HeaderCell style={{ width: '10%' }} textAlign="center">Exam Year</Table.HeaderCell>
                      <Table.HeaderCell style={{ width: '5%' }} textAlign="center">Exam Type</Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">Exam Date</Table.HeaderCell>
                      <Table.HeaderCell style={{ width: '10%' }} textAlign="center">Del</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {
                      deggroup.map((el, i) => {
                        return (<Table.Row key={i}>
                          <Table.Cell textAlign="center">
                            {i + 1}
                          </Table.Cell>
                          <Table.Cell textAlign="center" singleLine>
                            <input className="field" type="text" name="fdeggrp" id={i}
                              value={el.fdeggrp}
                              onChange={(e) => this.changeCell(e, el, i)} />
                          </Table.Cell>
                          <Table.Cell>
                            <input type="text" value={el.fdescpn} name="fdescpn" id={i}
                              onChange={(e) => this.changeCell(e, el, i)} />
                          </Table.Cell>
                          <Table.Cell>
                            <input type="text" value={el.fyear} name="fyear" id={i}
                              onChange={(e) => this.changeCell(e, el, i)} />
                          </Table.Cell>
                          <Table.Cell>
                            <input type="text" value={el.fexamtype} name="fexamtype" id={i}
                              onChange={(e) => this.changeCell(e, el, i)} />
                          </Table.Cell>
                          <Table.Cell>
                            <input type="text" value={el.fexamdate} name="fexamdate" id={i}
                              onChange={(e) => this.changeCell(e, el, i)} />
                          </Table.Cell>
                          <Table.Cell textAlign='center'>
                            {arlength === i + 1 ? <div className="ui checkbox">
                              <input type="checkbox" onKeyDown={(e) => this.addRow(e, i)} name="fdeleted" value={el.fdeleted}
                                onChange={(e) => this.deleteRow(e, el, i)} checked={(el.fdeleted == "true" ? 'checked' : null)} />
                              <label> </label>
                            </div> :
                              <div className="ui checkbox">
                                <input type="checkbox" name="fdeleted" value={el.fdeleted}
                                  onChange={(e) => this.deleteRow(e, el, i)} checked={(el.fdeleted == "true" ? 'checked' : null)} />
                                <label> </label>
                              </div>}

                            {/* <Button size='mini' color="red" icon='trash' content="Delete"/> */}
                          </Table.Cell>
                        </Table.Row>);
                      })
                    }
                  </Table.Body>
                </Table>
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deggrp: state.deggrp,
    saveDeggrp: state.saveDeggrp
  };
}

export default connect(mapStateToProps, {
  saveDegreeGroup, fetchDegGrp
})(DegreeGroup);

