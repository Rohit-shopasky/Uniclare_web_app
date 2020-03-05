import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Divider,
  Button,
  Form,
  Dropdown,
  TextArea
} from "semantic-ui-react";
import { connect } from "react-redux";
import { showError } from "../../../actions";
import {
  changesms,
  getEvents,
  fliterMsg,
  pushSms
} from "../../../actions/utils/sms-notification";
import { wHeight } from "../../parms";
import { API } from "../../../apis/consts";



class SMSNotification extends Component {
  componentDidMount() { }

  handleChange = (e, data) => {
    this.setState({ [data.name]: data.value });
    this.props.changesms(data.name, data.value);

    if (data.name === "fevttype" && data.value === "EVT") {
      this.props.getEvents();
    }
    if (data.name === "fevent" && data.value !== "") {
      this.props.fliterMsg(data.name, data.value);
    }
  };

  pushSms = () => {
    if (this.props.smsstate.fmsg == "") {
      const error = { header: "Error", content: "Message cannot be empty" };
      this.props.showError(error);
      return;
    }
    this.props.pushSms();
  };

  sendsms = () => {
    if (this.props.smsstate.fresevent == "") {
      const error = { header: "Error", content: "Push Data to send." };
      this.props.showError(error);
      return;
    }
    var url = "";
    if (this.props.smsstate.fmsgtype == "SMS") {
      url =
        API +
        "/sendsms.php?funivcode=" +
        this.props.univ.funivcode +
        "&fevent=" +
        this.props.smsstate.fresevent;
    } else {
      url =
        API +
        "/sendnotification.php?funivcode=" +
        this.props.univ.funivcode +
        "&fevent=" +
        this.props.smsstate.fresevent;
    }

    var win = window.open(url, "_blank");
    win.focus();
  };

  render() {
    const sendto = [
      { code: "CL", label: "College" },
      { code: "CT", label: "Centre" },
      { code: "ST", label: "Student" },
      { code: "TH", label: "Teacher" }
    ];

    const wheight = wHeight();
    const smsstate = this.props.smsstate;
    return (
      <div>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Send SMS / Notification</h4>
              <div className="ml-auto">
                <Button
                  basic
                  color="green"
                  content="Send"
                  onClick={this.sendsms}
                  icon="send"
                />
                <Button
                  basic
                  color="blue"
                  content="pushdata"
                  onClick={this.pushSms}
                  icon="save"
                />
                <Button
                  basic
                  onClick={this.handleCancel}
                  color="black"
                  icon="times circle"
                  content="Cancel"
                />
                <Link to="/dashboard">
                  <Button basic color="red" content="Exit" icon="home" />
                </Link>
              </div>
            </Card.Header>

            <Divider />
            <Card.Description
              style={{ overflowY: "auto", height: `${wheight}px` }}
            >
              <Form>
                <div
                  className="row clearfix"
                  style={{ marginRight: "0px", marginLeft: "-5px" }}
                >
                  <div className="col-md-8">
                    <Form.Group inline>
                      <label>Degree Group</label>
                      <Form.Radio
                        label="All"
                        value="A"
                        name="deggrp"
                        checked={smsstate.deggrp == "A"}
                        onChange={this.handleChange}
                      />
                      <Form.Radio
                        label="Current"
                        value="C"
                        name="deggrp"
                        checked={smsstate.deggrp == "C"}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group inline>
                      <label>Send</label>
                      <Form.Radio
                        label="SMS"
                        value="SMS"
                        name="fmsgtype"
                        checked={smsstate.fmsgtype == "SMS"}
                        onChange={this.handleChange}
                      />
                      <Form.Radio
                        label="Notification"
                        value="NOTIF"
                        name="fmsgtype"
                        checked={smsstate.fmsgtype == "NOTIF"}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={16}>
                        <label>To</label>
                        <Dropdown
                          placeholder="Send To"
                          search
                          selection
                          name="fsendto"
                          value={smsstate.fsendto}
                          options={sendto.map((el, i) => {
                            return {
                              key: i,
                              value: el.code,
                              text: el.label
                            };
                          })}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group inline>
                      <Form.Radio
                        label="General"
                        value="GEN"
                        name="fevttype"
                        checked={smsstate.fevttype == "GEN"}
                        onChange={this.handleChange}
                      />
                      <Form.Radio
                        label="Event Based"
                        value="EVT"
                        name="fevttype"
                        checked={smsstate.fevttype == "EVT"}
                        onChange={this.handleChange}
                      />
                    </Form.Group>

                    {smsstate.fevttype == "EVT" ? (
                      <Form.Group>
                        <Form.Field width={16}>
                          <label>Select Event</label>
                          <Dropdown
                            placeholder="Select Event"
                            search
                            selection
                            name="fevent"
                            value={smsstate.fevent}
                            options={smsstate.fevents.map((el, i) => {
                              return {
                                key: i,
                                value: el.fevent,
                                text: el.ftitle
                              };
                            })}
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                      </Form.Group>
                    ) : null}

                    <Form.Group>
                      <Form.Field width={8}>
                        <Form.Input
                          placeholder="From"
                          name="fcollfrom"
                          value={smsstate.fcollfrom}
                          onChange={this.handleChange}
                          maxLength="4"
                          label="College Range"
                        />
                      </Form.Field>
                      <Form.Field width={8}>
                        <Form.Input
                          placeholder="To"
                          name="fcollto"
                          value={smsstate.fcollto}
                          onChange={this.handleChange}
                          maxLength="4"
                          style={{ marginTop: "1.6em" }}
                        />
                      </Form.Field>
                    </Form.Group>

                    {smsstate.fsendto == "ST" ? (
                      <div>
                        <Form.Group>
                          <Form.Field width={8}>
                            <Form.Input
                              placeholder="From"
                              name="fdegfrom"
                              value={smsstate.fdegfrom}
                              onChange={this.handleChange}
                              maxLength="10"
                              label="Degree Range"
                            />
                          </Form.Field>
                          <Form.Field width={8}>
                            <Form.Input
                              placeholder="To"
                              name="fdegto"
                              value={smsstate.fdegto}
                              onChange={this.handleChange}
                              maxLength="10"
                              style={{ marginTop: "1.6em" }}
                            />
                          </Form.Field>
                        </Form.Group>

                        <Form.Group>
                          <Form.Field width={8}>
                            <Form.Input
                              placeholder="From"
                              name="fregfrom"
                              value={smsstate.fregfrom}
                              onChange={this.handleChange}
                              maxLength="10"
                              label="Register No. Range"
                            />
                          </Form.Field>
                          <Form.Field width={8}>
                            <Form.Input
                              placeholder="To"
                              name="fregto"
                              value={smsstate.fregto}
                              onChange={this.handleChange}
                              maxLength="10"
                              style={{ marginTop: "1.6em" }}
                            />
                          </Form.Field>
                        </Form.Group>
                      </div>
                    ) : null}
                    {smsstate.fsendto == "TH" && (
                      <div>
                        <Form.Group>
                          <Form.Field width={8}>
                            <Form.Input
                              placeholder="From"
                              name="fboardfrom"
                              value={smsstate.fboardfrom}
                              onChange={this.handleChange}
                              maxLength="10"
                              label="Board Range"
                            />
                          </Form.Field>
                          <Form.Field width={8}>
                            <Form.Input
                              placeholder="To"
                              name="fboardto"
                              value={smsstate.fboardto}
                              onChange={this.handleChange}
                              maxLength="10"
                              style={{ marginTop: "1.6em" }}
                            />
                          </Form.Field>
                        </Form.Group>

                        <Form.Group>
                          <Form.Field width={8}>
                            <Form.Input
                              placeholder="From"
                              name="fteachfrom"
                              value={smsstate.fteachfrom}
                              onChange={this.handleChange}
                              maxLength="10"
                              label="Teacher Code Range"
                            />
                          </Form.Field>
                          <Form.Field width={8}>
                            <Form.Input
                              placeholder="To"
                              name="fteachto"
                              value={smsstate.fteachto}
                              onChange={this.handleChange}
                              maxLength="10"
                              style={{ marginTop: "1.6em" }}
                            />
                          </Form.Field>
                        </Form.Group>
                      </div>

                    )}

                    <Form.Group>
                      <Form.Field width={16}>
                        <Form.Input
                          name="fmsg"
                          control={TextArea}
                          value={smsstate.fmsg}
                          onChange={this.handleChange}
                          label="Message"
                          placeholder="Message"
                          rows="6"
                        />
                        {smsstate.fmsg.length}/160 Characters <br />0
                        {smsstate.fmsg.length > 0
                          ? smsstate.fmsg.length > 160
                            ? Math.ceil(smsstate.fmsg.length / 153)
                            : 1
                          : 0}{" "}
                        Message
                      </Form.Field>
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    smsstate: state.smsNotif,
    univ: state.univ
  };
};
export default connect(
  mapStateToProps,
  {
    showError,
    changesms,
    getEvents,
    fliterMsg,
    pushSms
  }
)(SMSNotification);
