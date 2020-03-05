import React, { Component } from "react";
import {
  Button,
  Modal,
  Form,
  Message,
  Dropdown,
  Grid
} from "semantic-ui-react";
import InputMask from "react-input-mask";
import { ReportAPI } from "../../../apis/consts";
import { connect } from "react-redux";

class ReportBundleRecv extends Component {
  state = {
    fdate: "",
    rtype: "",
    frtypes: ["Received Bundle Report", "Not Received Bundle Report"]
  };

  handleDate = e => {
    this.setState({ [e.target.name]: e.target.value });
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

  generateReport = () => {
    const { fdate, rtype, frtypes } = this.state;
    console.log("rept", fdate, rtype, this.props.univcode);

    if (rtype === "Received Bundle Report")
      window.open(
        ReportAPI +
          "generateBundRecvRprt&univcode=" +
          this.props.univcode +
          "&fdate=" +
          fdate,
        "_blank"
      );
    else if (rtype === "Not Received Bundle Report")
      window.open(
        ReportAPI +
          "generateBundNotRecvRprt&univcode=" +
          this.props.univcode +
          "&fdate=" +
          fdate,
        "_blank"
      );
  };

  render() {
    const { fdate, rtype, frtypes } = this.state;

    const reprt_options = frtypes.map((el, i) => {
      return { key: i, value: el, text: el };
    });

    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };
    return (
      <div>
        <Modal
          style={{ height: "50vh", top: "25vh", left: "25vw", width: "50vw" }}
          dimmer={this.props.dim}
          open={this.props.open}
          onClose={this.props.close}
          closeOnDimmerClick={false}
        >
          <Modal.Header style={{ display: "flex" }}>
            Bundle Receive Report
            <div className="ml-auto">
              <Button
                basic
                color="blue"
                content="Generate"
                onClick={this.generateReport}
                icon="file pdf outline"
              />
              <Button
                basic
                color="black"
                icon="ban"
                onClick={this.props.close}
                content="Cancel"
              />
            </div>
          </Modal.Header>

          <Modal.Content style={{ height: "50vh", overflowY: "auto" }}>
            <Form error>
              {/* {ferror ? <Message
                error
                content={ferrorm}
              /> : null} */}
              <Form.Field width={6}>
                <label>Date</label>
                <InputMask
                  formatChars={formatChars}
                  type="text"
                  value={fdate}
                  mask="ed/nm/zyyy"
                  name="fdate"
                  onChange={this.handleDate}
                />
              </Form.Field>
              <Form.Field width={6}>
                <label>Report Type</label>
                <Dropdown
                  placeholder="Report"
                  search
                  selection
                  name="rtype"
                  value={rtype}
                  options={reprt_options}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    univcode: state.univ.funivcode
  };
};

export default connect(
  mapStateToProps,
  {}
)(ReportBundleRecv);
