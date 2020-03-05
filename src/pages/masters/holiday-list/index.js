import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { showError } from "../../../actions";
import { Card, Button, Divider, Table, Grid } from "semantic-ui-react";
import { wHeight } from "../../parms";
import { getHolidayList } from "../../../actions/masters/getholidaylist";
import { ReportAPI } from "../../../apis/consts";

class HolidayList extends Component {
  state = {};

  async componentDidMount() {
    await this.props.getHolidayList();
  }

  handleReport = () => {
    // const { fdeggrp } = this.props.user;
    // const { reportType } = this.state;
    // if (fdeggrp === "") {
    //   const error = { header: "Error", content: "Select Degree Group" };
    //   this.props.showError(error);
    //   return;
    // }
    window.open(
      `${ReportAPI}holidayListRprt&univcode=${this.props.univcode}&fcollcode=${this.props.fcollcode}`,
      "_blank"
    );
  };

  render() {
    const wheight = wHeight();
    const hList = this.props.hList == "" ? [] : this.props.hList;

    console.log("hlist", this.props.hList);
    return (
      <>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h3>Holiday List</h3>
              <div className="ml-auto">
                <Button
                  basic
                  color="blue"
                  icon="file"
                  onClick={this.handleReport}
                  content="Report"
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
                          <Table.HeaderCell width="2">Date</Table.HeaderCell>
                          <Table.HeaderCell width="12">
                            Remarks
                          </Table.HeaderCell>
                          {/* <Table.HeaderCell width="1">Del</Table.HeaderCell> */}
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {hList.map((el, i) => {
                          return (
                            <Table.Row>
                              <Table.Cell textAlign="center">
                                {i + 1}
                              </Table.Cell>
                              <Table.Cell>{el.fdate}</Table.Cell>
                              <Table.Cell>{el.fremarks}</Table.Cell>
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
    hList: state.holidayList,
    univcode: state.univ.funivcode,
    fcollcode: state.user.fcollcode
  };
};

export default connect(
  mapStatetoProps,
  {
    showError,
    getHolidayList
  }
)(HolidayList);
