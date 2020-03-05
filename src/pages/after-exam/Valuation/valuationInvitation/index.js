import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  Divider,
  Form,
  Button,
  Dropdown,
  Radio,
  ItemGroup
} from "semantic-ui-react";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";
import { showError, saveInviteData, saveInviteList } from "../../../../actions";
import {
  getValInvi,
  changeInvite,
  sendmessage,
  sendmessagefinal
} from "../../../../actions/after-exam/valuatorInvitationAct";
import { wHeight } from "../../../parms";
import ValuatorInvitation from "./valuatorInvitation";
import { fetchUnivs } from "../../../../actions";
import moment from "moment";

var globalname = "",
  finalArry = [],
  lastupdate = [],
  valCenter_options = [],
  fboard_options = [];

class ValInvitation extends Component {
  state = {
    arr: this.props.NowtableData,
    invitype: "All",
    valinvidata: false,
    fboardfrm: "0",
    fboardto: "zzzzz",
    ftechfrm: "0",
    ftechto: "zzzzz",
    nontype: "a",
    smsType: "Invite",
    template: false,
    custom: false,
    message: "",
    fdate: moment().format("DD/MM/YYYY"),
    ftime: moment().format("HH:MM AM"),
    valCenter: "",
    fboard: "",
    messageCondition: false
  };

  handleChangedate = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCancel = () => {
    this.setState({
      valinvidata: false,
      ftechfrm: "0",
      fboardfrm: "0",
      fboardto: "zzzzz",
      ftechto: "zzzzz",
      nontype: "a",
      smsType: "Invite",
      invitype: "All",
      template: false,
      custom: false,
      message: "",
      fdate: moment().format("DD/MM/YYYY"),
      ftime: moment().format("HH:MM AM"),
      valCenter: "",
      fboard: "",
      messageCondition: false
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
    this.setState({ message: "" });
    if (this.state.custom == false) {
      this.setState({ custom: true, template: false });
      console.log("custom", this.state.custom);
      console.log("template", this.state.template);
    }
  };

  handleTempMsg = () => {
    console.log("lallalal", this.state.fboard.text);
    console.log("lallalal", this.state.valCenter.text);
    this.setState({
      message:
        "Message from " +
        globalname +
        " : Valuation of " +
        this.state.fboard +
        " board will commence on " +
        this.state.fdate +
        " at " +
        this.state.ftime +
        " in " +
        this.state.valCenter +
        ". You are requested to bring the Valuation Order Copy and PAN No. "
    });
  };

  handleMessage = async () => {
    finalArry = [];
    this.props.sendmsgData.map(item => {
      if (item.finvited == "T") {
        finalArry.push({
          fteachcode: item.fteachcode,
          FTEACHNAME: item.FTEACHNAME,
          FSCALE: item.FSCALE,
          fmobile: item.fmobile,
          femail: item.femail,
          fboard: item.fboard,
          finvited: item.finvited
        });
      }
    });

    console.log("message updated", this.state.message);
    console.log("SMS TYPE", this.state.smsType);
    console.log("Number", this.props.user.fmobileno);
    console.log("finalArry", finalArry);
    console.log("fboard", this.state.fboard);
    console.log("usr", this.props.user.fusertype);
    console.log("fdeggrp", this.props.deggrp.fdeggrp);
    console.log("fdegree", this.props.user.fdegree);
    const response = await this.props.sendmessagefinal(
      this.state.message,
      this.state.smsType,
      this.props.user.fmobileno,
      finalArry,
      this.state.fboard,
      this.props.user.fusertype,
      this.props.deggrp.fdeggrp,
      this.props.user.fdegree
    );
    console.log("Response", response);
    if (response) {
      let h = [];
      this.props.NowtableData.taechdet.map(el => {
        lastupdate = [];
        console.log("lastupdate", lastupdate);
        return h.push({
          fteachcode: el.fteachcode,
          FTEACHNAME: el.FTEACHNAME,
          FSCALE: el.FSCALE,
          fmobile: el.fmobile,
          femail: el.femail,
          fboard: el.fboard,
          finvited: "F"
        });
      });
      console.log("hhhh22hhhhhh", h);

      this.state.valinvidata
        ? console.log("afterrrrrr", this.props.NowtableData.taechcntr)
        : console.log("beforeee", this.props.NowtableData);
      await this.setState({ arr: h });

      console.log("pfpf22pfpf", this.state.arr);
      await this.props.sendmessage(this.state.arr);
      await this.setState({ valinvidata: false });

      await this.setState({ valinvidata: true });
    }
  };

  handleChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  handleTable = async () => {
    await console.log("mhgadsjg", this.state.arr, this.props.NowtableData);

    this.props.univs.map(item => {
      if (item.funivcode == this.props.user.fcuruniv) {
        globalname = item.funivname;
      }
    });

    // console.log("fghjk", globalname)

    const { ftechfrm, ftechto, nontype } = this.state;

    const { fdeggrp } = this.props.user;

    if (fdeggrp === "") {
      const error = { header: "Error", content: "Select Degree Group" };
      this.props.showError(error);
      return;
    }
    console.log("kjgsdfjdljkfdhg", this.props.user.fcurtype);
    if (this.props.user.fcurtype !== "100") {
      console.log(
        "beforeelselpjfjhf",
        this.state.fboardfrm,
        this.state.fboardto
      );
      await this.setState({ fboardfrm: this.props.user.fdegree });
      await this.setState({ fboardto: this.props.user.fdegree });
      console.log(
        "afterelselpjfjhf",
        this.state.fboardfrm,
        this.state.fboardto
      );
    }

    await this.props.getValInvi(
      this.state.fboardfrm,
      this.state.fboardto,
      ftechfrm,
      ftechto,
      nontype
    );
    this.setState({ valinvidata: true });
    this.setState({ messageCondition: true });

    {
      valCenter_options.length == 1 &&
        this.setState({
          valCenter: valCenter_options[0].value
        });
    }
    {
      fboard_options.length == 1 &&
        this.setState({
          fboard: fboard_options[0].value
        });
    }
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
      invitype,
      template,
      smsType,
      custom,
      message,
      fdate,
      ftime,
      valCenter,
      fboard
    } = this.state;

    const session_options = [
      { key: "a", value: "a", text: "All" },
      { key: "u", value: "u", text: "UGC" },
      { key: "n", value: "n", text: "Non UGC" }
    ];

    valCenter_options = [];
    fboard_options = [];

    this.state.valinvidata &&
      this.props.NowtableData.taechcntr.map((el, i) => {
        valCenter_options.push({
          key: el.FVALCNTR,
          value: el.FCNTRNAME,
          text: el.FCNTRNAME
        });
      });

    const smsType_options = [
      { key: "1", value: "Invite", text: "Invite" },
      { key: "2", value: "Relieve", text: "Relieve" }
    ];

    this.state.valinvidata &&
      this.props.NowtableData.taechboard.map((el, i) => {
        fboard_options.push({
          key: el.fboardcode,
          value: el.fboardname,
          text: el.fboardname
        });
      });

    const invitation_options = [
      { key: "0", value: "All", text: "All" },
      { key: "1", value: "T", text: "Invited" },
      { key: "2", value: "F", text: "Not Invited" }
    ];

    console.log("Valuator Invitation", this.props);
    const formatDate = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };
    const formatTime = {
      h: "[0-1]",
      r: "[0-9]",
      m: "[0-6]",
      n: "[0-9]",
      t: "[APap]",
      z: "[Mm]"
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
              <h4>Sending Valuator Invitation</h4>
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
              className="row"
              style={{ height: `${wheight}px`, overflowY: "auto" }}
            >
              <div className="col-md-6 col-lg-6 col-sm-6">
                <Form>
                  <Form.Group>
                    <Form.Input
                      placeholder="From"
                      value={ftechfrm}
                      width={6}
                      name="ftechfrm"
                      disabled={this.state.messageCondition}
                      onChange={this.handleChange}
                      maxLength="5"
                      label="Teacher Code Range"
                    />
                    <Form.Input
                      placeholder="To"
                      name="ftechto"
                      value={ftechto}
                      disabled={this.state.messageCondition}
                      width={6}
                      onChange={this.handleChange}
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
                        disabled={this.state.messageCondition}
                        name="nontype"
                        value={nontype}
                        options={session_options}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field width={6}>
                      <label>Type</label>
                      <Dropdown
                        placeholder="Scale"
                        search
                        selection
                        disabled={this.state.messageCondition}
                        name="invitype"
                        value={invitype}
                        options={invitation_options}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={12} response>
                      <label>SMS Type</label>
                      <Dropdown
                        placeholder="Scale"
                        search
                        selection
                        disabled={this.state.messageCondition}
                        name="smsType"
                        value={smsType}
                        options={smsType_options}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Button
                    color="blue"
                    onClick={this.handleTable}
                    disabled={this.state.messageCondition}
                    content="Submit"
                  />
                </Form>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-6">
                {this.state.messageCondition ? (
                  <Form>
                    <strong>
                      <h3>Send Invite / Relieve Message</h3>
                    </strong>
                    <Divider />
                    <Form.Group>
                      <Radio
                        label="Template Message"
                        name="template"
                        value={template}
                        checked={this.state.template}
                        onClick={this.handleTemplate}
                      />
                      <Radio
                        label="Custom Message"
                        name="custom"
                        value={custom}
                        style={{ marginLeft: "2%" }}
                        checked={this.state.custom}
                        onClick={this.handleCustom}
                      />
                    </Form.Group>
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
                        <Form.Group>
                          <Form.Field width={6}>
                            <label>Date</label>
                            <InputMask
                              formatChars={formatDate}
                              type="text"
                              value={fdate}
                              mask="ed/nm/zyyy"
                              placeholder="From"
                              name="fdate"
                              onChange={this.handleChangedate}
                              required
                            />
                          </Form.Field>
                          <Form.Field width={6}>
                            <label>Time</label>
                            <InputMask
                              formatChars={formatTime}
                              type="text"
                              value={ftime}
                              mask="hr:mn tz"
                              style={{ textTransform: "uppercase" }}
                              placeholder="From"
                              name="ftime"
                              onChange={this.handleChangedate}
                              required
                            />
                          </Form.Field>
                        </Form.Group>
                        <Form.Group>
                          <Form.Field width={12}>
                            <label>Valuation Center</label>
                            <Dropdown
                              placeholder="Valuation Center"
                              search
                              selection
                              name="valCenter"
                              value={
                                valCenter_options.length > 1
                                  ? valCenter
                                  : valCenter_options[0].value
                              }
                              options={valCenter_options}
                              onChange={this.handleChange}
                              required
                            />
                          </Form.Field>
                        </Form.Group>
                        <Form.Group>
                          <Form.Field width={12}>
                            <label>Board</label>
                            <Dropdown
                              placeholder="Board"
                              search
                              selection
                              name="fboard"
                              value={
                                fboard_options.length > 1
                                  ? fboard
                                  : fboard_options[0].value
                              }
                              options={fboard_options}
                              onChange={this.handleChange}
                              required
                            />
                          </Form.Field>
                        </Form.Group>
                        <Form.Group>
                          <Button
                            color="blue"
                            disabled={
                              !this.state.fdate.match("_") &&
                              !this.state.ftime.match("_") &&
                              this.state.valCenter.length > 0 &&
                              this.state.fboard.length > 0
                                ? false
                                : true
                            }
                            onClick={this.handleTempMsg}
                            content="Submit"
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Field width={12}>
                            <Form.TextArea
                              defaultValue={message}
                              onChange={e => {
                                console.log("e", e, e.target.value);
                              }}
                              name="message"
                            />
                          </Form.Field>
                        </Form.Group>
                        <Form.Group>
                          <Form.Field>
                            <Button
                              onClick={this.handleMessage}
                              basic
                              color="blue"
                              icon="send"
                              content="Send"
                            />
                          </Form.Field>
                        </Form.Group>
                      </div>
                    ) : null}
                  </Form>
                ) : null}
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12">
                {/* {this.state.valinvidata ? console.log("withihdj", this.props.NowtableData.taechcntr) : console.log("null", this.props.NowtableData)} */}
                {this.state.valinvidata ? (
                  <ValuatorInvitation
                    mapfilter={this.state.invitype}
                    tblData={this.props.valinvi}
                    getButtonData={getButtonData}
                  />
                ) : null}
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
    NowtableData: state.valInvitation,
    user: state.user,
    univs: state.univs,
    sendmsgData: state.sendMsg
  };
};

export default connect(
  mapStateToProps,
  {
    sendmessagefinal,
    fetchUnivs,
    showError,
    getValInvi,
    changeInvite,

    saveInviteData,
    saveInviteList,
    sendmessage
  }
)(ValInvitation);
