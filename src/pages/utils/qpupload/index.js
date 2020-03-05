import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Divider,
  Segment,
  Button,
  Icon,
  Header,
  Form,
  Statistic,
  Dropdown
} from "semantic-ui-react";
import { connect } from "react-redux";
import {
  qpFileUpload,
  qpStatUpload,
  mastabuUpload
} from "../../../actions/utils/uploads";
import { showError } from "../../../actions";
//
import { wHeight, formatBytes } from "../../parms";

class QPUpload extends Component {
  state = {
    file: null,
    size: null,
    filenm: null,
    fileinfo: false,
    table: [
      { key: "masqp", value: "masqp", text: "QPSTAT" },
      { key: "mastabu", value: "mastabu", text: "MASTABU" }
    ],
    ftable: ""
  };

  fileInputRef = React.createRef();

  handleCancel = () => {
    this.setState({
      file: null,
      size: null,
      filenm: null,
      fileinfo: false,
      table: [
        { key: "masqp", value: "masqp", text: "QPSTAT" },
        { key: "mastabu", value: "mastabu", text: "MASTABU" }
      ],
      ftable: ""
    });
    this.fileInputRef.current.value = "";
    // console.log(this.fileInputRef);
  };

  fileChange = e => {
    if (e.target.files[0] === undefined) return;

    var file_size = e.target.files[0].size;
    var file_extn = e.target.files[0].name.split(".").pop();
    file_extn = file_extn.toLowerCase();

    if (file_extn !== "xlsx") {
      const error = { header: "Error", content: "XLSX files are allowed!" };
      this.props.showError(error);
      return;
    }

    if (file_size >= 2000000) {
      const error = {
        header: "Error",
        content: "Upload files with size less then 2MB!"
      };
      this.props.showError(error);
      return;
    }
    this.props.qpFileUpload(e.target.files[0]);
    this.setState({
      file: e.target.files[0],
      size: formatBytes(e.target.files[0].size),
      filenm: e.target.files[0].name
    });
  };

  handleChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  upload = async () => {
    if (this.state.ftable === "") {
      const error = { header: "Error", content: "Select table to upload" };
      this.props.showError(error);
      return;
    }
    if (this.state.file === null) {
      const error = { header: "Error", content: "Add File to upload" };
      this.props.showError(error);
      return;
    }
    if (this.state.ftable === "masqp") {
      await this.props.qpStatUpload();
    } else if (this.state.ftable === "mastabu") {
      await this.props.mastabuUpload();
    }
    this.handleCancel();
  };

  render() {
    const wheight = wHeight();
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Upload Valuation Statistics</h4>
              <div className="ml-auto">
                <Button
                  basic
                  color="blue"
                  content="Upload"
                  icon="cloud upload"
                  onClick={this.upload}
                />
                <Button
                  basic
                  color="black"
                  content="Cancel"
                  icon="ban"
                  onClick={this.handleCancel}
                />
                <Link to="/dashboard">
                  <Button basic color="red" content="Exit" icon="home" />
                </Link>
              </div>
            </Card.Header>
            <Divider />
            <Card.Description
              style={{ height: `${wheight}px`, overflowY: "auto" }}
            >
              <Form>
                <Form.Field width="8">
                  <label>Table</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    name="ftable"
                    value={this.state.ftable}
                    onChange={this.handleChange}
                    placeholder="Select Table"
                    options={this.state.table}
                  />
                </Form.Field>
              </Form>
              <Segment
                placeholder
                style={{ height: `${wheight * 0.8}px`, overflowY: "auto" }}
              >
                <Header icon>
                  <Icon name="file excel outline" />
                  Upload the Excel file here.
                  <br />
                  Note: File should be in xlsx format and less than 2 MB
                </Header>
                <Form onSubmit={this.onFormSubmit}>
                  <input
                    ref={this.fileInputRef}
                    type="file"
                    hidden
                    onChange={this.fileChange}
                  />
                  <Button
                    primary
                    onClick={() => this.fileInputRef.current.click()}
                  >
                    Add Document
                  </Button>
                </Form>
                <Statistic label={this.state.filenm} value={this.state.size} />
              </Segment>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    feeheads: state.feeheads
  };
};

export default connect(
  mapStateToProps,
  {
    showError,
    qpFileUpload,
    qpStatUpload,
    mastabuUpload
  }
)(QPUpload);
