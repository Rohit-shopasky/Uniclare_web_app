import React, { Component } from "react";
import {
  Card,
  Header,
  Button,
  Table,
  Divider,
  Grid,
  Popup
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  getPostnotificationDetails,
  postNotificationDelete
} from "../../../actions/utils/hostNotification";
import { connect } from "react-redux";
import { showError } from "../../../actions";
import { wHeight } from "../../parms";
import { API } from "../../../apis/consts";

class HostNotofication extends Component {
  componentDidMount = async () => {
    await this.props.getPostnotificationDetails();
  };

  handleDel = async e => {
    await this.props.postNotificationDelete(e.fpostno);
    await this.props.getPostnotificationDetails();
  };

  render() {
    const wheight = wHeight();
    const nList = this.props.notifList == [] ? [] : this.props.notifList;

    return (
      <>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <Header as="h3">Host Notification</Header>
              <div className="ml-auto">
                <Link
                  to={{
                    pathname: `/editNotification/ `,
                    query: { fpostno: " " }
                  }}
                >
                  <Button
                    basic
                    color="green"
                    icon="add"
                    onClick={this.handleAdd}
                    content="Add"
                  />
                </Link>
                <Link to="/dashboard">
                  <Button basic color="red" content="Exit" icon="home" />
                </Link>
              </div>
            </Card.Header>
            <Divider />
            <Card.Description
              style={{
                overflowY: "auto",
                height: `${wheight}px`,
                width: "100%"
              }}
            >
              <Grid divided="vertically" className="mt-3 ml-3">
                <Grid.Row columns={1}>
                  <Grid.Column>
                    <Table celled compact style={{ padding: "0%" }}>
                      <Table.Header>
                        <Table.Row textAlign="center">
                          <Table.HeaderCell width="1">Sl. No.</Table.HeaderCell>
                          <Table.HeaderCell width="10">Label</Table.HeaderCell>
                          <Table.HeaderCell width="1">File</Table.HeaderCell>
                          <Table.HeaderCell width="1">
                            From Date
                          </Table.HeaderCell>
                          <Table.HeaderCell width="1">To Date</Table.HeaderCell>
                          <Table.HeaderCell width="1">Order</Table.HeaderCell>
                          <Table.HeaderCell width="1">Action</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {nList.map((el, i) => {
                          var filepath = `${API}/upload/${el.ffilepath}`; ///upload //http://universitysolutions.in
                          return (
                            <Table.Row key={i}>
                              <Table.Cell textAlign="center">
                                {i + 1}
                              </Table.Cell>
                              <Table.Cell>{el.flabel}</Table.Cell>
                              <Table.Cell>
                                {el.ffilepath == "" ? null : (
                                  <a href={filepath} target="blank">
                                    Link
                                  </a>
                                )}
                              </Table.Cell>
                              <Table.Cell textAlign="center">
                                {el.ffromdate}
                              </Table.Cell>
                              <Table.Cell>{el.ftodate}</Table.Cell>
                              <Table.Cell>{el.forder}</Table.Cell>
                              <Table.Cell style={{ display: "flex" }}>
                                <Link
                                  to={{
                                    pathname: `/editNotification/${el.fpostno}`,
                                    query: { fpostno: el.fpostno }
                                  }}
                                >
                                  <Button
                                    content="edit"
                                    basic
                                    size="small"
                                    style={{ display: "flex" }}
                                    color="blue"
                                    icon="edit"
                                  />
                                </Link>
                                <Popup
                                  trigger={
                                    <Button
                                      content="Delete"
                                      basic
                                      style={{ display: "flex" }}
                                      size="small"
                                      color="blue"
                                      icon="trash"
                                      onClick={() => this.handleDel(el)}
                                    />
                                  }
                                  content="Are you sure to Delete?"
                                  inverted
                                />
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

const mapStateToProps = state => {
  return {
    notifList: state.postNotifList
  };
};
export default connect(
  mapStateToProps,
  {
    getPostnotificationDetails,
    showError,
    postNotificationDelete
  }
)(HostNotofication);
