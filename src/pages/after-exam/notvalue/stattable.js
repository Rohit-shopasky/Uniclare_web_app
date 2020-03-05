import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Divider, Input, Label } from "semantic-ui-react";
import { showError } from "../../../actions";

import { getNotval } from "../../../actions/after-exam/notvalued";
class StatTable extends Component {
  state = {
    qpstat: [],
    searchVal: ""
  };

  componentDidMount() {
    console.log(this.props.qpstat, "sssss");
    this.setState({ qpstat: this.props.qpstat.valuatordet, searchVal: "" });
  }

  componentDidUpdate(prevProps) {
    if (this.props.qpstat !== prevProps.qpstat) {
      this.setState({ qpstat: this.props.qpstat, searchVal: "" });
    }
  }

  searchTable = (e, data) => {
    const string = data.value;
    const searchqpstat = this.props.qpstat.valuatordet.filter(o =>
      Object.keys(o).some(k =>
        o[k].toLowerCase().includes(string.toLowerCase())
      )
    );
    this.setState({ qpstat: searchqpstat, searchVal: data.value });
  };
  render() {
    const qpstat = this.props.qpstat.valuatordet;

    return (
      <div>
        <div
          style={{
            margin: "1em 0em",
            backgroundColor: "white"
          }}
          className="stick"
        >
          <Input
            icon="search"
            fluid
            placeholder="Search..."
            value={this.state.searchVal}
            onChange={this.searchTable}
          />
        </div>
        <Table celled compact>
          <Table.Header>
            {" "}
            <>
              <Table.Row>
                <Table.HeaderCell
                  style={{ width: "5%" }}
                  singleLine
                  rowSpan="2"
                  textAlign="center"
                >
                  Sl. No.
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ width: "10%" }}
                  textAlign="center"
                  rowSpan="2"
                >
                  College Code
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ width: "40%" }}
                  rowSpan="2"
                  textAlign="center"
                >
                  College Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ width: "10%" }}
                  rowSpan="2"
                  textAlign="center"
                >
                  Teacher Code
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ width: "10%" }}
                  rowSpan="2"
                  textAlign="center"
                >
                  Teacher Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ width: "10%" }}
                  rowSpan="2"
                  textAlign="center"
                >
                  Status
                </Table.HeaderCell>
              </Table.Row>
            </>
          </Table.Header>
          <Table.Body>
            {qpstat.map((el, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                  <Table.Cell textAlign="center">{el.fcollcode}</Table.Cell>
                  <Table.Cell>{el.fcollname}</Table.Cell>
                  <Table.Cell textAlign="center">{el.fteachcode}</Table.Cell>
                  <Table.Cell>{el.fteachname}</Table.Cell>
                  <Table.Cell>
                    {el.fvalstatus == "T" ? (
                      <Label color="green" horizontal>
                        Doing Valuation
                      </Label>
                    ) : (
                      <Label color="red" horizontal>
                        Not Doing Valuation
                      </Label>
                    )}
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
  return { qpstat: state.getNotvalData, user: state.user };
};

export default connect(
  mapStateToProps,
  { showError, getNotval }
)(StatTable);
