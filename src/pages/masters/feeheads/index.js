import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Divider, Table, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { getFeeHeads, saveFeeHeads } from "../../../actions/finance/fee-str";
import { showError } from "../../../actions";
//
import { wHeight } from "../../parms";

class CreateFeeHead extends Component {
  state = {
    feeheads: [
      {
        fmcombcode: "",
        ffeecode: "",
        fdescpn: "",
        fshortname: "",
        fsequence: "",
        fdeleted: false,
        fdisabled: false
      }
    ],
    error: false,
    errorMessage: "",
    del_deggrp: []
  };

  componentDidMount() {
    this.props.getFeeHeads();
  }

  componentDidUpdate(prevProps) {
    if (this.props.feeheads !== prevProps.feeheads) {
      this.setState({ feeheads: [...this.props.feeheads] });
    }
  }

  changeCell = (e, el, i) => {
    const feeheads = this.state.feeheads;
    let arra = feeheads.map((item, j) => {
      let data = item;
      if (j === i) {
        data = { ...el, [e.target.name]: e.target.value };
      }
      return data;
    });
    this.setState({ feeheads: arra });
  };

  deleteRow = (e, el, i) => {
    const feeheads = this.state.feeheads;
    let arra = feeheads.map((item, j) => {
      let data = item;
      if (j === i) {
        data = { ...el, [e.target.name]: e.target.checked };
      }
      return data;
    });
    this.setState({ feeheads: arra });
  };

  addRow = () => {
    let i = this.state.feeheads.length - 1;
    const el = this.state.feeheads[i];
    if (
      el.fmcombcode === "" ||
      el.ffeecode === "" ||
      el.fdescpn === "" ||
      el.fshortname === "" ||
      el.fsequence === ""
    ) {
      const error = { header: "Error", content: "Enter the values" };
      this.props.showError(error);
      return;
    }

    const item = {
      fmcombcode: "",
      ffeecode: "",
      fdescpn: "",
      fshortname: "",
      fsequence: "",
      fdeleted: false,
      fdisabled: false
    };
    this.setState({ feeheads: [...this.state.feeheads, item] });
  };

  handleSave = async () => {
    if (this.state.feeheads.length <= 1) {
      const error = { header: "Error", content: "Enter the values" };
      this.props.showError(error);
      return;
    }

    for (let i = 0; i < this.state.feeheads.length; i++) {
      let el = this.state.feeheads[i];
      if (
        el.ffeecode === "" ||
        el.fdescpn === "" ||
        el.fshortname === "" ||
        el.fsequence === ""
      ) {
        const error = { header: "Error", content: "Enter all the values" };
        this.props.showError(error);
        return;
      }
    }
    await this.props.saveFeeHeads(this.state.feeheads);

    this.props.getFeeHeads();
  };

  render() {
    const { feeheads, error, errorMessage } = this.state;
    const arlength = feeheads.length;
    const wheight = wHeight();
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Create Fee Head</h4>
              <div className="ml-auto">
                <Button
                  basic
                  color="blue"
                  content="Add"
                  icon="plus"
                  onClick={this.addRow}
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
              {error ? (
                <Message negative>
                  <Message.Header> {errorMessage} </Message.Header>
                </Message>
              ) : null}
              <div className="ui mini form">
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell
                        style={{ width: "5%" }}
                        singleLine
                        textAlign="center"
                      >
                        Sl. No.
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        style={{ width: "10%" }}
                        textAlign="center"
                      >
                        Module
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        style={{ width: "20%" }}
                        textAlign="center"
                      >
                        Fee Code
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        Description
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        style={{ width: "10%" }}
                        textAlign="center"
                      >
                        Short Name
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        style={{ width: "5%" }}
                        textAlign="center"
                      >
                        Sequence
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        style={{ width: "10%" }}
                        textAlign="center"
                      >
                        Del
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {feeheads.map((el, i) => {
                      return (
                        <Table.Row key={i}>
                          <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                          <Table.Cell textAlign="center" singleLine>
                            <input
                              className="field"
                              type="text"
                              name="fmcombcode"
                              id={i}
                              value={el.fmcombcode}
                              disabled={el.fdisabled == "true" ? true : false}
                              onChange={e => this.changeCell(e, el, i)}
                            />
                          </Table.Cell>
                          <Table.Cell textAlign="center" singleLine>
                            <input
                              className="field"
                              type="text"
                              name="ffeecode"
                              id={i}
                              value={el.ffeecode}
                              disabled={el.fdisabled == "true" ? true : false}
                              onChange={e => this.changeCell(e, el, i)}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <input
                              type="text"
                              value={el.fdescpn}
                              name="fdescpn"
                              id={i}
                              onChange={e => this.changeCell(e, el, i)}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <input
                              type="text"
                              style={{ textAlign: "center" }}
                              value={el.fshortname}
                              name="fshortname"
                              id={i}
                              onChange={e => this.changeCell(e, el, i)}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <input
                              type="text"
                              style={{ textAlign: "center" }}
                              value={el.fsequence}
                              name="fsequence"
                              id={i}
                              onChange={e => this.changeCell(e, el, i)}
                            />
                          </Table.Cell>

                          <Table.Cell textAlign="center">
                            {arlength === i + 1 ? (
                              <div className="ui checkbox">
                                <input
                                  type="checkbox"
                                  onKeyDown={e => {
                                    if (e.keyCode === 9) this.addRow();
                                  }}
                                  name="fdeleted"
                                  value={el.fdeleted}
                                  onChange={e => this.deleteRow(e, el, i)}
                                  checked={
                                    el.fdeleted == "true" ? "checked" : null
                                  }
                                />
                                <label> </label>
                              </div>
                            ) : (
                              <div className="ui checkbox">
                                <input
                                  type="checkbox"
                                  name="fdeleted"
                                  value={el.fdeleted}
                                  onChange={e => this.deleteRow(e, el, i)}
                                  checked={
                                    el.fdeleted == "true" ? "checked" : null
                                  }
                                />
                                <label> </label>
                              </div>
                            )}

                            {/* <Button size='mini' color="red" icon='trash' content="Delete"/> */}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    feeheads: state.feeheads
  };
};

export default connect(
  mapStateToProps,
  {
    getFeeHeads,
    showError,
    saveFeeHeads
  }
)(CreateFeeHead);
