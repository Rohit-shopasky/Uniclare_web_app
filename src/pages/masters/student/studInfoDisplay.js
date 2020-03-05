import React, { Component } from "react";
import { Table, Divider, Item } from "semantic-ui-react";
import "../../../index.css";

export default class StudInfoDisplay extends Component {
  // state = {  }

  renderStudDet() {
    const { masuser, student } = this.props.studet;
    return (
      <Item.Group>
        <Divider />
        <Item>
          <Item.Image
            width="10"
            height="10"
            src={`http://universitysolutions.in/${masuser.ffolder}/${
              student.fphotopath
            }`}
          />
          <Item.Content>
            <Table
              basic="very"
              celled
              collapsing
              columns="16"
              padded
              singleLine
            >
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Name</Table.Cell>
                  <Table.Cell>
                    <b>{student.fname}</b>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Register No.</Table.Cell>
                  <Table.Cell>
                    <b>{masuser.fregno}</b>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Mobile</Table.Cell>
                  <Table.Cell>
                    <b>{masuser.fmobileno}</b>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Email ID</Table.Cell>
                  <Table.Cell>
                    <b>{masuser.femail}</b>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>College</Table.Cell>
                  <Table.Cell>
                    <b>{student.college}</b>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Degree</Table.Cell>
                  <Table.Cell>
                    <b>
                      [{student.fdegree}]{student.degree}
                    </b>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Item.Content>
        </Item>
        <Divider />
      </Item.Group>
    );
  }

  render() {
    // console.log(this.props.masuser, this.props.student);
    const { masuser, student } = this.props.studet;
    if (masuser == null || student == null) return null;
    return this.renderStudDet();
  }
}
