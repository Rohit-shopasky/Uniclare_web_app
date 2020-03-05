import React, { Component } from "react";
import { Form, Table, Button, Dropdown, TextArea } from "semantic-ui-react";
import { connect } from "react-redux";
import { changeRefundData, updateRefundDet } from "../../../actions";
import { showError } from "../../../actions";

class DisplyRefundList extends Component {
  state = {
    listData: ""
  };

  handleChange = (data, el, i) => {
    let newdata = {};
    newdata = { ...el, [data.name]: data.value };
    this.props.changeRefundData(newdata, i);
  };

  updateRefund = () => {
    this.props.updateRefundDet(this.props.list);
  };

  render() {
    const status_type = [
      {
        key: "Payment Refunded",
        value: "Payment Refunded",
        text: "Payment Refunded"
      },
      { key: "Approved", value: "Approved", text: "Approved" },
      { key: "Applied", value: "Applied", text: "Applied" }
    ];
    let Det = this.props.list;
    console.log("Detail", Det);
    return (
      <>
        <div style={{ overflowX: "scroll" }}>
          {/* <Form> */}
          {/* <div className="col-md-12">  style={{ overflowX: "scroll" }} */}
          {
            Det.length > 0 &&

            <Table celled compact>
              <Table.Header>
                <Table.Row textAlign="left">
                  <Table.HeaderCell colSpan="16">
                    Refund Applications
                  <Button
                      basic
                      size="small"
                      onClick={this.updateRefund}
                      color="green"
                      icon="upload"
                      content="Update"
                      className="ml-3 p-2"
                    />
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row textAlign="center">
                  <Table.HeaderCell width="1">Sl. No.</Table.HeaderCell>
                  <Table.HeaderCell width="1">Degree</Table.HeaderCell>
                  <Table.HeaderCell width="1">College Code</Table.HeaderCell>
                  <Table.HeaderCell width="1">Reg. No.</Table.HeaderCell>
                  <Table.HeaderCell width="1">App. No.</Table.HeaderCell>
                  <Table.HeaderCell width="1">Amount</Table.HeaderCell>
                  <Table.HeaderCell width="4">Status</Table.HeaderCell>
                  <Table.HeaderCell>Remarks</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>

                {Det.map((el, i) => {
                  return (
                    <Table.Row key={i}>
                      <Table.Cell
                        style={{ padding: "0px 0px" }}
                        textAlign="center"
                      >
                        {i + 1}
                      </Table.Cell>
                      <Table.Cell
                        style={{ padding: "0px 0px" }}
                        textAlign="center"
                      >
                        {el.fdegree}
                      </Table.Cell>
                      <Table.Cell style={{ padding: "0px 0px" }}>
                        {el.fcollcode}
                      </Table.Cell>
                      <Table.Cell style={{ padding: "0px 0px" }}>
                        {el.fregno}
                      </Table.Cell>
                      <Table.Cell style={{ padding: "0px 0px" }}>
                        {el.fappno}
                      </Table.Cell>
                      <Table.Cell>{el.famount}</Table.Cell>
                      <Table.Cell style={{ padding: "0px 0px" }}>
                        <Dropdown
                          fluid
                          search
                          selection
                          onChange={(e, data) => this.handleChange(data, el, i)} //{this.handleChange}
                          value={el.frefstatus}
                          name="frefstatus"
                          placeholder="Select Report Type"
                          options={status_type}
                        />
                      </Table.Cell>
                      <Table.Cell style={{ padding: "0px 0px" }}>
                        <Form.Input
                          placeholder="Remarks"
                          name="fremarks"
                          value={el.fremarks}
                          onChange={(e, data) => this.handleChange(data, el, i)}
                        // maxLength="5"
                        // label="Degree Range"
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          }
          {/* </Form> */}
          {/* </div> */}
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    list: state.refundList
  };
};
export default connect(mapStateToProps, {
  showError,
  changeRefundData,
  updateRefundDet
})(DisplyRefundList);
