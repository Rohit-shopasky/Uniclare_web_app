import React, { Component } from "react";
import { Form, Table, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  changeSemData,
  addRow
} from "../../../../actions/masters/DegEntryScrn";
import { showError } from "../../../../actions";

class DisplaySemester extends Component {
  state = {};

  changeCell = (data, el, i) => {
    let newdata = {};
    newdata = { ...el, [data.name]: data.value };
    this.props.changeSemData(newdata, i);
  };

  add = () => {
    let i = this.props.DegreeDet.SemDet.length;
    const el = this.props.DegreeDet.SemDet[i - 1];

    if (el.fexamno === "" || el.fexamname === "" || el.ftotsub === "") {
      const error = {
        header: "Error",
        content: "Semester details cannot be empty. "
      };
      this.props.showError(error);
      return;
    }

    const newRow = {
      fexamno: "",
      fexamname: "",
      ftotsub: "",
      fresyear: "",
      fresexamtype: "",
      fresexamdate: "",
      frvfee: "",
      frtfee: "",
      fxeroxfee: "",
      fcvfee: "",
      frifee: "",
      frvdays: "",
      frtdays: "",
      fxrdays: "",
      fcvdays: "",
      fridays: ""
    };
    this.props.addRow(newRow);
  };

  render() {
    let SemDet = this.props.DegreeDet.SemDet;
    return (
      <>
        <div style={{ overflowX: "scroll" }}>
          {/* <Form> */}
          {/* <div className="col-md-12">  style={{ overflowX: "scroll" }} */}
          <Table celled compact>
            <Table.Header>
              <Table.Row textAlign="left">
                <Table.HeaderCell colSpan="16">
                  <Button
                    basic
                    size="small"
                    onClick={this.add}
                    color="green"
                    icon="plus"
                    content="Add"
                    className="ml-3 p-2"
                  />
                  Semesters
                </Table.HeaderCell>
              </Table.Row>
              <Table.Row textAlign="center">
                <Table.HeaderCell width="1">Exam No.</Table.HeaderCell>
                <Table.HeaderCell width="4">Exam Name</Table.HeaderCell>
                <Table.HeaderCell width="1">Total Subjects</Table.HeaderCell>
                <Table.HeaderCell width="1">Result Year</Table.HeaderCell>
                <Table.HeaderCell width="1">ResExam Type</Table.HeaderCell>
                <Table.HeaderCell width="4">Result Date</Table.HeaderCell>
                <Table.HeaderCell width="1">RV Fee</Table.HeaderCell>
                <Table.HeaderCell width="1">RT Fee</Table.HeaderCell>
                <Table.HeaderCell width="1">PC Fee</Table.HeaderCell>
                <Table.HeaderCell width="1">CV Fee</Table.HeaderCell>
                <Table.HeaderCell width="1">RI Fee</Table.HeaderCell>
                <Table.HeaderCell width="1">RV Days</Table.HeaderCell>
                <Table.HeaderCell width="1">RT Days</Table.HeaderCell>
                <Table.HeaderCell width="1">PC Days</Table.HeaderCell>
                <Table.HeaderCell width="1">CV Days</Table.HeaderCell>
                <Table.HeaderCell width="1">RI Days</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {SemDet.map((el, i) => {
                return (
                  <Table.Row key={i}>
                    <Table.Cell
                      style={{ padding: "0px 0px" }}
                      textAlign="center"
                    >
                      <Form.Input
                        style={{ width: "100px" }}
                        type="text"
                        value={el.fexamno}
                        name="fexamno"
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ padding: "0px 0px" }}>
                      <Form.Input
                        type="text"
                        value={el.fexamname}
                        style={{ width: "100%" }}
                        name="fexamname"
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ padding: "0px 0px" }}>
                      <Form.Input
                        type="text"
                        name="ftotsub"
                        value={el.ftotsub}
                        style={{ width: "100px" }}
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ padding: "0px 0px" }}>
                      <Form.Input
                        type="text"
                        name="fresyear"
                        value={el.fresyear}
                        style={{ width: "100px" }}
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ padding: "0px 0px" }}>
                      <Form.Input
                        type="text"
                        name="fresexamtype"
                        value={el.fresexamtype}
                        style={{ width: "100px" }}
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ padding: "0px 0px" }}>
                      <Form.Input
                        type="text"
                        name="fresexamdate"
                        value={el.fresexamdate}
                        style={{ width: "100%" }}
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ padding: "0px 0px" }}>
                      <Form.Input
                        type="text"
                        name="frvfee"
                        value={el.frvfee}
                        style={{ width: "100px" }}
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ padding: "0px 0px" }}>
                      <Form.Input
                        type="text"
                        name="frtfee"
                        value={el.frtfee}
                        style={{ width: "100px" }}
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ padding: "0px 0px" }}>
                      <Form.Input
                        type="text"
                        name="fxeroxfee"
                        value={el.fxeroxfee}
                        style={{ width: "100px" }}
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ padding: "0px 0px" }}>
                      <Form.Input
                        type="text"
                        name="fcvfee"
                        value={el.fcvfee}
                        style={{ width: "100px" }}
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ padding: "0px 0px" }}>
                      <Form.Input
                        type="text"
                        name="frifee"
                        value={el.frifee}
                        style={{ width: "100px" }}
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ padding: "0px 0px" }}>
                      <Form.Input
                        type="text"
                        name="frvdays"
                        value={el.frvdays}
                        style={{ width: "100px" }}
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ padding: "0px 0px" }}>
                      <Form.Input
                        type="text"
                        name="frtdays"
                        value={el.frtdays}
                        style={{ width: "100px" }}
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ padding: "0px 0px" }}>
                      <Form.Input
                        type="text"
                        name="fxrdays"
                        value={el.fxrdays}
                        style={{ width: "100px" }}
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                    <Table.Cell style={{ padding: "0px 0px" }}>
                      <Form.Input
                        type="text"
                        name="fcvdays"
                        value={el.fcvdays}
                        style={{ width: "100px" }}
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                    <Table.Cell
                      style={{ padding: "0px 0px" }}
                      textAlign="center"
                    >
                      <Form.Input
                        type="text"
                        name="fridays"
                        value={el.fridays}
                        style={{ width: "100px" }}
                        onChange={(e, data) => this.changeCell(data, el, i)}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          {/* </Form> */}
          {/* </div> */}
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    DegreeDet: state.getDegreeDet
  };
};
export default connect(
  mapStateToProps,
  { changeSemData, addRow, showError }
)(DisplaySemester);
