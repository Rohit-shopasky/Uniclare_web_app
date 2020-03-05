import React, { Component } from "react";
import {
  Form,
  Card,
  Header,
  Button,
  Dropdown,
  Divider
} from "semantic-ui-react";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState
} from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import {
  editPostnotification,
  changeNotificationFile,
  changeNotification,
  updateNotification,
  addNotification,
  newNotification
} from "../../../actions/utils/hostNotification";
import { connect } from "react-redux";
import { showError } from "../../../actions";
import { wHeight } from "../../parms";
import { getUserType } from "../../../actions/utils/createUser";
import { API } from "../../../apis/consts";
var postNo = "";

class EditNotification extends Component {
  state = {
    ffromdate: "",
    ftodate: "",
    ffilepath: "",
    ffilename: "",
    editorState: EditorState.createEmpty(),
    sameFile: "F"
  };

  componentDidMount = async () => {
    await this.props.getUserType();
    if (postNo != " ") {
      //call only when exsisting notification has to be edited
      await this.props.editPostnotification(postNo)
      const edtNotf = this.props.eNotif;
      const blocksFromHtml = edtNotf.fdescpn != undefined && htmlToDraft(edtNotf.fdescpn);
      if (blocksFromHtml != undefined) {
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState =
          contentBlocks != undefined &&
          ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({ editorState: editorState });
      }
    } else
      await this.props.newNotification(); //add New notification    
  };
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  handleSubmit = async () => {

    const { ffromdate, ftodate, ffilepath, ffilename, editorState, sameFile } = this.state;

    const body = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    const raw = convertToRaw(editorState.getCurrentContent())
    const edtNotf = this.props.eNotif;
    var fromDate = this.state.ffromdate.split("/")
    let enteredFrmDate = new Date(fromDate[2], fromDate[1] - 1, fromDate[0])
    var toDate = this.state.ffromdate.split("/")
    let enteredToDate = new Date(toDate[2], toDate[1] - 1, toDate[0])

    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (enteredFrmDate < currentDate || enteredToDate < currentDate) {
      let error = {
        header: "Error",
        content: "Cannot Enter past date."
      }
      this.props.showError(error)
      return
    }
    if (edtNotf.ffromdate == "" || edtNotf.ftodate == "" || edtNotf.flabel == "" || edtNotf.fcolour == "" || edtNotf.forder == "" || edtNotf.fdeggrp == "" || edtNotf.fusertype == "") {
      let error = {
        header: "Error",
        content: "Fill all the fields before posting notification"
      }
      this.props.showError(error)
      return
    }
    if (edtNotf.ffilepath.length == 0 && postNo == " ") {//for new notification
      let error = {
        header: "Error",
        content: "Upload respective file before posting notificationss"
      }
      this.props.showError(error)
      return
    }
    if (postNo != "" && ((sameFile == "F" || sameFile == "No") && edtNotf.ffilepath.length == 0)) {
      let error = {
        header: "Error",
        content: "Upload respective file before posting notification"
      }
      this.props.showError(error)
      return
    }
    if (raw.blocks[0]['text'] == "") {
      let error = {
        header: "Error",
        content: "Please fill the description before updating."
      }
      this.props.showError(error)
      return
    }

    postNo != " "
      ? await this.props.updateNotification(this.state.sameFile, body)
      : await this.props.addNotification(this.state.sameFile, body);
    this.props.history.push("/utils/hostNotification")
    // }

  };

  handleChangeFromdate = async e => {
    this.setState({ ffromdate: e.target.value }, () =>
      this.props.changeNotification("ffromdate", this.state.ffromdate)
    );
  };

  handleChangeTodate = async e => {
    this.setState({ ftodate: e.target.value }, () =>
      this.props.changeNotification("ftodate", this.state.ftodate)
    );
  };

  handleMultiple = (e, { name, value }) => {
    // console.log("qwertyuqwerty", name, value)
    var str = "";
    value.map((el, i) =>
      i < value.length && el != "" ? (str = `${el}*${str}`) : null
    );
    this.props.changeNotification(name, str);
  };

  handleChange = async (e, { name, value }) => {
    this.props.changeNotification(name, value);
  };

  handleChangeFile = async (e, { name, value }) => {
    let extension = e.target.files[0]['name'].split('.').pop();
    extension = extension.toLowerCase();

    if (extension == 'jpeg' || extension == 'jpg' || extension == 'pdf' || extension == "png") {
      this.setState({ ffilepath: e.target.files[0], ffilename: e.target.value });
      this.props.changeNotificationFile(e.target.files[0]);
    } else {
      const error = {
        header: "Error",
        content: "Only pdf, jpg,jpeg,png files are accepted"
      }
      this.props.showError(error)
      this.setState({ ffilename: "" });
      return;
    }
  };

  handleChangeChk = (e, { name, checked }) => {
    const value = checked ? "Yes" : "No";
    this.setState({ sameFile: value });
  };

  render() {
    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };

    const wheight = wHeight();
    postNo = this.props.match.params.postno;
    var edtNotf = this.props.eNotif;

    const colourOpt = [
      { key: "None", value: "None", text: "None" },
      { key: "Yellow", value: "Yellow", text: "Yellow" },
      { key: "Red", value: "Red", text: "Red" },
      { key: "Green", value: "Green", text: "Green" },
      { key: "Blue", value: "Blue", text: "Blue" }
    ];

    if (edtNotf.fusertype != null || edtNotf.fdeggrp != null) {
      var str = edtNotf.fusertype;
      var deggrp = edtNotf.fdeggrp;
      var addiusertype = str.split("*");
      var addideggrp = deggrp.split("*");
    }

    let DegGrpOpt = this.props.deggrpList.map((el, i) => {
      return {
        key: i,
        value: el.fdeggrp,
        text: `${el.fdeggrp} - ${el.fdescpn}`
      };
    });

    let UserTypeOpt = this.props.userTypeList.map((el, i) => {
      return {
        key: i,
        value: el.FUSERTYPE,
        text: `${el.FUSERTYPE} - ${el.FTYPEDESC}`
      };
    });
    var filepath = `${API}/upload/${edtNotf.ffilepath}`;
    const { editorState } = this.state;

    return (
      <>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <Header as="h3">Edit Notification</Header>
              <div className="ml-auto">
                <Link
                  to={{
                    pathname: "/utils/hostNotification"
                  }}
                >
                  <Button basic color="blue" content="Back" icon="upload" />
                </Link>
                <Button
                  basic
                  color="green"
                  icon="save"
                  onClick={this.handleSubmit}
                  content="Save"
                />
                <Link to="/dashboard">
                  <Button basic color="red" content="Exit" icon="home" />
                </Link>
              </div>
            </Card.Header>
            <Divider />
            <Card.Description
              style={{
                overflowY: "auto",
                height: `${wheight}px`,
                width: "100%"
              }}
            >
              <Form>
                <Form.Field width={8}>
                  <label>Degree Group</label>
                  <Dropdown
                    placeholder="Degree Group"
                    search
                    selection
                    multiple
                    id="fdeggrp"
                    name="fdeggrp"
                    value={addideggrp}
                    onChange={this.handleMultiple}
                    options={DegGrpOpt}
                  />
                </Form.Field>
                <Form.Field width={8}>
                  <label>User Type</label>
                  <Dropdown
                    placeholder="User Type"
                    search
                    selection
                    multiple
                    id="fusertype"
                    name="fusertype"
                    value={addiusertype}
                    onChange={this.handleMultiple}
                    options={UserTypeOpt}
                  />
                </Form.Field>
                <Form.Group>
                  <Form.Field width={8}>
                    <Form.Input
                      type="text"
                      placeholder="Label"
                      label="Label"
                      name="flabel"
                      value={edtNotf.flabel}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={4}>
                    <label>From Date</label>
                    <InputMask
                      type="text"
                      placeholder="From Date"
                      name="ffromdate"
                      mask="ed/nm/zyyy"
                      formatChars={formatChars}
                      value={edtNotf.ffromdate}
                      onChange={this.handleChangeFromdate}
                    />
                  </Form.Field>
                  <Form.Field width={4}>
                    <label>To Date</label>
                    <InputMask
                      type="text"
                      placeholder="To Date"
                      name="ftodate"
                      mask="ed/nm/zyyy"
                      formatChars={formatChars}
                      value={edtNotf.ftodate}
                      onChange={this.handleChangeTodate}
                    />
                  </Form.Field>
                </Form.Group>

                <Form.Group>
                  <Form.Field width={4}>
                    <Form.Input
                      id="forder"
                      name="forder"
                      value={edtNotf.forder}
                      onChange={this.handleChange}
                      label="Order"
                      placeholder="Order No."
                    />
                  </Form.Field>
                  <Form.Field width={4}>
                    <label>Colour</label>
                    <Dropdown
                      placeholder="Select colour"
                      search
                      selection
                      id="fcolour"
                      name="fcolour"
                      value={edtNotf.fcolour}
                      options={colourOpt}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={4}>
                    <Form.Input
                      type="file"
                      placeholder="File"
                      label="File"
                      name="ffilepath"
                      onChange={this.handleChangeFile}
                      value={this.state.ffilename}
                    />
                  </Form.Field>
                  <Form.Field width={4}>
                    {edtNotf.ffilepath == "" && postNo != " " && (
                      <>
                        <a href={filepath} target="blank">
                          Previously Uploaded File
                        </a>

                        <Form.Checkbox
                          label="Use Same"
                          value="Yes"
                          name="fsamefile"
                          onChange={this.handleChangeChk}
                        />
                      </>
                    )}
                  </Form.Field>
                </Form.Group>
              </Form>
              <label>
                <b>Description</b>
              </label>
              <div
                style={{
                  border: "1px solid grey",
                  minHeight: "30vh",
                  marginTop: "20px"
                }}
              >
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  toolbar={{
                    options: [
                      "inline",
                      "blockType",
                      "fontSize",
                      "fontFamily",
                      "colorPicker",
                      "list",
                      "textAlign",
                      "remove",
                      "history"
                    ]
                  }}
                  onEditorStateChange={this.onEditorStateChange}
                />
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    eNotif: state.editNotification,
    userTypeList: state.userTypeList,
    deggrpList: state.deggrp
  };
};
export default connect(
  mapStateToProps,
  {
    getUserType,
    editPostnotification,
    changeNotification,
    showError,
    changeNotificationFile,
    updateNotification,
    addNotification,
    newNotification
  }
)(EditNotification);
