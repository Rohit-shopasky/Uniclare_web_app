import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  Divider,
  Form,
  Button,
  Dropdown,
  Radio
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { showError } from "../../actions";
import { getSendSms } from "../../actions/after-exam/sendSmsAct";
import { wHeight } from "../parms";

class SendSms extends Component {
  state = {
    valinvidata: false,
    ftechfrm: "0",
    ftechto: "zzzzz",
    nontype: "a",
    smstype: "I",
    template: false,
    custom: false,
    message: "",
    fdate: "",
    ftime: ""
  };

  handleCancel = () => {
    this.setState({
      valinvidata: false,
      ftechfrm: "0",
      ftechto: "zzzzz",
      nontype: "a",
      smstype: "I",
      template: false,
      custom: false,
      message: "",
      fdate: "",
      ftime: ""
    });
  };

  handleTemplate = () => {
    if (this.state.template == false) {
      this.setState({ template: true, custom: false });
      console.log("template", this.state.template);
      console.log("custom", this.state.custom);
    }
  };

  handleCustom = () => {
    if (this.state.custom == false) {
      this.setState({ custom: true, template: false });
      console.log("custom", this.state.custom);
      console.log("template", this.state.template);
    }
  };

  handleMessage = () => {
    console.log("message updated");
  };

  handleChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  close = (e, data) => {
    if (e.type == "keydown") return;
    this.setState({ open: false });
  };

  render() {
    const {
      ftechfrm,
      ftechto,
      nontype,
      smstype,
      template,
      custom,
      message,
      fdate,
      ftime
    } = this.state;

    const session_options = [
      { key: "a", value: "a", text: "All" },
      { key: "u", value: "u", text: "UGC" },
      { key: "n", value: "n", text: "Non UGC" }
    ];

    const sms_options = [
      { key: "1", value: "I", text: "Invite" },
      { key: "2", value: "R", text: "Relieve" }
    ];

    console.log("sending sms", this.props.sendSms);
    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };
    const wheight = wHeight();

    const getButtonData = d => {
      console.log("d", d);
    };

    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Sending SMS</h4>
              <div className="ml-auto">
                {/* <Button
                                    basic
                                    color="blue"
                                    onClick={this.saveInvitation}
                                    content="save"
                                    icon="file"
                                /> */}
                <Button
                  basic
                  color="black"
                  icon="ban"
                  onClick={this.handleCancel}
                  content="Cancel"
                />
                <Link to="dashboard">
                  <Button basic color="red" content="Exit" icon="home" />
                </Link>
              </div>
            </Card.Header>
            <Divider />
            <Card.Description
              style={{ height: `${wheight}px`, overflowY: "auto" }}
            >
              <div className="col-md-8 col-lg-8 col-sm-12">
                <Form>
                  <Form.Group>
                    <Form.Input
                      placeholder="From"
                      value={ftechfrm}
                      width={6}
                      name="ftechfrm"
                      onChange={this.handleChange}
                      maxLength="5"
                      label="Teacher Code Range"
                    />
                    <Form.Input
                      placeholder="To"
                      name="ftechto"
                      value={ftechto}
                      width={6}
                      onChange={this.handleChange}
                      // disabled={true}
                      maxLength="5"
                      style={{ marginTop: "1.6em" }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={6} response>
                      <label>Scale</label>
                      <Dropdown
                        placeholder="Scale"
                        search
                        selection
                        name="nontype"
                        value={nontype}
                        options={session_options}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>SMS Type</label>
                      <Dropdown
                        placeholder="SMS Type"
                        search
                        selection
                        name="smstype"
                        value={smstype}
                        options={sms_options}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Radio
                      label="Template SMS"
                      name="template"
                      // @ts-ignore
                      value={template}
                      // disabled={disbal}
                      checked={this.state.template}
                      onClick={this.handleTemplate}
                    />
                    <Radio
                      label="Custom SMS"
                      name="custom"
                      // @ts-ignore
                      value={custom}
                      // disabled={disbal}
                      style={{ marginLeft: "2%" }}
                      checked={this.state.custom}
                      onClick={this.handleCustom}
                    />
                  </Form.Group>
                  {/* <Button
                                        color="blue"
                                        onClick={this.handleTable}
                                        content="Submit"
                                    /> */}
                  {this.state.custom ? (
                    <div>
                      <Form.Field width={11} height={200}>
                        <Form.TextArea
                          label="Type your message here..."
                          placeholder="Message"
                          value={message}
                          name="message"
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Button
                          onClick={this.handleMessage}
                          basic
                          color="blue"
                          icon="send"
                          content="Send"
                        />
                      </Form.Field>
                    </div>
                  ) : null}
                  {this.state.template ? (
                    <div>
                      <Form.Field width={11}></Form.Field>
                      <Form.Field width={11}>
                        <Form.TextArea
                          defaultValue="dsdsdsdsds"
                          onChange={e => {
                            // @ts-ignore
                            console.log("e", e, e.target.value);
                          }}
                          name="message"
                          // onChange={this.handleChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Button
                          onClick={this.handleMessage}
                          basic
                          color="blue"
                          icon="send"
                          content="Send"
                        />
                      </Form.Field>
                    </div>
                  ) : null}
                </Form>
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
    deggrp: state.deggrp,
    univcode: state.univ.funivcode,
    sendsms: state.sendSms,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {
    showError,
    getSendSms
  }
)(SendSms);
