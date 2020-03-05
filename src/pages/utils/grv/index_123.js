import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getGrvList, grvSend } from '../../../actions/grv';
import Grvdet from './grvdet';

class Grievances extends Component {
  state = { grv: false, grvdet: false, curgrv: "" }

  componentDidMount() {
    this.props.getGrvList();
    this.setState({ grv: true });
  }

  grvForm = (e) => {
    // console.log("grvgrvForm", e);
    this.setState({ grvdet: true, grv: false, curgrv: e });

  }
  render() {

    // console.log("grvvv", this.props.grvlst);
    const { forwards, grvs } = this.props.grvlst;

    if (forwards == undefined && grvs == undefined) return null;
    else {
      return (
        <div class="card">
          <div class="card-body" >
            <h3 class="card-title">Grievances</h3>
            <hr />  {this.state.grv ?
              <div >

                <Table celled selectable style={{ fontSize: '1.1em' }}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell style={{ width: '1%' }} singleLine textAlign="center">Sl. No.</Table.HeaderCell>
                      <Table.HeaderCell style={{ width: '5%' }} singleLine textAlign="center">Grv No.</Table.HeaderCell>
                      <Table.HeaderCell style={{ width: '20%' }} textAlign="center">Grv Date-Time</Table.HeaderCell>
                      <Table.HeaderCell style={{ width: '3%' }} textAlign="center">University</Table.HeaderCell>
                      <Table.HeaderCell style={{ width: '15%' }} textAlign="center">Name</Table.HeaderCell>
                      <Table.HeaderCell style={{ width: '6%' }} textAlign="center">Contact</Table.HeaderCell>
                      <Table.HeaderCell style={{ width: '10%' }} textAlign="center">User</Table.HeaderCell>
                      <Table.HeaderCell style={{ width: '30%' }} textAlign="center">Subject</Table.HeaderCell>
                      <Table.HeaderCell style={{ width: '5%' }} textAlign="center">Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {grvs.map((el, i) => {
                      return (<Table.Row key={i}>
                        <Table.Cell textAlign="center" className="field" onClick={this.grvForm}>
                          {i + 1}
                        </Table.Cell>
                        <Table.Cell className="field"> {el.fgrvid} </Table.Cell>
                        <Table.Cell> {el.fgrvdate} </Table.Cell>
                        <Table.Cell> {el.funivshort} </Table.Cell>
                        <Table.Cell> {el.fgrvfrom} </Table.Cell>
                        <Table.Cell> {el.fgrvmobile} </Table.Cell>
                        <Table.Cell> {el.fgrvuser} </Table.Cell>
                        <Table.Cell> {el.fgrvsub} </Table.Cell>
                        <Table.Cell> <div className="ml-4 mt-2"><i className="fa fa-eye" style={{ color: 'green' }} onClick={() => this.grvForm(el.fgrvid)}></i></div> </Table.Cell>
                      </Table.Row>);
                    })}
                  </Table.Body>
                </Table>
              </div>
              : null
            }
            {this.state.grvdet ? <Grvdet det={this.state.curgrv} /> : null}
          </div>
        </div >
      );
    }

  }
}

const mapStateToProps = (state) => {
  // console.log(state.grvlst);
  return {
    grvlst: state.grvlst
  };
}

export default connect(mapStateToProps, {
  getGrvList, grvSend
})(Grievances);