import React, { Component } from "react";
import { showError } from "../../../actions";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";
import { getAdmStats } from "../../../actions/admissions/admStats";

class CollwiseAdmStats extends Component {
  state = { expandedRows: null, curCollcode: "" };

  handleRowClick = async (rowId, fcollcode) => {
    const currentExpandedRows = this.state.expandedRows;
    this.setState({
      expandedRows: rowId === currentExpandedRows ? null : rowId,
      curCollcode: fcollcode
    });

    // const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    // const newExpandedRows = isRowCurrentlyExpanded
    //   ? currentExpandedRows.filter(id => id !== rowId)
    //   : currentExpandedRows.concat(rowId);

    // this.setState({ expandedRows: newExpandedRows });
  };

  //=== Render Table Rows ===//
  renderItem(item, index) {
    const clickCallback = () => this.handleRowClick(index, item.fcollcode);

    const itemRows = [
      <Table.Row key={"row-data-" + index} onClick={clickCallback}>
        <Table.Cell textAlign="center">{index + 1}</Table.Cell>
        <Table.Cell textAlign="center">{item.fcollcode}</Table.Cell>
        <Table.Cell>{item.fcollname}</Table.Cell>
        <Table.Cell>
          {item.fmobile}/ {item.fphone}
        </Table.Cell>
        <Table.Cell textAlign="center">{item.fcount}</Table.Cell>
        <Table.Cell textAlign="center">{item.factive}</Table.Cell>
        <Table.Cell textAlign="center">{item.ffinsubdone}</Table.Cell>
        <Table.Cell textAlign="center">{item.fadmpend}</Table.Cell>
        <Table.Cell textAlign="center">{item.fackdone}</Table.Cell>
        <Table.Cell textAlign="center">{item.fackpend}</Table.Cell>
        <Table.Cell textAlign="center">{item.fapprdone}</Table.Cell>
        <Table.Cell textAlign="center">{item.fapprpend}</Table.Cell>
      </Table.Row>
    ];

    //=== If College row is clicked  ===//
    if (this.state.expandedRows == index) {
      var collDegDet = this.props.collAdmStats.collDegDet;

      if (collDegDet.length > 0) {
        itemRows.push(
          <>
            {collDegDet
              .filter(el => el["fcollcode"] == this.state.curCollcode)
              .map((el, i) => {
                return (
                  <Table.Row key={i + 1}>
                    {/* <Table.Cell>{i + 1}</Table.Cell> */}
                    <Table.Cell colSpan="4">
                      {el["fdegree"]} - {el["fdescpn"]}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{el["fcount"]}</Table.Cell>
                    <Table.Cell textAlign="center">{el["factive"]}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {el["ffinsubdone"]}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{el["fadmpend"]}</Table.Cell>
                    <Table.Cell textAlign="center">{el["fackdone"]}</Table.Cell>
                    <Table.Cell textAlign="center">{el["fackpend"]}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {el["fapprdone"]}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {el["fapprpend"]}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </>
        );
      }
    }
    return itemRows;
  }

  render() {
    var admStats = this.props.collAdmStats.collDet;
    let allItemRows = [];
    admStats.map((item, index) => {
      const perItemRows = this.renderItem(item, index);
      allItemRows = allItemRows.concat(perItemRows);
    });

    return (
      <div style={{ overflowX: "scroll" }}>
        <Table celled selectable className="animated fadeIn" padded>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>SL. No.</Table.HeaderCell>
              <Table.HeaderCell>College Code</Table.HeaderCell>
              <Table.HeaderCell>College Name</Table.HeaderCell>
              <Table.HeaderCell>Contact</Table.HeaderCell>
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
          <Table.Body>{allItemRows}</Table.Body>
        </Table>
      </div>
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
    showError,
    getAdmStats
  }
)(CollwiseAdmStats);
