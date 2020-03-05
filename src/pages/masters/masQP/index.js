import React, { Component } from "react";
import { getmasQPDet, savemasQPDet } from "../../../actions/masters/masQP";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { showError, fetchBoards } from "../../../actions";
import {
  Card,
  Button,
  Divider,
  Table,
  Grid,
  Dropdown
} from "semantic-ui-react";
import { wHeight } from "../../parms";
import { changeDet } from "../../../actions/masters/reasonMaster";

class MasQP extends Component {
  state = {};

  //====== fetch the details as the component loads and populate the component =========//
  componentDidMount() {
    console.log("componentDidMount");
    this.props.fetchBoards();
    this.props.getmasQPDet();
  }

  changeCell = async (data, el, i) => {
    //====== change the editable table cell data =======//
    let newdata = {};
    const type = "CHANGE_MASQP";
    newdata = { ...el, [data.name]: data.value };
    await this.props.changeDet(newdata, i, type);
  };

  handleSave = async () => {
    // console.log("save", this.props.masQPDet);
    await this.props.savemasQPDet();
    //======= reload component to display the updated values =======//
    await this.props.getmasQPDet();
  };

  render() {
    // console.log("state", this.props.masQPDet, this.props.board);
    const wheight = wHeight();
    const QPDet = this.props.masQPDet == "" ? [] : this.props.masQPDet;
    const board_options = this.props.board.map((el, i) => {
      return {
        key: i,
        value: el.fboardcode,
        text: `${el.fboardcode}- ${el.fboardname}`
      };
    });
    return (
      <>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h3>QP Master</h3>
              <div className="ml-auto">
                <Button
                  basic
                  color="blue"
                  icon="save"
                  onClick={this.handleSave}
                  content="Save"
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
              <Grid divided="vertically" className="mt-3 ml-2">
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <Table celled compact style={{ padding: "0%" }}>
                      <Table.Header>
                        <Table.Row textAlign="center">
                          <Table.HeaderCell width="1">Sl. No.</Table.HeaderCell>
                          <Table.HeaderCell width="1">QP Code</Table.HeaderCell>
                          <Table.HeaderCell width="3">Subject</Table.HeaderCell>
                          <Table.HeaderCell width="1">
                            Exam Name
                          </Table.HeaderCell>
                          <Table.HeaderCell width="3">
                            Board Name
                          </Table.HeaderCell>
                          <Table.HeaderCell>Deg. Group</Table.HeaderCell>
                          <Table.HeaderCell>Deg. Range</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {QPDet.map((el, i) => {
                          return (
                            <Table.Row key={i}>
                              <Table.Cell textAlign="center">
                                {i + 1}
                              </Table.Cell>
                              <Table.Cell
                                style={{ padding: "0px 0px" }}
                                textAlign="center"
                              >
                                {el.fqpcode}
                              </Table.Cell>
                              <Table.Cell style={{ padding: "0px 0px" }}>
                                {el.fsubname}
                              </Table.Cell>
                              <Table.Cell
                                style={{ padding: "0px 0px" }}
                                textAlign="center"
                              >
                                {el.fexamno}
                              </Table.Cell>
                              <Table.Cell style={{ padding: "0px 0px" }}>
                                <Dropdown
                                  fluid
                                  search
                                  selection
                                  name="fboard"
                                  value={el.fboard}
                                  onChange={(e, data) => {
                                    console.log("i hit");
                                    this.changeCell(data, el, i);
                                  }}
                                  style={{ height: "auto" }}
                                  placeholder="Board"
                                  options={board_options}
                                />
                              </Table.Cell>
                              <Table.Cell
                                style={{ padding: "0px 0px" }}
                                textAlign="center"
                              >
                                {el.fdeggrp}
                              </Table.Cell>
                              <Table.Cell style={{ padding: "0px 0px" }}>
                                {el.fdegreerange}
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
    masQPDet: state.masQPDet,
    board: state.board
  };
};
export default connect(
  mapStatetoProps,
  {
    getmasQPDet,
    showError,
    fetchBoards,
    changeDet,
    savemasQPDet
  }
)(MasQP);
