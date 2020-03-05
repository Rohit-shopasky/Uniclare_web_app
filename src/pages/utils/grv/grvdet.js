import React, { Component } from "react";
import {
  Grid,
  Icon,
  Header,
  Divider,
  Button,
  TextArea,
  Card,
  Image,
  Label,
  Form,
  Checkbox,
  Message,
  GridColumn,
  Item,
  Table
} from "semantic-ui-react";
import { connect } from "react-redux";
import { getGrv, grvSend, clrGrv } from "../../../actions/utils/grv";
import "../../../index.css";
import TimeAgo from "react-timeago";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import axios from "axios";
import univadmin from "../../../apis/univadmin";

class Grvdet extends Component {
  state = {
    reply: "",
    msgsnt: false,
    fclose: false,
    qryclsd: false,
    file: null,
    editorState: EditorState.createEmpty(),
    editor: ""
  };

  componentDidMount() {
    // this.setState({ msgsnt: false });
    return this.state.msgsnt;
  }
  //text editor
  setEditor = editor => {
    this.setState({ editor: editor });
  };
  //text editor on change
  onEditorStateChange = editorState => {
    this.setState({ editorState: editorState });
  };

  handleChange = (e, data) => {
    switch (data.type) {
      case "checkbox":
        this.setState({ [data.name]: data.checked });
        return;
      default:
        this.setState({ [data.name]: data.value });
        return;
    }
  };

  replyTxt = evt => {
    this.setState({ reply: evt.target.value });
  };

  handleFile(evt) {
    let file = evt.target.files[0];
    this.setState({ file: file });
  }

  sendRply = () => {
    const grv = this.props.grv.header;
    let file = this.state.file;
    const formData = new FormData();

    if (!this.state.reply) {
      console.log("no reply typed", this.state.reply);
    } else if (!this.state.fclose) {
      this.props.grvSend(this.state.reply, formData);
      this.setState({ reply: "", file: null, msgsnt: true });
      console.log("case nt closed");
    } else {
      console.log("close case");
      this.props.grvSend(this.state.reply, formData);
      this.props.clrGrv();
      this.setState({ reply: "", file: null, msgsnt: true, qryclsd: true });
    }
  };
  closeCase = () => {
    this.props.clrGrv();
  };

  render() {
    const { editorState } = this.state;

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
          <Item.Group>
            <Item>
              <Item.Image
                size="mini"
                style={{ width: "85px", marginTop: "1rem" }}
                src={`../../../../../assets/img/logos/${header.funivshort}_logo.jpg`}
              />
              <Item.Content>
                <Table
                  basic="very"
                  celled
                  collapsing
                  columns="16"
                  padded
                  singleLine
                >
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>University</Table.Cell>
                      <Table.Cell>
                        <b>
                          [{header.funivcode}] {header.funivname}
                        </b>
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>From</Table.Cell>
                      <Table.Cell>
                        <b>
                          [{header.fregno}] {header.fgrvfrom}
                        </b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Info</Table.Cell>
                      <Table.Cell>
                        <b>
                          ID - {header.fgrvid} submitted on {header.fgrvdate}
                        </b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Subject</Table.Cell>
                      <Table.Cell>
                        <b>{this.props.grv.header.fgrvsub}</b>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Item.Content>
            </Item>
          </Item.Group>

          {/* <Divider /> */}
        </div>
        <Card fluid color="green">
          <Card.Content style={{ textAlign: "left" }}>
            <Image
              floated="left"
              circular
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
            />
            <Card.Header as="h5">STUDENT</Card.Header>
            <Card.Meta as="h6">{header.fgrvdate}</Card.Meta>
            <Card.Description>
              <div
                dangerouslySetInnerHTML={{
                  __html: this.props.grv.header.fgrvmsg
                }}
              />
              {this.props.grv.header.ffilepath !== null ? (
                <a
                  href={`http://studentportal/universitysolutions.in/grv Query Files/${this.props.grv.header.funivcode}_${this.props.grv.header.ffilepath}`}
                  download
                >{`${this.props.grv.header.funivcode}_${this.props.grv.header.ffilepath}`}</a>
              ) : null}
            </Card.Description>
          </Card.Content>
        </Card>
        <div style={{ overflowY: "hidden", paddingBottom: "1em" }}>
          {txns.map((el, i) => {
            if (el.ffromuser == "STUDENT" || el.ffromuser == "COLLEGE") {
              return (
                <Card fluid key={i} color="green">
                  <Card.Content style={{ textAlign: "left" }}>
                    <Image
                      floated="left"
                      circular
                      size="mini"
                      src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
                    />
                    <Card.Header as="h5">{el.ffromuser}</Card.Header>
                    <Card.Meta as="h6">{el.fgrvtrandate}</Card.Meta>
                    <Card.Description>
                      {" "}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: el.fgrvtranmsg
                        }}
                      />
                      {el.fgrvtranfile !== "" ? (
                        <div>
                          {" "}
                          <a
                            href={`http://studentportal/universitysolutions.in/grv Query Files/${el.fgrvtranfile}`}
                            download
                          />
                        </div>
                      ) : null}
                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            } else {
              return (
                <Card fluid key={i} color="pink" style={{ marginLeft: "auto" }}>
                  <Card.Content style={{ textAlign: "right" }}>
                    <Image
                      floated="right"
                      circular
                      size="mini"
                      src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
                    />
                    <Card.Header as="h5">{el.ffromuser}</Card.Header>
                    <Card.Meta as="h6">{el.fgrvtrandate}</Card.Meta>
                    <Card.Description style={{ marginRight: "3rem" }}>
                      <p>{el.fgrvtranmsg}</p>
                      <div>
                        {el.fgrvtranfile !== "" ? (
                          <p>
                            <Icon name="paperclip" />
                            <a
                              href={`http://studentportal/universitysolutions.in/grv Query Files/${this.props.grv.header.funivcode}_${el.fgrvtranfile}`}
                              download
                            >{`${this.props.grv.header.funivcode}_${el.fgrvtranfile}`}</a>
                          </p>
                        ) : null}
                      </div>
                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            }
          })}
          {qryclsd == true ? (
            <Label color="red" horizontal>
              Issue cleared
            </Label>
          ) : null}
        </div>
        <div className="ml-auto">
          <Button
            onClick={this.handleSend}
            basic
            color="blue"
            icon="send"
            content="Send"
          />
          <Button
            basic
            color="green"
            icon="mail forward"
            content="Forward"
            onClick={this.handleCancel}
          />
          <Button
            basic
            color="black"
            icon="window close outline"
            content="Close Case"
            onClick={this.handleCancel}
          />
        </div>
        <Divider />

        <div
          style={{
            border: "1px solid grey",
            minHeight: "40vh",
            marginTop: "20px"
          }}
        >
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            toolbar={{
              options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "colorPicker",
                "list",
                "textAlign",
                "remove",
                "history"
              ]
            }}
            onEditorStateChange={this.onEditorStateChange}
          />
        </div>

        <div className="mt-1">
          {msgsnt ? (
            <Message
              floating
              content={`${this.props.grvSnt}`}
              color="olive"
              size="small"
            />
          ) : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  // console.log(state.grvSnt);
  return {
    grv: state.grv,
    grvSnt: state.grvSnt
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
