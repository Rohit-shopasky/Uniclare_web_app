import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Dropdown } from "semantic-ui-react";
import { updateCntr, addCntr } from "../../../actions/before-exam/centers";
import { showError } from "../../../actions";

class TagColl extends Component {
  componentDidMount() {
    this.props.onRef(this);
  }

  changeCell = async (e, el, i) => {
    const updel = { ...el, [e.name]: e.value };
    this.props.updateCntr(updel, i);
  };

  deleteRow = (e, el, i) => {
    const updel = { ...el, [e.target.name]: e.target.checked };
    this.props.updateCntr(updel, i);
  };

  addRow = (e, i) => {
    if (e.keyCode === 9) {
      const el = this.props.examcentreList[i];
      if (el.fcollcode === "") {
        this.setState({ error: true, errorMessage: "Enter the vlaues" });
        return;
      } else {
        this.setState({ error: false, errorMessage: "" });
      }
      const item = { fcollcode: "", fdeleted: false };
      this.props.addCntr(item);
    }
  };

  addRowTop = () => {
    const i = this.props.examcentreList.length;

    const el = this.props.examcentreList[i - 1];
    if (el.fcollcode === "") {
      const error = { header: "Error", content: "College Cannot be blank" };
      this.props.showError(error);
      return;
    }
    const item = { fcollcode: "", fdeleted: false };
    this.props.addCntr(item);
  };

  render() {
    const { degcoll, examcentreList } = this.props;

    const arlength = examcentreList.length;
    const deggcoll_options = degcoll.map((el, i) => {
      return { key: i, value: el.fcollcode, text: el.fcollname };
    });

    return (
      <Table celled style={{ fontSize: "1.0em" }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              style={{ width: "5%" }}
              colSpan="3"
              singleLine
              textAlign="left"
            >
              No. of taged colleges : {arlength}
            </Table.HeaderCell>
          </Table.Row>

          <Table.Row>
            <Table.HeaderCell
              style={{ width: "5%" }}
              singleLine
              textAlign="center"
            >
              Sl. No.
            </Table.HeaderCell>
            <Table.HeaderCell style={{ width: "60%" }} textAlign="center">
              College Name
            </Table.HeaderCell>
            <Table.HeaderCell style={{ width: "5%" }} textAlign="center">
              Del.
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {examcentreList.map((el, i) => {
            return (
              <Table.Row key={i}>
                <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                <Table.Cell textAlign="center" singleLine>
                  {/* <input className="field" type="text" name="fcollname" id={i}
                value={el.fcollname}
                onChange={(e) => this.changeCell(e, el, i)} /> */}

                  <Dropdown
                    fluid
                    search
                    selection
                    placeholder="Select Exam Center"
                    name="fcollcode"
                    value={el.fcollcode}
                    onChange={(e, data) =>
                      this.changeCell(
                        // @ts-ignore
                        { name: "fcollcode", data: e.target.value },
                        el,
                        i
                      )
                    }
                    options={deggcoll_options}
                  />
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {arlength === i + 1 ? (
                    <div className="ui checkbox">
                      <input
                        type="checkbox"
                        onKeyDown={e => this.addRow(e, i)}
                        name="fdeleted"
                        value={el.fdeleted}
                        onChange={e => this.deleteRow(e, el, i)}
                        checked={String(el.fdeleted) == "true"}
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
                        checked={String(el.fdeleted) == "true"}
                      />
                      <label> </label>
                    </div>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    );
  }
}

const mapStateToProps = state => {
  return {
    degcoll: state.degcoll,
    examcentreList: state.examCntrDet
  };
};

export default connect(
  mapStateToProps,
  { updateCntr, addCntr, showError }
)(TagColl);
