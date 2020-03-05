import React, { Component } from "react";
import { Form, Table, Input } from "semantic-ui-react";
import { showError } from "../../../actions";
import { connect } from "react-redux";
import { changeTblDet } from "../../../actions/after-exam/RVRTFeeUpdate"; //RVRTFeeUpdate
import InputMask from "react-input-mask";

class FeeUpdateTbl extends Component {
  state = {};

  handleChange = (e, el, i) => {
    var data = { ...el, [e.target.name]: e.target.value };
    this.props.changeTblDet(data, i);
  };

  render() {
    var tblDet = this.props.FeeUpdateDet;
    console.log("DisTblDet", tblDet);
    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };
    return (
      <>
        <div className="row">
          <div className="col-md-12">
            <Form>
              <Table celled style={{}}>
                <Table.Header>
                  <Table.Row textAlign="center">
                    <Table.HeaderCell singleLine>Sl. No.</Table.HeaderCell>
                    <Table.HeaderCell>RV Date</Table.HeaderCell>
                    <Table.HeaderCell>RT Date</Table.HeaderCell>
                    <Table.HeaderCell>Photocopy Date</Table.HeaderCell>
                    <Table.HeaderCell>CV Date</Table.HeaderCell>
                    <Table.HeaderCell>RV Fee</Table.HeaderCell>
                    <Table.HeaderCell>RT Fee</Table.HeaderCell>
                    <Table.HeaderCell>Xerox Fee</Table.HeaderCell>
                    <Table.HeaderCell>CV Fee</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {tblDet.map((el, i) => {
                    return (
                      <Table.Row key={i}>
                        <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                        <Table.Cell>
                          <InputMask
                            type="text"
                            formatChars={formatChars}
                            mask="ed/nm/zyyy"
                            placeholder="RV Date"
                            defaultValue={el.frvlastdate}
                            onChange={e => this.handleChange(e, el, i)}
                            name="frvlastdate"
                            style={{ width: "100%" }}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <InputMask
                            mask="ed/nm/zyyy"
                            formatChars={formatChars}
                            placeholder="RT date"
                            defaultValue={el.frtlastdate}
                            onChange={e => this.handleChange(e, el, i)}
                            name="frtlastdate"
                            style={{ width: "100%" }}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <InputMask
                            mask="ed/nm/zyyy"
                            formatChars={formatChars}
                            placeholder="Photocopy Date"
                            defaultValue={el.fxeroxlastdate}
                            onChange={e => this.handleChange(e, el, i)}
                            style={{ width: "100%" }}
                            name="fxeroxlastdate"
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <InputMask
                            formatChars={formatChars}
                            mask="ed/nm/zyyy"
                            placeholder="CV Date"
                            defaultValue={el.fcvlastdate}
                            onChange={e => this.handleChange(e, el, i)}
                            style={{ width: "100%" }}
                            name="fcvlastdate"
                          />
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <Input
                            placeholder="RV Fee"
                            defaultValue={el.frvfee}
                            onChange={e => this.handleChange(e, el, i)}
                            style={{ width: "100%" }}
                            name="frvfee"
                          />
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <Input
                            placeholder="RT Fee"
                            defaultValue={el.frtfee}
                            onChange={e => this.handleChange(e, el, i)}
                            style={{ width: "100%" }}
                            name="frtfee"
                          />
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <Input
                            placeholder="Xerox Fee"
                            defaultValue={el.fxrfee}
                            onChange={e => this.handleChange(e, el, i)}
                            style={{ width: "100%" }}
                            name="fxrfee"
                          />
                        </Table.Cell>
                        <Table.Cell textAlign="center">
                          <Input
                            placeholder="CV Fee"
                            defaultValue={el.fcvfee}
                            onChange={e => this.handleChange(e, el, i)}
                            style={{ width: "100%" }}
                            name="fcvfee"
                          />
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </Form>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    FeeUpdateDet: state.shwFeeUpdateDet
  };
};
export default connect(
  mapStateToProps,
  {
    showError,
    changeTblDet
  }
)(FeeUpdateTbl);
