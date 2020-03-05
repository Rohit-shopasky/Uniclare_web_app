import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "semantic-ui-react";
import { selectDeggrpDegree } from "../../../actions/degreeGroup";
import { showError } from "../../../actions";

class DegreeSelect extends Component {
  // select or desect Degree by checking on
  selectDegree = (e, el, i) => {
    const data = { ...el, [e.target.name]: e.target.checked };
    this.props.selectDeggrpDegree(data, i);
  };

  render() {
    const { degrees } = this.props;

    console.log(degrees);

    return (
      <div className="ui mini form">
        {/* <Table celled style={{ fontSize: "1.2536em" }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                style={{ width: "5%" }}
                singleLine
                textAlign="center"
              >
                Sl. No.
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "22%" }} textAlign="center">
                Degree
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Description
              </Table.HeaderCell>
              <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                Select
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {degrees.map((el, i) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell textAlign="center">{i + 1}</Table.Cell>

                  <Table.Cell textAlign="center" singleLine>
                    {el.fdegree}
                  </Table.Cell>

                  <Table.Cell>{el.fdescpn}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <div className="ui checkbox">
                      <input
                        type="checkbox"
                        name="fselect"
                        value={el.fselect}
                        onChange={e => this.selectDegree(e, el, i)}
                        checked={el.fselect == "true" ? "checked" : null}
                      />
                      <label> </label>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    degrees: state.degGrpDegree
  };
};
export default connect(
  mapStateToProps,
  {
    selectDeggrpDegree,
    showError
  }
)(DegreeSelect);
