import React, { Component } from "react";
import { Card, Table, Statistic, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { getDashBoardDet } from "../../actions/dashboard";
import { moneyFormatIndia } from "../parms";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getDashBoardDet();
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.user.funivcode, prevProps.user.funivcode);
    if (this.props.user.fcuruniv !== prevProps.user.fcuruniv) {
      this.props.getDashBoardDet();
    }
  }

  render() {
    if (this.props.user.fcurtype == "304") return this.renderPgetDashboard();
    else return this.renderDashboard();
  }

  renderPgetDashboard() {
    const {
      fregcnt,
      fappcnt,
      finalsubcnt,
      fpaidcnt
    } = this.props.dashboard.pget[0];

    const subpget = this.props.dashboard.subpget;
    let total = 0;
    return (
      <div>
        <Card fluid>
          <Header as={"h2"} textAlign="center" style={{ marginTop: "1em" }}>
            Student Counts
          </Header>
          <Statistic.Group widths={3}>
            <Statistic>
              <Statistic.Value>{fregcnt}</Statistic.Value>
              <Statistic.Label>Registered Student</Statistic.Label>
            </Statistic>

            <Statistic>
              <Statistic.Value>{finalsubcnt}</Statistic.Value>
              <Statistic.Label>Applied Sudent Count</Statistic.Label>
            </Statistic>

            <Statistic>
              <Statistic.Value>{fpaidcnt}</Statistic.Value>
              <Statistic.Label>Paid Student Count</Statistic.Label>
            </Statistic>
          </Statistic.Group>

          <Table celled padded selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="6">
                  Degree Wise Student Count
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
                <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                  Degree
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Description
                </Table.HeaderCell>
                <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                  Student Count
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {subpget.map((el, i) => {
                total += parseInt(el.studcount);
                return (
                  <Table.Row key={i}>
                    <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                    <Table.Cell textAlign="center">{el.fdegree1}</Table.Cell>
                    <Table.Cell>{el.fdescpn}</Table.Cell>
                    <Table.Cell textAlign="center">{el.studcount}</Table.Cell>
                  </Table.Row>
                );
              })}
              <Table.Row key={100}>
                <Table.Cell colSpan="3" textAlign="center">
                  <b>Total</b>
                </Table.Cell>
                <Table.Cell textAlign="center">{total}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card>
      </div>
    );
  }

  renderDashboard() {
    console.log(this.props.dashboard);
    const { studinfo } = this.props.dashboard;
    return (
      <div>
        <Table celled padded selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="6">
                Active Students and Colleges
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
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Degree Group
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Description
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Examination
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Active Students
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Active Colleges
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {studinfo.map((el, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                  <Table.Cell textAlign="center">{el.fdeggrp}</Table.Cell>
                  <Table.Cell>{el.fdescpn}</Table.Cell>
                  <Table.Cell>{el.fexamdate}</Table.Cell>
                  <Table.Cell
                    textAlign="right"
                    style={{ paddingRight: "25px" }}
                  >
                    {moneyFormatIndia(el.fstudcount)}
                  </Table.Cell>
                  <Table.Cell
                    textAlign="right"
                    style={{ paddingRight: "25px" }}
                  >
                    {el.fcollcount}
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
    user: state.user,
    dashboard: state.dashboard
  };
};

export default connect(
  mapStateToProps,
  { getDashBoardDet }
)(Dashboard);
