import React, { Component } from "react";
import { Card, Divider, Button, Form, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReportAPI } from "../../../apis/consts";
import { showError, fetchRefundList } from "../../../actions";
import DisplyRefundList from "./displayRefundList";

class RefundApp extends Component {
  state = {
    fcollfrm: "0",
    fcollto: "ZZZZ",
    fdegfrm: "0",
    fdegto: "ZZZZZ",
    fregfrm: "0",
    fregto: "ZZZZZZZZ",
    fappfrm: "0",
    fappto: "ZZZZZZZZZZZ",
    fstatus: "",
    eventType: "",
    ftrue: false
  };

  handleChange = (e, data) => {
    this.setState({ [data.name]: data.value });
    return;
  };

  handleSubmit = () => {
    const {
      fregfrm,
      fregto,
      fappfrm,
      fappto,
      fcollfrm,
      fcollto,
      fdegfrm,
      fdegto,
      fstatus,
      eventType
    } = this.state;
    let error = {};
    if (eventType === "" || fstatus == "") {
      error = {
        header: "Error",
        content: "Event Type or Status cannot be empty."
      };

      this.props.showError(error);
      return;
    }

    let obj = {};
    obj.app_type = eventType;
    obj.degree_range = {
      start: fdegfrm,
      end: fdegto
    };
    obj.college_range = {
      start: fcollfrm,
      end: fcollto
    };
    obj.regno_range = {
      start: fregfrm,
      end: fregto
    };
    obj.appno_range = {
      start: fappfrm,
      end: fappto
    };
    obj.fstatus = fstatus;
    this.props.fetchRefundList(obj);
    this.setState({ ftrue: true });
  };

  handleReport = () => {
    const {
      fregfrm,
      fregto,
      fappfrm,
      fappto,
      fcollfrm,
      fcollto,
      fdegfrm,
      fdegto,
      fstatus,
      eventType
    } = this.state;

    window.location.href =
      ReportAPI +
      "getRefundApplicationReport&apptype=" +
      eventType +
      "&fdegfrom=" +
      fdegfrm +
      "&fdegto=" +
      fdegto +
      "&collfrm=" +
      fcollfrm +
      "&collto=" +
      fcollto +
      "&fregnofrm=" +
      fregfrm +
      "&fregnoto=" +
      fregto +
      "&fappfrom=" +
      fappfrm +
      "&fappto=" +
      fappto +
      "&fstatus=" +
      fstatus +
      "&univcode=" +
      this.props.univcode;
  };

  render() {
    const {
      fregfrm,
      fregto,
      fappfrm,
      fappto,
      fcollfrm,
      fcollto,
      fdegfrm,
      fdegto,
      fstatus,
      eventType
    } = this.state;

    const event_type = [
      { key: "Exam Application", value: "ExamApp", text: "Exam Application" },
      { key: "RVRT Application", value: "RvRtApp", text: "RVRT Application" }
    ];
    const status_type = [
      { key: "Applied", value: "Applied", text: "Applied" },
      { key: "Approved", value: "Approved", text: "Approved" },
      { key: "Rejected", value: "Rejected", text: "Rejected" }
    ];

    return (
      <Card fluid>
        <Card.Content>
          <Card.Header style={{ display: "flex" }}>
            <h4>Refund Application</h4>
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
          <Card.Description style={{ overflowY: "auto", height: "70vh" }}>
            <div className="col-md-7">
              <Form>
                <Form.Field width={8}>
                  <label>Event Type</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    onChange={this.handleChange}
                    value={eventType}
                    name="eventType"
                    placeholder="Select Report Type"
                    options={event_type}
                  />
                </Form.Field>
                <Form.Group>
                  <Form.Field width={8}>
                    <Form.Input
                      placeholder="From"
                      name="fdegfrm"
                      value={fdegfrm}
                      onChange={this.handleChange}
                      maxLength="5"
                      label="Degree Range"
                    />
                  </Form.Field>
                  <Form.Field width={8}>
                    <Form.Input
                      placeholder="To"
                      name="fdegto"
                      value={fdegto}
                      onChange={this.handleChange}
                      maxLength="5"
                      style={{ marginTop: "1.6em" }}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={8}>
                    <Form.Input
                      placeholder="From"
                      name="fcollfrm"
                      value={fcollfrm}
                      onChange={this.handleChange}
                      maxLength="4"
                      label="College Range"
                    />
                  </Form.Field>
                  <Form.Field width={8}>
                    <Form.Input
                      placeholder="To"
                      name="fcollto"
                      value={fcollto}
                      onChange={this.handleChange}
                      maxLength="4"
                      style={{ marginTop: "1.6em" }}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={8}>
                    <Form.Input
                      placeholder="From"
                      name="fregfrm"
                      value={fregfrm}
                      onChange={this.handleChange}
                      maxLength="8"
                      label="Register No. Range"
                    />
                  </Form.Field>
                  <Form.Field width={8}>
                    <Form.Input
                      placeholder="To"
                      name="fregto"
                      value={fregto}
                      onChange={this.handleChange}
                      maxLength="8"
                      style={{ marginTop: "1.6em" }}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={8}>
                    <Form.Input
                      placeholder="From"
                      name="fappfrm"
                      value={fappfrm}
                      onChange={this.handleChange}
                      maxLength="11"
                      label="Application No. Range"
                    />
                  </Form.Field>
                  <Form.Field width={8}>
                    <Form.Input
                      placeholder="To"
                      name="fappto"
                      value={fappto}
                      onChange={this.handleChange}
                      maxLength="11"
                      style={{ marginTop: "1.6em" }}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Field width={8}>
                  <label>Status</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    onChange={this.handleChange}
                    value={fstatus}
                    name="fstatus"
                    placeholder="Select Report Type"
                    options={status_type}
                  />
                </Form.Field>
                <Button
                  content="Submit"
                  size="mini"
                  color="facebook"
                  onClick={this.handleSubmit}
                />
              </Form>
            </div>
          </Card.Description>

          {this.state.ftrue && <DisplyRefundList />}
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    univcode: state.univ.funivcode,
    list: state.refundList
  };
};

export default connect(mapStateToProps, {
  showError,
  fetchRefundList
})(RefundApp);
