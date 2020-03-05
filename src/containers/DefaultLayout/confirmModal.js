import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { closeError } from "../../actions";
import { Button, Modal } from "semantic-ui-react";

class ConfirmModal extends Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.error !== prevProps.error &&
      this.props.error.open === true
    ) {
      ReactDOM.findDOMNode(this.refs.error_ok).focus();
    }
  }

  close = () => {
    this.props.closeError();
  };

  render() {
    const { open, size, header, content } = this.props.error;
    return (
      <div>
        <Modal
          style={{ height: "26vh", top: "37vh", left: "37vw", width: "26vw" }}
          size={size}
          open={open}
          onClose={this.close}
        >
          <Modal.Header
            style={{
              color: "#fff",
              backgroundColor: "#ca4747",
              padding: "0.5em 1em"
            }}
          >
            {header}
          </Modal.Header>
          <Modal.Content style={{ minHeight: "7em" }}>
            <p>
              <b>{content}</b>
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              ref="error_ok"
              style={{ padding: "0.5em 1em" }}
              color="blue"
              size="mini"
              basic
              onClick={this.close}
              content="OK"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { error: state.moderror };
};

export default connect(
  mapStateToProps,
  {
    closeError
  }
)(ConfirmModal);

// export default ErrorModal
