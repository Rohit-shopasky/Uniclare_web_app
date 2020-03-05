import React, { Component } from "react";
import PropTypes from "prop-types";
import { Message, Button } from "semantic-ui-react";
import { Offline, Online, Detector } from "react-detect-offline";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import { unsetError } from "../../actions";
import "react-toastify/dist/ReactToastify.css";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};
toast.configure();

class DefaultFooter extends Component {
  componentDidMount() {
    window.addEventListener("online", this.online);
    window.addEventListener("offline", this.offline);
  }
  componentWillUnmount() {
    window.removeEventListener("online", this.online);
    window.removeEventListener("offline", this.offline);
  }
  online = () => {
    toast.dismiss();
    toast.success("Network Connected", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000
    });
  };
  offline = () =>
    toast.error("Network Disconnected!!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: false
    });
  render() {
    const { error_code, data, status } = this.props.error;
    const ertype = error_code === -1 ? "error" : "positive";

    return (
      <React.Fragment>
        <ToastContainer />
        {error_code !== 2 ? (
          <div>
            <Message
              style={{
                width: "72vw",
                margin: "0.3em",
                display: "flex",
                padding: "0.5em 1.5em"
              }}
              className={ertype}
            >
              <Message.Header>
                Status : {status}, Message: {data.msg}{" "}
              </Message.Header>
              <div className="ml-auto">
                <Button
                  size="mini"
                  basic
                  onClick={this.props.unsetError}
                  color="blue"
                  content="OK"
                />
              </div>
            </Message>{" "}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { unsetError }
)(DefaultFooter);
