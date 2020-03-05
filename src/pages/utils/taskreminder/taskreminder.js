import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Form,
  Dropdown,
  Divider,
  Label,
  Table,
  Input
} from "semantic-ui-react";
import { connect } from "react-redux";

import {
  taskReminderUser,
  changeData,
  SaveReminderData,
  TaskList
} from "../../../actions/utils/taskreminder";
import { wHeight } from "../../parms";
// import { userDetails } from "../../../reducers/createUser";
import Tasklist from "./tasklist";
import InputMask from "react-input-mask";
class TaskReminder extends Component {
  state = {
    code: "",
    name: "",
    left: "col-md-12",
    right: "col-md-6",
    showright: false,
    Fname: "",
    newReminder: false
  };

  handleChange = async (e, { name, value }) => {
    console.log("{ name, value ", name, value);
    this.props.changeData(name, value);
  };
  handleChangeDate = async (name, value) => {
    this.props.changeData(name, value);
  };
  saveReminder = () => {
    var newdata = {
      frmdby: this.props.loginUser.fuserid,
      fexpdate: this.props.memberData.fexdate,
      fpriority: this.props.memberData.fpriority,
      frmddetl: this.props.memberData.frmddetl,
      frmdsub: this.props.memberData.frmdsub,
      frmdto: this.props.memberData.frmdto
    };
    this.props.SaveReminderData(newdata);
    console.log("this.", newdata);
  };

  componentDidMount = () => {
    var MemberList = this.props.taskReminderUser();
    this.props.TaskList(this.props.loginUser.fuserid);
  };
  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h3>Task Reminder</h3>
        <div className="ml-auto">
          <Button
            basic
            color="blue"
            onClick={() => {
              this.setState({ newReminder: true, showright: false });
            }}
            content="New"
            icon="add"
          />
          <Button
            basic
            color="black"
            icon="ban"
            onClick={() => {
              this.setState({ newReminder: false, showright: false });
            }}
            content="Cancel"
          />

          <Link to="/dashboard">
            <Button basic color="red" content="Exit" icon="home" />
          </Link>
        </div>
      </Card.Header>
    );
  };

  renderForm = () => {
    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };

    var countryOptions = [];
    var PeriorityOptions = [
      { key: 1, value: "1", text: "1" },
      { key: 2, value: "2", text: "2" },
      { key: 3, value: "3", text: "3" },
      { key: 4, value: "4", text: "4" },
      { key: 5, value: "5", text: "5" }
    ];

    const wheight = wHeight();
    console.log("daatfina", this.props.memberData, this.props.loginUser);
    countryOptions = [];

    this.props.memberData.data.map(item => {
      if (item.fregno != this.props.loginUser.fuserid)
        countryOptions.push({
          key: item.fregno,
          value: item.fregno,
          text: `${item.fregno}   ${item.fname}`
        });
      return null;
    });
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            {this.renderHeader()}
            <Divider />
            <Card.Description
              style={{ overflowY: "auto", height: `${wheight}px` }}
            >
              <div className="row" style={{ margin: "0px", padding: "0px" }}>
                {/* for firt row */}
                {!this.state.newReminder && (
                  <div
                    className={
                      !this.state.showright ? this.state.left : this.state.right
                    }
                  >
                    <div>
                      <br />
                      <Card.Header style={{ display: "flex" }}>
                        <h3>Task Reminder</h3>
                        <div className="ml-auto"></div>
                      </Card.Header>
                      <Card.Content>
                        <Divider />

                        <Card.Description>
                          <Table
                            celled
                            padded
                            selectable
                            size="small"
                            color="olive"
                            className="tbl sticky"
                          >
                            <Table.Header>
                              <Table.Row textAlign="center">
                                <Table.HeaderCell>Sl.No.</Table.HeaderCell>
                                <Table.HeaderCell>Reminded By</Table.HeaderCell>
                                <Table.HeaderCell>
                                  Reminded On{" "}
                                </Table.HeaderCell>
                                <Table.HeaderCell> Subject</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Priority</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Body>
                              {this.props.reminderList.length > 0 &&
                                this.props.reminderList.map((el, i) => {
                                  return (
                                    <Table.Row
                                      onClick={async () => {
                                        await this.setState({
                                          showright: true,
                                          code: el.frmdto,
                                          Fname: el.FNAME,
                                          reminon: el.fcrdate,
                                          coldata: el
                                        });
                                      }}
                                      key={i}
                                      style={{ overflow: "hidden" }}
                                    >
                                      <Table.Cell textAlign="center">
                                        {i + 1}
                                      </Table.Cell>
                                      <Table.Cell>{el.FNAME}</Table.Cell>

                                      <Table.Cell>{el.fcrdate}</Table.Cell>
                                      <Table.Cell>{el.frmdsub}</Table.Cell>
                                      <Table.Cell>{el.fstatus}</Table.Cell>
                                      <Table.Cell>{el.fpriority}</Table.Cell>
                                    </Table.Row>
                                  );
                                })}
                            </Table.Body>
                          </Table>
                        </Card.Description>
                      </Card.Content>
                    </div>
                    {/* <Tasklist frmdby={this.props.loginUser.fuserid} /> */}
                  </div>
                )}
                {/* table has end here and sstart of side bar */}

                {this.state.showright && (
                  <div className={this.state.right}>
                    <Tasklist
                      name={this.state.Fname}
                      coldata={this.state.coldata}
                      code={this.state.code}
                    />
                  </div>
                )}
              </div>

              {this.state.newReminder && (
                <div className="col-md-12">
                  <Form>
                    <Form.Group width={16}>
                      <Form.Input
                        width={16}
                        readOnly
                        placeholder="College Code"
                        value={`${this.props.loginUser.fuserid}  ${this.props.loginUser.fname}`}
                        label="Enter Reminder By"
                        name="frmdby"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={16}>
                        <label>Reminder To</label>
                        <Dropdown
                          placeholder="Reminder To"
                          fluid
                          search
                          label="Enter Reminder To"
                          selection
                          onChange={this.handleChange}
                          name="frmdto"
                          options={countryOptions}
                        />
                      </Form.Field>
                    </Form.Group>

                    <Form.Group width={16}>
                      <Form.Input
                        onChange={this.handleChange}
                        width={16}
                        placeholder="Reminder Subject"
                        label="Reminder Subject"
                        name="frmdsub"
                      />
                    </Form.Group>

                    <Form.Group width={16}>
                      <Form.TextArea
                        width={16}
                        onChange={this.handleChange}
                        placeholder="College Code"
                        label="Reminder Details"
                        name="frmddetl"
                        placeholder="Tell us more"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={16}>
                        <label>Task Periority</label>
                        <Dropdown
                          placeholder="Select Priority"
                          fluid
                          search
                          label="Enter Reminder To"
                          selection
                          onChange={this.handleChange}
                          name="fpriority"
                          options={PeriorityOptions}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group width={16}>
                      <Form.Field width={16}>
                        <label>Reminder Expire Date </label>
                        <InputMask
                          type="text"
                          placeholder="Expire Date"
                          name="fexdate"
                          mask="ed/nm/zyyy"
                          formatChars={formatChars}
                          onChange={e => {
                            this.handleChangeDate(
                              e.target.name,
                              e.target.value
                            );
                          }}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Button
                      basic
                      color="green"
                      onClick={() => {
                        this.saveReminder();
                      }}
                      content="save"
                      icon="file"
                    />

                    <Button
                      basic
                      color="red"
                      onClick={() => {
                        this.setState({ newReminder: false });
                      }}
                      content="Cancel"
                    />
                  </Form>
                </div>
              )}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  };
  render() {
    // console.log("collegeReport",this.props.collegeReport);
    return this.renderForm();
  }
}

const mapStateToProps = state => {
  return {
    memberData: state.taskReminderData,
    loginUser: state.user,
    reminderList: state.ALLReminderTask
  };
};
export default connect(
  mapStateToProps,
  {
    taskReminderUser,
    changeData,
    SaveReminderData,
    TaskList
  }
)(TaskReminder);
