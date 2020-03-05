import React, { Component } from "react";
import { Table, Input } from "semantic-ui-react";
import "react-table/react-table.css";
import "../../../index.css";

class ColgReportDisplay extends Component {
  state = { colgdet: [], searchVal: "" };

  componentDidMount() {
    this.setState({ colgdet: this.props.reportdet });
  }

  componentDidUpdate(prevProps) {
    if (this.props.reportdet !== prevProps.reportdet) {
      this.setState({ colgdet: this.props.reportdet });
    }
  }

  searchTable = (e, data) => {
    const string = data.value;
    const searchPrbatch = this.props.reportdet.filter(o =>
      Object.keys(o).some(k =>
        o[k].toLowerCase().includes(string.toLowerCase())
      )
    );
    this.setState({ colgdet: searchPrbatch, searchVal: data.value });
  };

  renderTable = () => {
    const report = this.state.colgdet;
    return (
      <div className="mt-3">
        <hr />
        <div
          style={{
            marginBottom: "1em",
            backgroundColor: "white"
          }}
          className="stick"
        >
          <Input
            icon="search"
            fluid
            placeholder="Search..."
            onChange={this.searchTable}
            value={this.state.searchVal}
            style={{ fontSize: "1.1em" }}
          />
        </div>
        <div>
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
                <Table.HeaderCell>College Code</Table.HeaderCell>
                <Table.HeaderCell>College Name</Table.HeaderCell>
                <Table.HeaderCell>Town</Table.HeaderCell>
                <Table.HeaderCell>Principal Name</Table.HeaderCell>
                <Table.HeaderCell>Mobile</Table.HeaderCell>
                <Table.HeaderCell>Alt. Contact</Table.HeaderCell>
                <Table.HeaderCell>Email Id</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {report.map((el, i) => {
                return (
                  <Table.Row key={i} style={{ overflow: "hidden" }}>
                    <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                    <Table.Cell>{el.fcollcode}</Table.Cell>
                    <Table.Cell>{el.fcollname}</Table.Cell>
                    <Table.Cell>{el.town}</Table.Cell>
                    <Table.Cell>{el.fprincipalname}</Table.Cell>
                    <Table.Cell>{el.fmobile}</Table.Cell>
                    <Table.Cell>{el.faltmobile}</Table.Cell>
                    <Table.Cell>{el.femail}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  };

  renderTaggedTable = () => {
    const report = this.state.colgdet;

    return (
      <div className="mt-3">
        <hr />
        <div
          style={{
            marginBottom: "1em",
            backgroundColor: "white"
          }}
          className="stick"
        >
          <Input
            icon="search"
            fluid
            placeholder="Search..."
            onChange={this.searchTable}
            value={this.state.searchVal}
            style={{ fontSize: "1.1em" }}
          />
        </div>
        <div>
          <Table celled padded selectable structured size="small" color="olive">
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell rowSpan="2">Sl.No.</Table.HeaderCell>
                <Table.HeaderCell colSpan="3">Center</Table.HeaderCell>
                <Table.HeaderCell colSpan="3">Tagged Colleges</Table.HeaderCell>
              </Table.Row>
              <Table.Row textAlign="center">
                <Table.HeaderCell>Code</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Contact</Table.HeaderCell>
                <Table.HeaderCell>Code</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Contact</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {report.map((el, i) => {
                return (
                  <Table.Row key={i} style={{ overflow: "hidden" }}>
                    <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                    <Table.Cell>{el.cnt_code}</Table.Cell>
                    <Table.Cell>{el.center_name}</Table.Cell>
                    <Table.Cell>{el.cnt_contact}</Table.Cell>
                    <Table.Cell>{el.tagged_code}</Table.Cell>
                    <Table.Cell>{el.tagged_colg_name}</Table.Cell>
                    <Table.Cell>{el.tagged_contact}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  };
  render() {
    console.log(this.props.reportdet, this.props.reportdet, this.props.rtype);
    if (this.props.reportdet == null) return null;
    else if (
      this.props.reportdet !== null &&
      this.props.rtype == "Center List With Tagged Colleges"
    ) {
      return this.renderTaggedTable();
    } else {
      return this.renderTable();
    }
  }
}

export default ColgReportDisplay;
