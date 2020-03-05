import React, { Component } from "react";
import { Table } from "semantic-ui-react";

export default class IAMarks extends Component {
  render() {
    const iamarks = this.props.iamarks;
    console.log(this.props.iamarks);
    return (
      <div>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: "5%" }} textAlign="center">
                Sl. No.
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Subject Code
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Subject Name
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "5%" }} textAlign="center">
                Short Name
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "5%" }} textAlign="center">
                Max. Marks
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "5%" }} textAlign="center">
                Sec. Marks
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "5%" }} textAlign="center">
                Present
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Entered By
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "15%" }} textAlign="center">
                Entered Date
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {iamarks.map((el, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                  <Table.Cell textAlign="center">{el.fsubcode}</Table.Cell>
                  <Table.Cell>{el.fsubname}</Table.Cell>
                  <Table.Cell>{el.fssubname}</Table.Cell>
                  <Table.Cell>{el.fsmaxmarks}</Table.Cell>
                  <Table.Cell>{el.fmarks}</Table.Cell>
                  <Table.Cell>{el.fpresent}</Table.Cell>
                  <Table.Cell>{el.flogname}</Table.Cell>
                  <Table.Cell>{el.flogdate}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
