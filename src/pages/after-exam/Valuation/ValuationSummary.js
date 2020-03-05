import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Divider, Input, Card, Button, Label } from "semantic-ui-react";
import { showError } from "../../../actions";
import { fetchQpStatisticsSum } from "../../../actions/after-exam/valuation";
//
import { moneyFormatIndia } from "../../parms";
import { wHeight } from "../../parms";

class ValuationSummary extends Component {
  state = { qpstatsum: [], searchVal: "" };

  componentDidMount() {
    this.props.fetchQpStatisticsSum();
    // this.setState({ qpstatsum: this.props.qpstatsum, searchVal: "" });
  }

  componentDidUpdate(prevProps) {
    if (this.props.qpstatsum !== prevProps.qpstatsum) {
      this.setState({ qpstatsum: this.props.qpstatsum, searchVal: "" });
    }
  }

  searchTable = (e, data) => {
    const string = data.value;
    const searchqpstatsum = this.props.qpstatsum.filter(o =>
      Object.keys(o).some(k =>
        o[k].toLowerCase().includes(string.toLowerCase())
      )
    );
    this.setState({ qpstatsum: searchqpstatsum, searchVal: data.value });
  };
  render() {
    const qpstatsum = this.state.qpstatsum;

    const wheight = wHeight();
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h3>Valuation Summary</h3>
              <div className="ml-auto">
                {/* <Button
                  basic
                  color="blue"
                  onClick={this.handleReport}
                  content="Report"
                  icon="file"
                /> */}
                <Button
                  basic
                  color="black"
                  icon="ban"
                  onClick={this.handleCancel}
                  content="Cancel"
                />
                <Link to="/dashboard">
                  <Button basic color="red" content="Exit" icon="home" />
                </Link>
              </div>
            </Card.Header>
            <Divider />
            <Card.Description
              style={{ overflowY: "auto", height: `${wheight}px` }}
            >
              <div>
                <div
                  style={{
                    margin: "1em 0em",
                    backgroundColor: "white"
                  }}
                  className="stick"
                >
                  <Input
                    icon="search"
                    fluid
                    placeholder="Search..."
                    value={this.state.searchVal}
                    onChange={this.searchTable}
                  />
                </div>
                <Table
                  padded
                  celled
                  structured
                  striped
                  selectable
                  style={{ overflowX: "scroll !important" }}
                >
                  {this.props.user.fdeggrp === "PG" ? (
                    <Table.Header
                      style={{ backgroundColor: "bule !important" }}
                    >
                      <Table.Row>
                        <Table.HeaderCell
                          style={{ width: "5%" }}
                          singleLine
                          textAlign="center"
                          rowSpan="2"
                        >
                          Sl. No.
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "10%" }}
                          textAlign="center"
                          rowSpan="2"
                        >
                          Board Code
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "40%" }}
                          textAlign="center"
                          rowSpan="2"
                        >
                          Board Name
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center" colSpan="3">
                          Preparation
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center" colSpan="4">
                          First Valuation
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center" colSpan="4">
                          Second Valuation
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center" colSpan="4">
                          Third Valuation
                        </Table.HeaderCell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Script Recd.
                        </Table.HeaderCell>

                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Script Coded
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Coding Pending
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Pkts. Count
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Pkts. Valued
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Valuation Pending
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "15%" }}
                          textAlign="center"
                        >
                          Status
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Pkts. Count
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Pkts. Valued
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Valuation Pending
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "15%" }}
                          textAlign="center"
                        >
                          Status
                        </Table.HeaderCell>

                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Pkts. Count
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Pkts. Valued
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Valuation Pending
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "15%" }}
                          textAlign="center"
                        >
                          Status
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                  ) : (
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell
                          style={{ width: "5%" }}
                          singleLine
                          textAlign="center"
                          rowSpan="2"
                        >
                          Sl. No.
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "10%" }}
                          textAlign="center"
                          rowSpan="2"
                        >
                          Board Code
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "40%" }}
                          textAlign="center"
                          rowSpan="2"
                        >
                          Board Name
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center" colSpan="3">
                          Preparation
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center" colSpan="4">
                          Valuation
                        </Table.HeaderCell>
                      </Table.Row>
                      <Table.Row>
                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Script Recd.
                        </Table.HeaderCell>

                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Script Coded
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Coding Pending
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Pkts. Count
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Pkts. Valued
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "12%" }}
                          textAlign="center"
                        >
                          Valuation Pending
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "15%" }}
                          textAlign="center"
                        >
                          Status
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                  )}

                  <Table.Body>
                    {qpstatsum.map((el, i) => {
                      return this.props.user.fdeggrp === "PG" ? (
                        <Table.Row key={i}>
                          <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                          <Table.Cell textAlign="center">
                            {el.fboard}
                          </Table.Cell>
                          <Table.Cell>{el.fboardname}</Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.fapresent)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.fcodecount)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.fcodepend)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.ftotpkt)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.fvalpkt)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.fpend)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {el.fpend == 0 ? (
                              <Label color="green" horizontal>
                                completed
                              </Label>
                            ) : (
                              <Label color="orange" horizontal>
                                pending
                              </Label>
                            )}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.ftotpkt1)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.fvalpkt1)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.fpend1)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {el.fpend1 == 0 ? (
                              <Label color="green" horizontal>
                                completed
                              </Label>
                            ) : (
                              <Label color="orange" horizontal>
                                pending
                              </Label>
                            )}
                          </Table.Cell>

                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.ftotpkt3)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.fvalpkt3)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.fpend3)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {el.fpend3 == 0 ? (
                              <Label color="green" horizontal>
                                completed
                              </Label>
                            ) : (
                              <Label color="orange" horizontal>
                                pending
                              </Label>
                            )}
                          </Table.Cell>
                        </Table.Row>
                      ) : (
                        <Table.Row key={i}>
                          <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                          <Table.Cell textAlign="center">
                            {el.fboard}
                          </Table.Cell>
                          <Table.Cell>{el.fboardname}</Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.fapresent)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.fcodecount)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.fcodepend)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.ftotpkt)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.fvalpkt)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {moneyFormatIndia(el.fpend)}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {el.fpend == 0 ? (
                              <Label color="green" horizontal>
                                completed
                              </Label>
                            ) : (
                              <Label color="orange" horizontal>
                                pending
                              </Label>
                            )}
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
  return { qpstatsum: state.qpstatsum, user: state.user };
};

export default connect(
  mapStateToProps,
  { showError, fetchQpStatisticsSum }
)(ValuationSummary);
