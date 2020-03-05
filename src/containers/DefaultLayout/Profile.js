import React from "react";
import { Card, Header, Icon, Image, Button, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { wHeight } from "../../pages/parms";
import ChangePassword from "./ChangePassword";
import ChangeMobile from "./ChangeMobile";

class Profile extends React.Component {
  state = {
    frmSubmit: false,
    open: false,
    open1: false,
    open2: false
  };

  componentDidMount() {
    // this.props.fetchDegrees(this.props.user.fdeggrp);
  }

  close = () => this.setState({ open: false });

  open = () => this.setState({ open: true });

  close1 = () => this.setState({ open1: false });

  open1 = () => this.setState({ open1: true });

  render() {
    const user = this.props.user;

    const usertype = this.props.usertype.filter((el, i) => {
      if (el.ftype == user.fcurtype) return el;
    })[0];
    return (
      <div className="animated fadeIn" style={{ marginBottom: "15px" }}>
        <Card fluid>
          <Card.Content>
            <Card.Description className="row justify-content-center">
              <div className="col-md-8 col-lg-8 col-sm-10 col-xs-12">
                <Header as="h3" icon textAlign="center">
                  <Icon name="user" circular />
                  <Header.Content>Profile</Header.Content>
                  <Header.Content>
                    User Id.: {user.fuserid}, Role: {usertype.ftypedesc}
                  </Header.Content>
                </Header>
                <Table padded="very">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Photo</Table.Cell>
                      <Table.Cell>
                        <Image
                          circular
                          src={"../../assets/img/avatars/user-avatar.png"}
                          size="small"
                          style={{ width: "100px", height: "100px" }}
                        />
                        <Button circular content="change" basic />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Name</Table.Cell>
                      <Table.Cell>
                        <b>{user.fname} </b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Gender</Table.Cell>
                      <Table.Cell>
                        <b>{user.fgender} </b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Date of Birth</Table.Cell>
                      <Table.Cell>
                        <b>{user.fdob} </b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Mobile</Table.Cell>
                      <Table.Cell>
                        <b>{user.fmobileno} </b>
                        <Button
                          circular
                          icon="pencil"
                          basic
                          onClick={this.open1}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Email Id</Table.Cell>
                      <Table.Cell>
                        <b>{user.femail} </b>
                        <Button circular icon="pencil" basic />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Password</Table.Cell>
                      <Table.Cell>
                        <span>
                          &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                        </span>
                        <Button
                          onClick={this.open}
                          circular
                          icon="pencil"
                          basic
                        />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <ChangePassword open={this.state.open} close={this.close} />
                <ChangeMobile open={this.state.open1} close={this.close1} />
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
    user: state.user,
    usertype: state.usertype
  };
};

export default connect(
  mapStateToProps,
  {}
)(Profile);
