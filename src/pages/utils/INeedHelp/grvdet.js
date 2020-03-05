import React, { Component } from "react";
import {
  Icon,
  Divider,
  Button,
  TextArea,
  Card,
  Image,
  Label,
  Form,
  Checkbox,
  Message,
  Table
} from "semantic-ui-react";
import { connect } from "react-redux";
import { getGrv, grvSend, clrGrv } from "../../../actions/utils/grv";
import "../../../index.css";

class Grvdet extends Component {
  state = {
    reply: "",
    msgsnt: false,
    fclose: false,
    qryclsd: false,
    file: null,
    editor: ""
  };

  componentDidMount() {
    // this.setState({ msgsnt: false });
    return this.state.msgsnt;
  }

  replyTxt = evt => {
    this.setState({ reply: evt.target.value });
  };

  render() {
    const txns = this.props.txns;
    const header = this.props.header;
    const { fclose, msgsnt, qryclsd } = this.state;

    return (
      <div>
        <div
          style={{
            position: "sticky",
            top: "0",
            zIndex: "2",
            backgroundColor: "white"
          }}
        >
          <Table basic="very" celled collapsing columns="16" padded singleLine>
            <Table.Body>
              <Table.Row>
                <Table.Cell>ID</Table.Cell>
                <Table.Cell>
                  <b>{header.fgrvid}</b>
                </Table.Cell>
                <Table.Cell>Date of Submission</Table.Cell>
                <Table.Cell>
                  <b>{header.fgrvdate}</b>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Subject</Table.Cell>
                <Table.Cell colspan="3">
                  <b>{this.props.grv.header.fgrvsub}</b>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Divider />
        </div>
        <Card fluid color="green">
          <Card.Content style={{ textAlign: "left" }}>
            {/* <Image
              floated="left"
              circular
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
            /> */}
            <Card.Header as="h5">{this.props.user.fname}</Card.Header>
            <Card.Meta as="h6">{header.fgrvdate}</Card.Meta>
            <Card.Description>
              <div
                dangerouslySetInnerHTML={{
                  __html: this.props.grv.header.fgrvmsg
                }}
              />
            </Card.Description>
          </Card.Content>
        </Card>
        <div style={{ overflowY: "hidden", paddingBottom: "1em" }}>
          {txns.map((el, i) => {
            if (el.ffromuser == "STUDENT" || el.ffromuser == "COLLEGE") {
              return (
                <Card fluid key={i} color="green">
                  <Card.Content style={{ textAlign: "left" }}>
                    {/* <Image
                      floated="left"
                      circular
                      size="mini"
                      src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
                    /> */}
                    <Card.Header as="h5">{el.ffromuser}</Card.Header>
                    <Card.Meta as="h6">{el.fgrvtrandate}</Card.Meta>
                    <Card.Description>
                      <div
                        dangerouslySetInnerHTML={{ __html: el.fgrvtranmsg }}
                      />
                      <div>
                        {el.fgrvtranfile !== "" ? (
                          <div>
                            <a
                              href={`http://studentportal/universitysolutions.in/grv Query Files/${el.fgrvtranfile}`}
                              download
                            />
                          </div>
                        ) : null}
                      </div>
                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  // console.log(state.grvSnt);
  return {
    grv: state.grv,
    grvSnt: state.grvSnt,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {
    getGrv,
    grvSend,
    clrGrv
  }
)(Grvdet);
