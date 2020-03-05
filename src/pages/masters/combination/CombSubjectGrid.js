import React, { Component } from "react";
import { Table, Dropdown, Button } from "semantic-ui-react";

class CombSubjectGrid extends Component {
  render() {
    const subs = this.props.opt_subjects;
    const combsubs = this.props.combsubs;

    const sub_options = subs.map((s, i) => {
      return {
        key: i,
        value: s.fsubcode,
        text: `${s.fsubcode} - ${s.fsubname}`
      };
    });

    let tr = [];
    let i = 0;

    combsubs.map((el, j) => {
      tr.push(
        <Table.Row key={j}>
          <Table.Cell textAlign="center">{j + 1}</Table.Cell>

          <Table.Cell textAlign="center" singleLine>
            <Dropdown
              fluid
              search
              selection
              id={j}
              name="fsubcode"
              value={el.fsubcode}
              onChange={(e, data) => this.props.changeSub(data, el, j)}
              placeholder="Sub. Code"
              options={sub_options}
            />
          </Table.Cell>
          <Table.Cell textAlign="center">
            <div className="ui checkbox">
              <input
                type="checkbox"
                name="fdeleted"
                value={el.fdeleted}
                onChange={e => this.props.deleteRow(e, el, j)}
                // @ts-ignore
                checked={el.fdeleted == "true" ? "checked" : null}
              />
              <label> </label>
            </div>
          </Table.Cell>
        </Table.Row>
      );
    });

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <div style={{ display: "flex", width: "100%" }}>
                Combination Subjects
                <div className="ml-auto">
                  <Button
                    basic
                    color="blue"
                    content="Add"
                    icon="plus"
                    onClick={this.props.addSub}
                    size="mini"
                  />
                </div>
              </div>
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell
              style={{ width: "5%" }}
              singleLine
              textAlign="center"
            >
              Sl. No.
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Subject</Table.HeaderCell>
            <Table.HeaderCell
              style={{ width: "5%" }}
              singleLine
              textAlign="center"
            >
              Del.
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{tr}</Table.Body>
      </Table>
    );
  }
}

export default CombSubjectGrid;
