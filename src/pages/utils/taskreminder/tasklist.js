import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  Input,
  Card,
  Divider,
  Form,
  Dropdown,
  Header,
  Icon,
  Image,
  Button
} from "semantic-ui-react";
import InputMask from "react-input-mask";
import {
  taskReminder,
  changeData,
  TaskList,
  SaveReminderData,
  changeDataReminder,
  addCommentOnReminder
} from "../../../actions/utils/taskreminder";
import { async } from "q";
class Tasklist extends Component {
  state = {
    newstatus: "",
    newReply: ""
  };
  handlesubmit = () => {
    let data = {
      fid: this.props.coldata.fid,
      reply: this.state.newReply,
      status: this.state.newstatus,
      frmddetl: this.props.coldata.frmddetl
    };
    console.log(data);
    this.props.addCommentOnReminder(data);
  };
  render() {
    console.log("asasasa", this.props);
    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };

    var statusOptions = [
      { key: 1, value: "1", text: "1" },
      { key: 2, value: "2", text: "2" },
      { key: 3, value: "3", text: "3" },
      { key: 4, value: "4", text: "4" },
      { key: 5, value: "5", text: "5" }
    ];

    return (
      <div>
        <div className="col-md-12 col-lg-12 col-sm-10 col-xs-12">
          <Header as="h3" icon textAlign="center">
            <Header.Content>Reply To Reminder</Header.Content>
          </Header>
          <Table padded="very">
            <Table.Body>
              <Table.Row></Table.Row>
              <Table.Row>
                <Table.Cell>Reminded By</Table.Cell>
                <Table.Cell>
                  <b>{this.props.name}</b>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Reminded On</Table.Cell>
                <Table.Cell>
                  <b>{this.props.coldata.fcrdate} </b>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Expriry Date </Table.Cell>
                <Table.Cell>
                  <b>{this.props.coldata.fexpdate} </b>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Subject</Table.Cell>
                <Table.Cell>
                  <b>{this.props.coldata.frmdsub}</b>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Deatils</Table.Cell>

                <Table.Cell>
                  <b>{this.props.coldata.frmddetl}</b>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Reply</Table.Cell>
                <Table.Cell>
                  <Form.TextArea
                    width={16}
                    style={{ width: "300px" }}
                    onChange={e => {
                      this.setState({ newReply: e.target.value });
                    }}
                    name="frmddetl"
                    placeholder="Reply"
                  />
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Status</Table.Cell>
                <Table.Cell>
                  <Dropdown
                    placeholder="Reminder To"
                    fluid
                    onChange={(e, { name, value }) => {
                      this.setState({ newstatus: value });
                    }}
                    search
                    label="Enter Reminder To"
                    selection
                    value={this.state.newstatus}
                    name="frmdto"
                    options={statusOptions}
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Button
                    basic
                    color="green"
                    onClick={this.handlesubmit}
                    content="Save"
                    icon="file"
                  />
                </Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    reminderList: state.ALLReminderTask,
    memberData: state.taskReminderData,
    replyData: state.changeDataReminder
  };
};
export default connect(
  mapStateToProps,
  {
    addCommentOnReminder,
    changeDataReminder,
    TaskList
  }
)(Tasklist);
