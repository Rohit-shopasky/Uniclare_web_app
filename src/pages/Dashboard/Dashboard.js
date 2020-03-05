import React, { Component } from "react";
import {
  Card,
  Table,
  Statistic,
  Header,
  Divider,
  Message,
  Image,
  Modal,
  Button,
  Icon
} from "semantic-ui-react";

import { connect } from "react-redux";
import { getDashBoardDet } from "../../actions/dashboard";
import { moneyFormatIndia, wHeight } from "../parms";
import { getNotifications } from "../../actions/utils/getNotifications";
import { API } from "../../apis/consts";
class Dashboard extends Component {
  async componentDidMount() {
    await this.props.getDashBoardDet();
    this.props.getNotifications();
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.user.funivcode, prevProps.user.funivcode);
    if (this.props.user.fcuruniv !== prevProps.user.fcuruniv) {
      this.props.getDashBoardDet();
      this.props.getNotifications();
    }
  }

  render() {
    // if (this.props.user.fcurtype == "304") return this.renderPgetDashboard();
    // else
    return this.renderDashboard();
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
    const { studinfo } = this.props.dashboard;
    const list = this.props.notifList;
    const { fname } = this.props.user;
    const wheight = wHeight();
    console.log("LIST", list);
    let iframeSrc = API + "/upload/26122019123856_ttt.jpg";
    // let allNotifications = this.props.allNotifications;

    return (
      <div>
        <div className="ui grid">
          <div
            className="eleven wide column"
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
          >
            <Card fluid>
              <Card.Content>
                <Card.Header>Welcome {fname}, to Uniclare</Card.Header>
                <br />
                <Card.Description
                  style={{ height: `${wheight + 18}px`, overflowY: "auto" }}
                >
                  {list.map((el, i) => {
                    return (
                      <>
                        <Card fluid>
                          <Card.Content header={el.flabel} />
                          <Card.Content>
                            <Card.Description>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: el.fdescpn
                                }}
                              />
                            </Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            {el.ffilepath != "" && (
                              <Modal
                                closeIcon
                                trigger={
                                  <Button
                                    compact
                                    basic
                                    color="violet"
                                    floated="left"
                                  >
                                    View Document
                                  </Button>
                                }
                              >
                                <Modal.Header>
                                  Notification Document
                                </Modal.Header>
                                <Modal.Content style={{ padding: "0px" }}>
                                  <Modal.Description>
                                    <iframe
                                      src={API + "/upload/" + el.ffilepath}
                                      //"https://specials-images.forbesimg.com/imageserve/144921906/960x0.jpg?fit=scale"
                                      // "https://bcu.ac.in/wp-content/uploads/2019/12/NOTIFICATION_reduce.pdf"

                                      style={{
                                        width: "900px",
                                        height: "650px"
                                      }}
                                      frameborder="0"
                                      scrolling="no"
                                    />
                                  </Modal.Description>
                                </Modal.Content>
                              </Modal>
                            )}
                            <b style={{ float: "right" }}>
                              updated On {el.fdate}
                            </b>
                          </Card.Content>
                        </Card>
                      </>
                    );
                  })}
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
          <div className="five wide column" style={{ paddingRight: "0px" }}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Message Board</Card.Header>
                <br />
                <Card.Description
                  style={{ height: `${wheight + 18}px`, overflowY: "auto" }}
                ></Card.Description>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    dashboard: state.dashboard,
    notifList: state.dashboardNotifList,
    allNotifications: state.dashboard.notification
  };
};

export default connect(
  mapStateToProps,
  { getDashBoardDet, getNotifications }
)(Dashboard);
