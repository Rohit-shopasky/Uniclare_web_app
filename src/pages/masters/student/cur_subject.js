import React, { Component } from "react";
import { Table } from "semantic-ui-react";

class CurExamSubject extends Component {
  render() {
    const subjects = this.props.subjects;
    console.log(this.props.subjects);
    return (
      <div>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ width: "5%" }} textAlign="center">
                Sl. No.
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Sem / Year
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Subject Code
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Qp Code
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Subject Name
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "5%" }} textAlign="center">
                Pass Month
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "5%" }} textAlign="center">
                Opt. Subject
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "5%" }} textAlign="center">
                Present
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "5%" }} textAlign="center">
                Hall No.
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {subjects.map((el, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                  <Table.Cell textAlign="center">{el.fexamno}</Table.Cell>
                  <Table.Cell>{el.fsubcode}</Table.Cell>
                  <Table.Cell>{el.fqpcode}</Table.Cell>
                  <Table.Cell>{el.fsubname}</Table.Cell>
                  <Table.Cell>{el.fpassmth}</Table.Cell>
                  <Table.Cell>{el.finserted}</Table.Cell>
                  <Table.Cell>{el.fpresent}</Table.Cell>
                  <Table.Cell>{el.fhallno}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default CurExamSubject;
