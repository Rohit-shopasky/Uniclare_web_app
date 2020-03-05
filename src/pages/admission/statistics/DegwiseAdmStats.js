import React, { Component } from "react";
import { showError } from "../../../actions";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";
class DegwiseAdmStats extends Component {
  state = {};
  render() {
    var admStats = this.props.collAdmStats;
    console.log("Degree Render", admStats);

    return (
      <>
        <Table celled padded selectable>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>SL. No.</Table.HeaderCell>
              <Table.HeaderCell>Degree Code</Table.HeaderCell>
              <Table.HeaderCell>Degree Name</Table.HeaderCell>
              <Table.HeaderCell>Student Count</Table.HeaderCell>
              <Table.HeaderCell>Registerd Count</Table.HeaderCell>
              <Table.HeaderCell>Adm Uploaded</Table.HeaderCell>
              <Table.HeaderCell>Adm Pending</Table.HeaderCell>
              <Table.HeaderCell>Ack Done</Table.HeaderCell>
              <Table.HeaderCell>Ack Pending</Table.HeaderCell>
              <Table.HeaderCell>Approval Done</Table.HeaderCell>
              <Table.HeaderCell>Approval Pending</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {admStats.map((el, i) => {
              return (
                <Table.Row key={i + 1}>
                  <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                  <Table.Cell textAlign="center">{el.fdegree}</Table.Cell>
                  <Table.Cell>{el.fdescpn}</Table.Cell>
                  <Table.Cell textAlign="center">{el.fcount}</Table.Cell>
                  <Table.Cell textAlign="center">{el.factive}</Table.Cell>
                  <Table.Cell textAlign="center">{el.ffinsubdone}</Table.Cell>
                  <Table.Cell textAlign="center">{el.fadmpend}</Table.Cell>
                  <Table.Cell textAlign="center">{el.fackdone}</Table.Cell>
                  <Table.Cell textAlign="center">{el.fackpend}</Table.Cell>
                  <Table.Cell textAlign="center">{el.fapprdone}</Table.Cell>
                  <Table.Cell textAlign="center">{el.fapprpend}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    collAdmStats: state.admCollStats
  };
};
export default connect(
  mapStateToProps,
  {
    showError
  }
)(DegwiseAdmStats);
