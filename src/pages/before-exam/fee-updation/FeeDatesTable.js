import React, { Component } from "react";
import { Divider, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import InputMask from "react-input-mask";

class FeeDateTable extends Component {
  state = {
    feedate: []
  };

  componentDidMount() {
    this.props.onRef(this);
    this.setState({ feedate: [...this.props.feedate] });
  }

  componentDidUpdate(prevProps) {
    if (this.props.feedate !== prevProps.feedate) {
      this.setState({ feedate: [...this.props.feedate] });
    }
  }

  cancel = () => {
    this.setState({ feedate: [] });
  };

  changeCell = async (e, el, i) => {
    const feedate = this.state.feedate;
    let arra = feedate.map((item, j) => {
      let data = item;
      if (j === i) {
        data = { ...el, [e.target.name]: e.target.value };
      }
      return data;
    });
    await this.setState({ feedate: arra });
  };

  handleSave = async () => {
    if (this.state.feedate.length <= 1) {
      this.setState({ error: true, errorMessage: "Enter the vlaues" });
      return;
    } else {
      this.setState({ error: false, errorMessage: "" });
    }

    for (let i = 0; i < this.state.feedate.length; i++) {
      let el = this.state.feedate[i];
      if (el.fdeggrp === "" || el.fdescpn === "") {
        this.setState({ error: true, errorMessage: "Enter all the vlaues" });
        return;
      }
    }
    this.setState({ error: false, errorMessage: "" });

    await this.props.saveCntrList(this.state.feedate, this.state.degGrp);

    this.setState({ frmsubmit: false, feedate: [] });
  };

  render() {
    const { feedate } = this.state;

    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };

    return (
      <div className="ui form">
        <Divider />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                style={{ width: "5%" }}
                singleLine
                textAlign="center"
              >
                Sl. No.
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Fee Head</Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Fees
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "20%" }} textAlign="center">
                Start Date
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "20%" }} textAlign="center">
                End Date
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {feedate.map((el, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                  <Table.Cell>{el.fheadcode}</Table.Cell>
                  <Table.Cell textAlign="center">{el.fmaxfee}</Table.Cell>
                  <Table.Cell textAlign="center" singleLine>
                    <div className="field">
                      <InputMask
                        type="text"
                        style={{ textAlign: "center" }}
                        formatChars={formatChars}
                        mask="ed/nm/zyyy"
                        name="fromdate"
                        value={el.fromdate}
                        id={i}
                        onChange={e => this.changeCell(e, el, i)}
                        placeholder="dd/mm/yyyy"
                      />
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="field">
                      <InputMask
                        type="text"
                        style={{ textAlign: "center" }}
                        formatChars={formatChars}
                        mask="ed/nm/zyyy"
                        name="todate"
                        value={el.todate}
                        id={i}
                        onChange={e => this.changeCell(e, el, i)}
                        placeholder="dd/mm/yyyy"
                      />
                    </div>
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
    feedate: state.feeDate
  };
};

export default connect(
  mapStateToProps,
  {}
)(FeeDateTable);
