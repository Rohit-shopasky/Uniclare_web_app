import React, { Component } from "react";
import { Table, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  addDateMaster,
  changeDateMaster
} from "../../../actions/masters/dateMaster";
import { showError } from "../../../actions";
import InputMask from "react-input-mask";

class DateMasterDisplay extends Component {
  state = {
    datecode: "",
    date: "",
    del: false,
    datemaster: [{ fdatecode: "", fdate: "", fdeleted: false }],
    error: false,
    errorMessage: ""
  };

  componentDidMount() {
    this.setState({ datemaster: [...this.props.dateMaster] });
    this.props.onRef(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.dateMaster !== prevProps.dateMaster) {
      this.setState({ datemaster: [...this.props.dateMaster] });
    }
  }

  changeCell = (e, el, i) => {
    let data = {};
    if (e.target.name === "fdatecode")
      data = { ...el, [e.target.name]: e.target.value.toUpperCase() };
    else data = { ...el, [e.target.name]: e.target.value };
    this.props.changeDateMaster(data, i);
  };

  deleteRow = (e, el, i) => {
    const data = { ...el, [e.target.name]: e.target.checked };
    this.props.changeDateMaster(data, i);
  };

  addRow = () => {
    let i = this.state.datemaster.length - 1;
    const el = this.state.datemaster[i];
    if (el.fdatecode === "" || el.fdate === "") {
      const error = {
        header: "Error",
        content: "Date code and date cannot be blank"
      };
      this.props.showError(error);
      return;
    }

    var dupldc = false;
    this.state.datemaster.map((item, j) => {
      if (item.fdatecode === el.fdatecode && i !== j) dupldc = true;
    });
    // If it is duplicate show error
    if (dupldc) {
      const error = {
        header: "Error",
        content: "Duplicate datecode. Enter valid datecode."
      };
      this.props.showError(error);
      return;
    }

    const item = { fdatecode: "", fdate: "", fdeleted: false };
    this.props.addDateMaster(item);
  };

  render() {
    const { datemaster, error, errorMessage } = this.state;
    const arlength = datemaster.length;

    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };

    return (
      <div className="ui mini form">
        {error ? (
          <Message negative>
            <Message.Header> {errorMessage} </Message.Header>
          </Message>
        ) : null}
        <br />
        <Table celled style={{ fontSize: "1.2536em" }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                style={{ width: "5%" }}
                singleLine
                textAlign="center"
              >
                Sl. No.
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "20%" }} textAlign="center">
                Date Code
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Date</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Del
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {datemaster.map((el, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                  <Table.Cell textAlign="center" singleLine>
                    <input
                      style={{ textAlign: "center" }}
                      minLength="3"
                      maxLength="3"
                      className="field"
                      type="text"
                      name="fdatecode"
                      id={i}
                      value={el.fdatecode}
                      onChange={e => this.changeCell(e, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <InputMask
                      type="text"
                      formatChars={formatChars}
                      mask="ed/nm/zyyy"
                      value={el.fdate}
                      name="fdate"
                      id={i}
                      onChange={e => this.changeCell(e, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {arlength == i + 1 ? (
                      <div className="ui checkbox">
                        <input
                          type="checkbox"
                          onKeyDown={e => {
                            e.preventDefault();
                            if (e.keyCode === 9) this.addRow();
                          }}
                          name="fdeleted"
                          value={el.fdeleted}
                          onChange={e => this.deleteRow(e, el, i)}
                          checked={el.fdeleted == "true" ? "checked" : null}
                        />
                        <label> </label>
                      </div>
                    ) : (
                      <div className="ui checkbox">
                        <input
                          type="checkbox"
                          name="fdeleted"
                          value={el.fdeleted}
                          onChange={e => this.deleteRow(e, el, i)}
                          checked={el.fdeleted == "true" ? "checked" : null}
                        />
                        <label> </label>
                      </div>
                    )}

                    {/* <Button size='mini' color="red" icon='trash' content="Delete"/> */}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dateMaster: state.dateMaster
  };
};
export default connect(
  mapStateToProps,
  {
    addDateMaster,
    changeDateMaster,
    showError
  }
)(DateMasterDisplay);
