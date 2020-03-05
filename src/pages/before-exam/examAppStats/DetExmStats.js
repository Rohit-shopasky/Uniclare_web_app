import React, { Component } from "react";
import { showError } from "../../../actions";
import { wHeight } from "../../parms";
import { Card, Divider, Button, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class DetExamStats extends Component {
  state = {};

  handleReturn = () => {
    let path = "/before-exam/examAppStats";

    this.props.history.push(path);
  };
  render() {
    let stats = this.props.AppStats.det;

    var ttl = 0,
      ttlPaid = 0,
      ttlPending = 0,
      ttlRaz = 0,
      ttlpaytm = 0,
      ttlPO = 0,
      ttlHDFC = 0,
      ttlAxis = 0,
      ttlHDFCB = 0;
    return (
      <div>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Exam Application Statistics</h4>
              <div className="ml-auto">
                <Button
                  basic
                  color="green"
                  content="Back"
                  onClick={this.handleReturn}
                  icon="reply"
                />
                <Link to="/dashboard">
                  <Button basic color="red" content="Exit" icon="home" />
                </Link>
              </div>
            </Card.Header>

            <Divider />
            <Table className="sticky" celled compact selectable>
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.HeaderCell
                    rowSpan="2"
                    style={{ width: "5%" }}
                    singleLine
                  >
                    Sl. No.
                  </Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2" style={{ width: "50%" }}>
                    College Code
                  </Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2" style={{ width: "5%" }}>
                    Total Student
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    rowSpan="2"
                    style={{ width: "5%" }}
                    singleLine
                  >
                    Success Count
                  </Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2" style={{ width: "5%" }}>
                    Pending Count
                  </Table.HeaderCell>
                  <Table.HeaderCell colSpan="6">Paid Via</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell style={{ width: "5%" }}>
                    Razorpay
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "5%" }}>
                    Paytm
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "5%" }}>
                    Post Office
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "5%" }} singleLine>
                    HDFC
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "5%" }}>
                    Axis
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "5%" }}>
                    HDFC Bank Challan
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {stats.map((el, i) => {
                  ttl += +el.fcount;
                  ttlPaid += +el.fsuccesscount;
                  ttlPending += +el.fpendcount;
                  ttlRaz += +el.Razorpay;
                  ttlpaytm += +el.Paytm;
                  ttlPO += +el.POSTOFFICE;
                  ttlHDFC += +el.HDFC;
                  ttlAxis += +el.axis;
                  ttlHDFCB += +el.HDFC_BANK;
                  return (
                    <Table.Row key={i}>
                      <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                      <Table.Cell>{el.fcollname}</Table.Cell>
                      <Table.Cell textAlign="center">{el.fcount}</Table.Cell>
                      <Table.Cell textAlign="center">
                        {el.fsuccesscount}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {el.fpendcount}
                      </Table.Cell>
                      <Table.Cell textAlign="center">{el.Razorpay}</Table.Cell>
                      <Table.Cell textAlign="center">{el.Paytm}</Table.Cell>
                      <Table.Cell textAlign="center">
                        {el.POSTOFFICE}
                      </Table.Cell>
                      <Table.Cell textAlign="center">{el.HDFC}</Table.Cell>
                      <Table.Cell textAlign="center">{el.axis}</Table.Cell>
                      <Table.Cell textAlign="center">{el.HDFC_BANK}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
              <Table.Footer>
                <Table.Row textAlign="center">
                  <Table.HeaderCell colSpan="2">Total</Table.HeaderCell>
                  <Table.HeaderCell>{ttl}</Table.HeaderCell>
                  <Table.HeaderCell>{ttlPaid}</Table.HeaderCell>
                  <Table.HeaderCell>{ttlPending}</Table.HeaderCell>
                  <Table.HeaderCell>{ttlRaz}</Table.HeaderCell>
                  <Table.HeaderCell>{ttlpaytm}</Table.HeaderCell>
                  <Table.HeaderCell>{ttlPO}</Table.HeaderCell>
                  <Table.HeaderCell>{ttlHDFC}</Table.HeaderCell>
                  <Table.HeaderCell>{ttlAxis}</Table.HeaderCell>
                  <Table.HeaderCell>{ttlHDFCB}</Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    AppStats: state.ExmDetStats
  };
};
export default connect(
  mapStateToProps,
  {
    showError
  }
)(DetExamStats);
