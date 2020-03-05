import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Divider, Input } from "semantic-ui-react";
import { showError } from "../../../actions";
import { moneyFormatIndia } from "../../parms";

class StatTable extends Component {
  state = {
    qpstat: [],
    searchVal: ""
  };

  componentDidMount() {
    this.setState({ qpstat: this.props.qpstat, searchVal: "" });
  }

  componentDidUpdate(prevProps) {
    if (this.props.qpstat !== prevProps.qpstat) {
      this.setState({ qpstat: this.props.qpstat, searchVal: "" });
    }
  }

  searchTable = (e, data) => {
    const string = data.value;
    const searchqpstat = this.props.qpstat.filter(o => Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
    this.setState({ qpstat: searchqpstat, searchVal: data.value });
  };
  render() {
    const qpstat = this.state.qpstat;

    return (
      <div>
        <Divider />
        <div style={
          {
            margin: "1em 0em",
            backgroundColor: "white"
          }
        }
          className="stick">
          <Input icon="search" fluid placeholder="Search..."
            value={
              this.state.searchVal
            }
            onChange={
              this.searchTable
            } />
        </div>
        <Table celled compact>
          <Table.Header> {
            this.props.user.fdeggrp === "PG" ? (
              <>
                <Table.Row>
                  <Table.HeaderCell style={
                    { width: "5%" }
                  }
                    singleLine
                    rowSpan='2'
                    textAlign="center">
                    Sl. No.
                                    </Table.HeaderCell>
                  <Table.HeaderCell style={
                    { width: "10%" }
                  }
                    textAlign="center"
                    rowSpan='2'>
                    Qp. Code
                                    </Table.HeaderCell>
                  <Table.HeaderCell style={
                    { width: "40%" }
                  }
                    rowSpan='2'
                    textAlign="center">
                    Subject Name
                                    </Table.HeaderCell>
                  <Table.HeaderCell colSpan='4' textAlign="center">
                    Preparation
                                    </Table.HeaderCell>
                  <Table.HeaderCell colSpan='3' textAlign="center">
                    First  Valuation
                                    </Table.HeaderCell>

                  <Table.HeaderCell colSpan='3' textAlign="center">
                    Second Valuation
                                    </Table.HeaderCell>

                  <Table.HeaderCell colSpan='3' textAlign="center">
                    Third Valuation
                                    </Table.HeaderCell>

                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell style={
                    { width: "8%" }
                  }
                    textAlign="center">
                    Script Recd.
                                    </Table.HeaderCell>
                  <Table.HeaderCell style={
                    { width: "8%" }
                  }

                    textAlign="center">
                    Script Counted
                                    </Table.HeaderCell>
                  <Table.HeaderCell style={
                    { width: "8%" }
                  }
                    textAlign="center">
                    Script Coded
                                    </Table.HeaderCell>
                  <Table.HeaderCell style={
                    { width: "8%" }
                  }
                    textAlign="center">
                    Coding Pending
                                    </Table.HeaderCell>
                  <Table.HeaderCell style={
                    { width: "8%" }
                  }
                    textAlign="center">
                    Pkt. Count
                                    </Table.HeaderCell>
                  <Table.HeaderCell style={
                    { width: "8%" }
                  }
                    textAlign="center">
                    Pkt. Valued
                                    </Table.HeaderCell>
                  <Table.HeaderCell style={
                    { width: "8%" }
                  }
                    textAlign="center">
                    Pkt. Pending
                                    </Table.HeaderCell>
                  <Table.HeaderCell style={
                    { width: "8%" }
                  }
                    textAlign="center">
                    Pkt. Count
                                    </Table.HeaderCell>
                  <Table.HeaderCell style={
                    { width: "8%" }
                  }
                    textAlign="center">
                    Pkt. Valued
                                    </Table.HeaderCell>
                  <Table.HeaderCell style={
                    { width: "8%" }
                  }
                    textAlign="center">
                    Pkt. Pending
                                    </Table.HeaderCell>

                  <Table.HeaderCell style={
                    { width: "8%" }
                  }
                    textAlign="center">
                    Pkt. Count
                                    </Table.HeaderCell>
                  <Table.HeaderCell style={
                    { width: "8%" }
                  }
                    textAlign="center">
                    Pkt. Valued
                                    </Table.HeaderCell>
                  <Table.HeaderCell style={
                    { width: "8%" }
                  }
                    textAlign="center">
                    Pkt. Pending
                                    </Table.HeaderCell>
                </Table.Row>

              </>
            ) : (
                <>
                  <Table.Row>
                    <Table.HeaderCell style={
                      { width: "5%" }
                    }
                      singleLine
                      rowSpan='2'
                      textAlign="center">
                      Sl. No.
                                    </Table.HeaderCell>
                    <Table.HeaderCell style={
                      { width: "10%" }
                    }
                      rowSpan='2'
                      textAlign="center">
                      Qp. Code
                                    </Table.HeaderCell>
                    <Table.HeaderCell style={
                      { width: "40%" }
                    }
                      rowSpan='3'
                      textAlign="center">
                      Subject Name
                                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan='4' textAlign="center">
                      Preparation
                                    </Table.HeaderCell>

                    <Table.HeaderCell colSpan='3' textAlign="center">
                      Valuation
                                    </Table.HeaderCell>
                  </Table.Row>

                  <Table.Row>
                    <Table.HeaderCell style={
                      { width: "10%" }
                    }
                      textAlign="center">
                      Script Recd.
                                    </Table.HeaderCell>
                    <Table.HeaderCell style={
                      { width: "10%" }
                    }
                      textAlign="center">
                      Script Counted
                                    </Table.HeaderCell>
                    <Table.HeaderCell style={
                      { width: "10%" }
                    }
                      textAlign="center">
                      Script Coded
                                    </Table.HeaderCell>
                    <Table.HeaderCell style={
                      { width: "10%" }
                    }
                      textAlign="center">
                      Coding Pending
                                    </Table.HeaderCell>

                    <Table.HeaderCell style={
                      { width: "10%" }
                    }
                      textAlign="center">
                      Packets Count
                                    </Table.HeaderCell>
                    <Table.HeaderCell style={
                      { width: "10%" }
                    }
                      textAlign="center">
                      Packets Valued
                                    </Table.HeaderCell>
                    <Table.HeaderCell style={
                      { width: "10%" }
                    }
                      textAlign="center">
                      Valuation Pending
                                    </Table.HeaderCell>
                  </Table.Row>
                </>
              )
          } </Table.Header>
          <Table.Body> {
            qpstat.map((el, i) => {
              return this.props.user.fdeggrp === "PG" ? (
                <Table.Row key={i}>
                  <Table.Cell textAlign="center">
                    {
                      i + 1
                    }</Table.Cell>
                  <Table.Cell textAlign="center">
                    {
                      el.fqpcode
                    }</Table.Cell>
                  <Table.Cell>{
                    el.fsubname
                  }</Table.Cell>
                  <Table.Cell textAlign="center">
                    {
                      moneyFormatIndia(el.fspresent)
                    } </Table.Cell>
                  <Table.Cell textAlign="center">
                    {
                      moneyFormatIndia(el.fapresent)
                    } </Table.Cell>
                  <Table.Cell textAlign="center">
                    {
                      moneyFormatIndia(el.fcodecount)
                    } </Table.Cell>
                  <Table.Cell textAlign="center">
                    {
                      moneyFormatIndia(el.fapresent - el.fcodecount < 0 ? 0 : el.fapresent - el.fcodecount)
                    } </Table.Cell>
                  <Table.Cell textAlign="center">
                    {
                      moneyFormatIndia(el.ftotpkt1)
                    } </Table.Cell>
                  <Table.Cell textAlign="center">
                    {
                      moneyFormatIndia(el.fvalpkt1)
                    } </Table.Cell>
                  <Table.Cell textAlign="center">
                    {
                      moneyFormatIndia(el.ftotpkt1 - el.fvalpkt1 < 0 ? 0 : el.ftotpkt1 - el.fvalpkt1)
                    } </Table.Cell>
                  <Table.Cell textAlign="center">
                    {
                      moneyFormatIndia(el.ftotpkt2)
                    } </Table.Cell>
                  <Table.Cell textAlign="center">
                    {
                      moneyFormatIndia(el.fvalpkt2)
                    } </Table.Cell>
                  <Table.Cell textAlign="center">
                    {
                      moneyFormatIndia(el.ftotpkt1 - el.fvalpkt2 < 0 ? 0 : el.ftotpkt1 - el.fvalpkt2)
                    } </Table.Cell>


                  <Table.Cell textAlign="center">
                    {
                      moneyFormatIndia(el.ftotpkt3)
                    } </Table.Cell>
                  <Table.Cell textAlign="center">
                    {
                      moneyFormatIndia(el.fvalpkt3)
                    } </Table.Cell>
                  <Table.Cell textAlign="center">
                    {
                      moneyFormatIndia(el.ftotpkt2 - el.fvalpkt3 < 0 ? 0 : el.ftotpkt2 - el.fvalpkt3)
                    } </Table.Cell>


                </Table.Row>
              ) : (
                  <Table.Row key={i}>
                    <Table.Cell textAlign="center">
                      {
                        i + 1
                      }</Table.Cell>
                    <Table.Cell textAlign="center">
                      {
                        el.fqpcode
                      }</Table.Cell>
                    <Table.Cell>{
                      el.fsubname
                    }</Table.Cell>
                    <Table.Cell textAlign="center">
                      {
                        moneyFormatIndia(el.fspresent)
                      } </Table.Cell>
                    <Table.Cell textAlign="center">
                      {
                        moneyFormatIndia(el.fapresent)
                      } </Table.Cell>
                    <Table.Cell textAlign="center">
                      {
                        moneyFormatIndia(el.fcodecount)
                      } </Table.Cell>
                    <Table.Cell textAlign="center">
                      {
                        moneyFormatIndia(el.fapresent - el.fcodecount < 0 ? 0 : el.fapresent - el.fcodecount)
                      } </Table.Cell>
                    <Table.Cell textAlign="center">
                      {
                        moneyFormatIndia(el.ftotpkt1)
                      } </Table.Cell>
                    <Table.Cell textAlign="center">
                      {
                        moneyFormatIndia(el.fvalpkt1)
                      } </Table.Cell>
                    <Table.Cell textAlign="center">
                      {
                        moneyFormatIndia(el.ftotpkt1 - el.fvalpkt1 < 0 ? 0 : el.ftotpkt1 - el.fvalpkt1)
                      } </Table.Cell>
                  </Table.Row>
                );
            })
          } </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { qpstat: state.qpstat, user: state.user };
};

export default connect(mapStateToProps, { showError })(StatTable);
