import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Divider, Input } from "semantic-ui-react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { submitquery } from "../../../actions/utils/grv";
import { showError } from "../../../actions";
class NewQuery extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    subject: ""
  };

  handleCancel = () => {
    this.setState({
      editorState: EditorState.createEmpty(),
      subject: ""
    });
  };

  handleChange = (e, data) => {
    this.setState({
      subject: data.value
    });
  };

  handleSend = async () => {
    const body = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    const subject = this.state.subject;
    const query = { subject, body };
    console.log(query);

    if (subject == "") {
      const error = {
        header: "Error",
        content: "Enter the subject"
      };
      this.props.showError(error);
      return;
    }

    const res = await this.props.submitquery(query);
    if (res == 0) this.handleCancel();
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState, subject } = this.state;
    return (
      <div>
        <div className="ml-auto">
          <Button
            onClick={this.handleSend}
            basic
            color="blue"
            icon="send"
            content="Send"
          />
          <Button
            basic
            color="black"
            icon="ban"
            content="Cancel"
            onClick={this.handleCancel}
          />
        </div>
        <Divider />
        <Input
          fluid
          label="Subject"
          placeholder="Subject..."
          onChange={this.handleChange}
          value={subject}
        />
        <div
          style={{
            border: "1px solid grey",
            minHeight: "40vh",
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
        {/* <div dangerouslySetInnerHTML={{ __html: thisIsMyCopy }} /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { submitquery, showError };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewQuery);
