import React, { Component } from "react";
import { Divider, Table } from "semantic-ui-react";
import { connect } from "react-redux";

class FeeDetlTable extends Component {
  state = {
    feeDetl: []
  };

  componentDidMount() {
    this.props.onRef(this);
    this.setState({ feeDetl: [...this.props.feeDetl.details] });
  }

  componentDidUpdate(prevProps) {
    if (this.props.feeDetl !== prevProps.feeDetl) {
      this.setState({ feeDetl: [...this.props.feeDetl.details] });
    }
  }

  cancel = () => {
    this.setState({ feeDetl: [] });
  };

  changeCell = (e, el, i) => {
    const feeDetl = this.state.feeDetl;
    if (!/^\d*$/.test(e.target.value)) return;
    let arra = feeDetl.map((item, j) => {
      let data = item;
      if (j === i) {
        data = { ...el, [e.target.name]: e.target.value };
      }
      return data;
    });
    this.setState({ feeDetl: arra });
  };

  handleSave = async () => {
    if (this.state.feeDetl.length <= 1) {
      this.setState({ error: true, errorMessage: "Enter the vlaues" });
      return;
    } else {
      this.setState({ error: false, errorMessage: "" });
    }

    for (let i = 0; i < this.state.feeDetl.length; i++) {
      let el = this.state.feeDetl[i];
      if (el.fdeggrp === "" || el.fdescpn === "") {
        this.setState({ error: true, errorMessage: "Enter all the vlaues" });
        return;
      }
    }
    this.setState({ error: false, errorMessage: "" });

    await this.props.saveCntrList(this.state.feeDetl, this.state.degGrp);

    this.setState({ frmsubmit: false, feeDetl: [] });
  };

  render() {
    const { feeDetl } = this.state;

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
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Practical Fees
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Max Fees
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Repeater Fees
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Repeater Pr. Fees
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {feeDetl.map((el, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                  <Table.Cell>{el.fdescpn}</Table.Cell>
                  <Table.Cell textAlign="center" singleLine>
                    <input
                      className="field"
                      type="text"
                      name="ffee"
                      id={i}
                      value={el.ffee}
                      style={{ textAlign: "center" }}
                      onChange={e => this.changeCell(e, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type="text"
                      value={el.fprfee}
                      name="fprfee"
                      id={i}
                      style={{ textAlign: "center" }}
                      onChange={e => this.changeCell(e, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type="text"
                      value={el.fmaxfee}
                      name="fmaxfee"
                      id={i}
                      style={{ textAlign: "center" }}
                      onChange={e => this.changeCell(e, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type="text"
                      value={el.frepfee}
                      name="frepfee"
                      id={i}
                      style={{ textAlign: "center" }}
                      onChange={e => this.changeCell(e, el, i)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type="text"
                      value={el.frepprfee}
                      name="frepprfee"
                      id={i}
                      style={{ textAlign: "center" }}
                      onChange={e => this.changeCell(e, el, i)}
                    />
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
    feeDetl: state.feeDetl
  };
};

export default connect(
  mapStateToProps,
  {}
)(FeeDetlTable);
