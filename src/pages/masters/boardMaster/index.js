import React, { Component } from "react";
import { Card, Form, Button, Divider, Table, Grid } from "semantic-ui-react";
import { changeDet } from "../../../actions/masters/reasonMaster";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { showError, fetchBoards } from "../../../actions";
import {
  getBoardLists,
  saveBoardMaster
} from "../../../actions/masters/boardMaster";
import { addRow } from "../../../actions/masters/subEntryScrn";
import { wHeight } from "../../parms";
class BoardMaster extends Component {
  state = { codeDis: true };

  async componentDidMount() {
    await this.props.getBoardLists();
  }

  changeCell = (data, el, i) => {
    // console.log("CELLL", data, el);
    let newdata = {};
    const type = "CHANGE_BOARDDET";
    if (data.type == "checkbox") {
      const value = data.checked ? "T" : "F";
      newdata = { ...el, [data.name]: value };
      this.props.changeDet(newdata, i, type);
    } else {
      newdata = { ...el, [data.name]: data.value };
      this.props.changeDet(newdata, i, type);
    }
  };

  handleSave = () => this.showErr();

  showErr = async () => {
    const emptyCount = this.props.boardList.filter(
      (el, i) => el.fboardname == ""
    );
    if (emptyCount.length > 0) {
      const error = {
        header: "Error",
        content: "Fill Details Before saving. "
      };
      this.props.showError(error);
      return;
    } else {
      await this.props.saveBoardMaster();
      this.props.getBoardLists();
    }
    // return;
  };

  add = async () => {
    let i = this.props.boardList.length;
    const el = this.props.boardList[i - 1];

    if (el.fboardcode === "" || el.fboardname === "") {
      const error = {
        header: "Error",
        content: "Fill Details to Add next Row. "
      };
      this.props.showError(error);
      return;
    }
    const type = "ADD_BOARDS";
    await this.props.addRow(type);
    // this.setState({ codeDis: false });
  };

  render() {
    const boardDet = this.props.boardList;
    const wheight = wHeight();
    return (
      <>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h3>Board Master</h3>
              <div className="ml-auto">
                <Button
                  basic
                  size="small"
                  onClick={this.add}
                  color="blue"
                  icon="plus"
                  content="Add"
                />
                <Button
                  basic
                  color="green"
                  content="Save"
                  onClick={this.handleSave}
                  icon="save"
                />
                <Link to="/dashboard">
                  <Button basic color="red" content="Exit" icon="home" />
                </Link>
              </div>
            </Card.Header>
            <Divider />
            <Card.Description
              style={{ height: `${wheight}px`, overflowY: "auto" }}
            >
              <Grid divided="vertically" className="mt-3">
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <Table celled compact style={{ padding: "0%" }}>
                      <Table.Header>
                        <Table.Row textAlign="center">
                          <Table.HeaderCell width="1">Sl. No.</Table.HeaderCell>
                          <Table.HeaderCell width="2">Code</Table.HeaderCell>
                          <Table.HeaderCell width="12">
                            Description
                          </Table.HeaderCell>
                          <Table.HeaderCell width="1">Del</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {boardDet.map((el, i) => {
                          return (
                            <Table.Row>
                              <Table.Cell textAlign="center">
                                {i + 1}
                              </Table.Cell>
                              <Table.Cell style={{ padding: "0px 0px" }}>
                                <Form.Input
                                  placeholder="Code"
                                  className="center"
                                  value={el.fboardcode}
                                  style={{ width: "65px", textAlign: "center" }}
                                  name="fboardcode"
                                  textAlign="center"
                                  maxLength={4}
                                  readOnly={
                                    el.fedit == undefined ? true : false
                                  }
                                  onChange={(e, data) =>
                                    this.changeCell(data, el, i)
                                  }
                                />
                              </Table.Cell>
                              <Table.Cell style={{ padding: "0px 0px" }}>
                                <Form.Input
                                  placeholder="Board Name"
                                  value={el.fboardname}
                                  style={{ width: "100%" }}
                                  name="fboardname"
                                  onChange={(e, data) =>
                                    this.changeCell(data, el, i)
                                  }
                                />
                              </Table.Cell>
                              <Table.Cell
                                style={{ padding: "0px 0px" }}
                                textAlign="center"
                              >
                                {boardDet.length == i + 1 ? (
                                  <Form.Checkbox
                                    value={el.fdeleted}
                                    name="fdeleted"
                                    checked={el.fdeleted == "T"}
                                    onChange={(e, data) =>
                                      this.changeCell(data, el, i)
                                    }
                                    onKeyDown={e => {
                                      e.preventDefault();
                                      if (e.keyCode === 9) this.add();
                                    }}
                                  />
                                ) : (
                                  <Form.Checkbox
                                    value={el.fdeleted}
                                    name="fdeleted"
                                    checked={el.fdeleted == "T"}
                                    onChange={(e, data) =>
                                      this.changeCell(data, el, i)
                                    }
                                  />
                                )}
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Description>
          </Card.Content>
        </Card>
      </>
    );
  }
}

const mapStatetoProps = state => {
  return {
    board: state.board,
    boardList: state.boardList
  };
};
export default connect(
  mapStatetoProps,
  {
    fetchBoards,
    getBoardLists,
    changeDet,
    saveBoardMaster,
    showError,
    addRow
  }
)(BoardMaster);
