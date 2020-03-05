import React, { Component } from "react";
import { Button, Form, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { showError } from "../../../../actions";
import { changeSublvl, addRow } from "../../../../actions/masters/subEntryScrn";

class SubjectDet extends Component {
  state = {};

  changeCell = (data, el, i) => {
    let newdata = {};
    if (data.type == "checkbox") {
      const value = data.checked ? "T" : "F";
      newdata = { ...el, [data.name]: value };
      this.props.changeSublvl(newdata, i);
    } else {
      newdata = { ...el, [data.name]: data.value };
      this.props.changeSublvl(newdata, i);
    }
  };

  add = async () => {
    let i = this.props.subjectData.sublvl.length;
    const el = this.props.subjectData.sublvl[i - 1];

    if (el.fssubcode === "" || el.fssubname === "") {
      const error = {
        header: "Error",
        content: "Fill Details to Add next Row. "
      };
      this.props.showError(error);
      return;
    }
    const type = "ADD_SUBLVL";
    await this.props.addRow(type);
    this.setState({ fssubcodeDis: false });
  };
  render() {
    const Sublvl = this.props.subjectData.sublvl;
    const disabledStats = this.props.disabledStats;

    return (
      <div style={{ overflowX: "scroll" }} className="mt-5">
        <Table celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="16" textAlign="right">
                <Button
                  basic
                  size="small"
                  onClick={this.add}
                  color="green"
                  icon="plus"
                  content="Add"
                  // className="ml-3 p-2"
                />
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row textAlign="center">
              <Table.HeaderCell width="1">Code</Table.HeaderCell>
              <Table.HeaderCell width="9">Description</Table.HeaderCell>
              <Table.HeaderCell width="1">Short Name</Table.HeaderCell>
              <Table.HeaderCell width="1">Th</Table.HeaderCell>
              <Table.HeaderCell width="1">IA/ Viva</Table.HeaderCell>
              <Table.HeaderCell width="4">Retain Marks?</Table.HeaderCell>
              <Table.HeaderCell width="1">Group</Table.HeaderCell>
              <Table.HeaderCell width="1">Max. Marks</Table.HeaderCell>
              <Table.HeaderCell width="1">Min. Marks</Table.HeaderCell>
              <Table.HeaderCell width="1">Parent Sub</Table.HeaderCell>
              <Table.HeaderCell width="1">Mod Marks</Table.HeaderCell>
              <Table.HeaderCell width="1">Grace</Table.HeaderCell>
              <Table.HeaderCell width="1">Code No.</Table.HeaderCell>
              <Table.HeaderCell width="1">QP Code</Table.HeaderCell>
              <Table.HeaderCell width="1">Val Max</Table.HeaderCell>
              <Table.HeaderCell width="1">Del?</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Sublvl.map((el, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell style={{ padding: "0px 0px" }} textAlign="center">
                    <Form.Input
                      style={{ width: "50px" }}
                      type="text"
                      value={el.fssubcode}
                      name="fssubcode"
                      readOnly={disabledStats}
                      onChange={(e, data) => this.changeCell(data, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell style={{ padding: "0px 0px" }}>
                    <Form.Input
                      type="text"
                      value={el.fssubname}
                      style={{ width: "100%" }}
                      name="fssubname"
                      onChange={(e, data) => this.changeCell(data, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell style={{ padding: "0px 0px" }}>
                    <Form.Input
                      type="text"
                      name="fshortname"
                      value={el.fshortname}
                      style={{ width: "70px" }}
                      onChange={(e, data) => this.changeCell(data, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center" style={{ padding: "0px 0px" }}>
                    <Form.Checkbox
                      value="T"
                      name="ftheory"
                      checked={el.ftheory == "T"}
                      onChange={(e, data) => this.changeCell(data, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center" style={{ padding: "0px 0px" }}>
                    <Form.Checkbox
                      value="T"
                      name="fintass"
                      checked={el.fintass == "T"}
                      onChange={(e, data) => this.changeCell(data, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center" style={{ padding: "0px 0px" }}>
                    <Form.Checkbox
                      value="T"
                      name="fretain"
                      onChange={(e, data) => this.changeCell(data, el, i)}
                      checked={el.fretain == "T"}
                    />
                  </Table.Cell>
                  <Table.Cell style={{ padding: "0px 0px" }}>
                    <Form.Input
                      type="text"
                      name="fgroup"
                      value={el.fgroup}
                      style={{ width: "70px" }}
                      maxLength={1}
                      onChange={(e, data) => this.changeCell(data, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell style={{ padding: "0px 0px" }}>
                    <Form.Input
                      type="text"
                      name="fsmaxmarks"
                      value={el.fsmaxmarks}
                      style={{ width: "100px" }}
                      onChange={(e, data) => this.changeCell(data, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell style={{ padding: "0px 0px" }}>
                    <Form.Input
                      type="text"
                      name="fsminmarks"
                      value={el.fsminmarks}
                      style={{ width: "100px" }}
                      onChange={(e, data) => this.changeCell(data, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell style={{ padding: "0px 0px" }}>
                    <Form.Input
                      type="text"
                      name="fparentsub"
                      value={el.fparentsub}
                      style={{ width: "70px" }}
                      onChange={(e, data) => this.changeCell(data, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell style={{ padding: "0px 0px" }}>
                    <Form.Input
                      type="text"
                      name="fmodmarks"
                      value={el.fmodmarks}
                      style={{ width: "60px" }}
                      onChange={(e, data) => this.changeCell(data, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center" style={{ padding: "0px 0px" }}>
                    <Form.Checkbox
                      value="T"
                      name="fgrace"
                      checked={el.fgrace == "T"}
                      onChange={(e, data) => this.changeCell(data, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center" style={{ padding: "0px 0px" }}>
                    <Form.Checkbox
                      value="T"
                      name="fcodeno"
                      checked={el.fcodeno == "T"}
                      onChange={(e, data) => this.changeCell(data, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell style={{ padding: "0px 0px" }}>
                    <Form.Input
                      type="text"
                      name="fqpcode"
                      value={el.fqpcode}
                      style={{ width: "100px" }}
                      onChange={(e, data) => this.changeCell(data, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell style={{ padding: "0px 0px" }}>
                    <Form.Input
                      type="text"
                      name="fvalmax"
                      value={el.fvalmax}
                      style={{ width: "50px" }}
                      onChange={(e, data) => this.changeCell(data, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center" style={{ padding: "0px 0px" }}>
                    <Form.Checkbox
                      value="T"
                      name="fdeleted"
                      checked={el.fdeleted == "T"}
                      onChange={(e, data) => this.changeCell(data, el, i)}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    subjectData: state.subjectData
  };
};
export default connect(
  mapStateToProps,
  {
    showError,
    changeSublvl,
    addRow
  }
)(SubjectDet);
