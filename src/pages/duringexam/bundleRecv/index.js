import React, { Component } from "react";
import {
  Card,
  CardHeader,
  Button,
  CardDescription,
  Divider,
  CardContent,
  Form,
  GridColumn,
  Grid,
  Table
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { showError } from "../../../actions";
import { connect } from "react-redux";
import { BundleRec, changeDetBC } from "../../../actions/during-exam/bundrecv";
import "../../../index.css";
import ReportBundleRecv from "./bundrecvReport";

class BundleRecv extends Component {
  state = {
    barcode: "",
    detBC: [],
    displyBC: false,
    open: false,
    fdeleted: false
  };

  handleChange = (e, data) => {
    switch (data.type) {
      case "text":
        this.setState({ [data.name]: data.value });
        return;
      default:
        this.setState({ [data.name]: data.value });
        return;
    }
  };

  handleClick = () => {
    if (!this.state.barcode) {
      const error = {
        header: "Error",
        content: "Barcode length should be minimum 17"
      };
      this.props.showError(error);
    } else {
      const fcollcode = this.state.barcode.substring(0, 4);
      const fqpcode = this.state.barcode.substring(4, 9);
      const fbundno = this.state.barcode.substring(9, 14);
      const fttlscrpt = this.state.barcode.substring(14, 17);

      const item = {
        fcollcode: fcollcode,
        fqpcode: fqpcode,
        fbundno: fbundno,
        fttlscrpt: fttlscrpt,
        fdeleted: false
      };

      let i = this.state.barcode.length - 1;
      const el = item;
      var dupBC = false;

      this.state.detBC.map((item, j) => {
        if (item.fbundno === el.fbundno && i !== j) dupBC = true;
      });

      if (dupBC) {
        const error = {
          header: "Error",
          content: "Duplicate entry is not allowed."
        };
        this.props.showError(error);
        return;
      }
      this.setState({ displyBC: true, detBC: [...this.state.detBC, item] });
    }
  };

  show = dimmer => () => this.setState({ dimmer, open: true });

  handleSubmit = async () => {
    if (!this.state.detBC) {
      const error = { header: "Error", content: "Scan Barcode" };
      this.props.showError(error);
      return;
    }

    const bcarr = this.state.detBC.filter((el, i) => {
      if (el.fdeleted !== true) {
        return el;
      }
    });

    // console.log('bcarr', bcarr);
    await this.props.BundleRec(bcarr);
    this.resErr();
  };

  deleteRow = (e, el, i) => {
    let data = { ...el, [e.target.name]: e.target.checked };

    const bcarr = this.state.detBC.map((el, j) => {
      if (j === i) {
        return data;
      } else return el;
    });

    this.setState({ detBC: bcarr });
  };

  resErr = () => {
    var msg;
    var data = [];
    var head = "Success";

    if (this.props.bundleRecv.length == 0) {
      msg = ["Bundle Received"];
    } else {
      this.props.bundleRecv.map((el, i) => {
        head = "Error, Below bundle No. are not received";
        data = [...data, el];
        msg = data.join(",");
        return msg;
      });

      const error = { header: head, content: msg };
      this.props.showError(error);
    }
  };

  handleCancel = () => {
    //set all state variables to its initial state
    this.setState({
      barcode: "",
      displyBC: false,
      detBC: []
    });
  };

  close = (e, data) => {
    if (e.type == "keydown") return;
    this.setState({ open: false });
  };

  renderHeader() {
    return (
      <CardHeader style={{ display: "flex" }}>
        <h3>Bundle Receive</h3>
        <div className="ml-auto">
          <Button
            basic
            color="blue"
            icon="file"
            onClick={this.show("blurring")}
            content="Report"
          />
          <Button
            basic
            color="violet"
            icon="upload"
            onClick={this.handleSubmit}
            content="Submit"
          />
          <Button
            basic
            color="black"
            icon="ban"
            onClick={this.handleCancel}
            content="Cancel"
          />
          <Link to="/dashboard">
            <Button content="Exit" icon="home" basic color="red" />
          </Link>
        </div>
      </CardHeader>
    );
  }
  render() {
    const { barcode, displyBC, detBC, dimmer, open, fdeleted } = this.state;

    return (
      <div className="animated fadeIn">
        <Card fluid>
          <CardContent>
            {this.renderHeader()}
            <Divider />
            <CardDescription style={{ height: "72vh" }}>
              <Form>
                <Grid columns={2}>
                  <GridColumn width={5} style={{ display: "flex" }}>
                    <Form.Input
                      width="16"
                      label="Barcode"
                      placeholder="Enter barcode here..."
                      maxLength="17"
                      name="barcode"
                      vlaue={barcode}
                      onChange={this.handleChange}
                    />
                  </GridColumn>
                  <GridColumn width={6}>
                    <Button
                      style={{ marginTop: "25px" }}
                      content="GO"
                      size="mini"
                      color="facebook"
                      onClick={this.handleClick}
                    />
                  </GridColumn>
                </Grid>
              </Form>
              {displyBC ? (
                <div
                  className="ui form"
                  style={{
                    maxHeight: "60vh",
                    overflowY: "scroll",
                    marginTop: "1rem"
                  }}
                >
                  <Table
                    celled
                    style={{
                      width: "auto",
                      tableLayout: "auto",
                      marginLeft: "auto",
                      marginRight: "auto"
                    }}
                    className="stick"
                  >
                    <Table.Header>
                      <Table.Row textAlign="center">
                        <Table.HeaderCell singleLine>Sl. No.</Table.HeaderCell>
                        <Table.HeaderCell>College Code</Table.HeaderCell>
                        <Table.HeaderCell>QP Code</Table.HeaderCell>
                        <Table.HeaderCell>Bundle No.</Table.HeaderCell>
                        <Table.HeaderCell>Ttl. Script Count</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {detBC.map((el, i) => {
                        return (
                          <Table.Row key={i} textAlign="center">
                            <Table.Cell>{i + 1}</Table.Cell>
                            <Table.Cell>{el.fcollcode}</Table.Cell>
                            <Table.Cell>{el.fqpcode}</Table.Cell>
                            <Table.Cell>{el.fbundno}</Table.Cell>
                            <Table.Cell>{el.fttlscrpt}</Table.Cell>
                            <Table.Cell>
                              <input
                                className="ui checkbox"
                                type="checkbox"
                                name="fdeleted"
                                // @ts-ignore
                                value={fdeleted}
                                onChange={e => this.deleteRow(e, el, i)}
                                // @ts-ignore
                                checked={
                                  el.fdeleted == "true" ? "checked" : null
                                }
                                style={{ position: "inherit" }}
                              />
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                </div>
              ) : null}
              <ReportBundleRecv open={open} dim={dimmer} close={this.close} />
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log("state", state.bundleRecv);
  return {
    bundleRecv: state.bundleRecv
  };
};
export default connect(
  mapStateToProps,
  {
    showError,
    BundleRec,
    changeDetBC
  }
)(BundleRecv);
