import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Divider, Button, Form } from "semantic-ui-react";
import SelectSubBoard from "../../common/SelectSubBoard";
import SelectDegree from "../../common/SelectDegree";
import SelectPrSubs from "../../common/SelectPrSub";
import PrBatchTable from "./prBatchTable";
import { showError } from "../../../actions";
import {
  fetchPrBatchDet,
  fetchSubPrBoard
} from "../../../actions/practicals/practicals";
import { wHeight } from "../../parms";

class BatchDetails extends Component {
  state = {
    fdegree: "",
    fboard: "",
    frmSubmit: false,
    fcsubcode: ""
  };

  componentDidMount() {
    this.props.fetchSubPrBoard(this.props.user.fdeggrp);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.fdeggrp !== prevProps.user.fdeggrp) {
      this.props.fetchSubPrBoard(this.props.user.fdeggrp);
    }
  }

  onBoardChange = (e, data) => {
    this.setState({ fboard: data.value, fdegree: "", fcsubcode: "" });
  };

  changeDegree = (e, data) => {
    this.setState({ fdegree: data.value });
  };

  subChange = (e, data) => {
    this.setState({ fcsubcode: data.value });
  };

  handleCancel = () => {
    this.setState({ fdegree: "", fboard: "", frmSubmit: false, fcsubcode: "" });
  };

  getPrBatchdet = async () => {
    const { fdegree, fboard, fcsubcode } = this.state;
    if (this.props.user.fdeggrp == "") {
      const error = { header: "Error", content: "Degree Group required." };
      this.props.showError(error);
      return;
    }

    if (fboard == "") {
      const error = { header: "Error", content: "Board required." };
      this.props.showError(error);
      return;
    }

    if (fdegree == "") {
      const error = { header: "Error", content: "Degree required." };
      this.props.showError(error);
      return;
    }

    if (fcsubcode == "") {
      const error = { header: "Error", content: "Subject required." };
      this.props.showError(error);
      return;
    }

    await this.props.fetchPrBatchDet(
      this.props.user.fdeggrp,
      fboard,
      fdegree,
      fcsubcode
    );
    this.setState({ frmSubmit: true });
  };

  render() {
    const wheight = wHeight();
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Batch Details</h4>
              <div className="ml-auto">
                {/* <Button basic color="blue" content="Report" icon="file" /> */}
                <Button
                  basic
                  color="black"
                  icon="ban"
                  onClick={this.handleCancel}
                  content="Cancel"
                />
                <Link to="/dashboard">
                  <Button basic color="red" content="Exit" icon="home" />
                </Link>
              </div>
            </Card.Header>

            <Divider />
            <Card.Description
              style={{ overflowY: "auto", height: `${wheight}px` }}
            >
              <div className="col-md-7">
                <Form>
                  <Form.Group>
                    <Form.Field width={8}>
                      <SelectSubBoard
                        fdeggrp={this.state.fdeggrp}
                        fboard={this.state.fboard}
                        onBoardChange={this.onBoardChange}
                        board={this.props.board}
                      />
                    </Form.Field>
                    <Form.Field width={8}>
                      <SelectDegree
                        deggrp={this.state.fdeggrp}
                        fboard={this.state.fboard}
                        frmdegree={this.state.fdegree}
                        onDegreeChange={this.changeDegree}
                        modType="PRBOARD"
                      />
                    </Form.Field>
                  </Form.Group>

                  <SelectPrSubs
                    fdegree={this.state.fdegree}
                    fcsubcode={this.state.fcsubcode}
                    onSubChange={this.subChange}
                    fboard={this.state.fboard}
                  />
                  <Button color="blue" onClick={this.getPrBatchdet}>
                    Submit
                  </Button>
                </Form>
              </div>
              <div className="ui mini form" style={{ fontSize: "1.1536em" }}>
                {this.state.frmSubmit ? <PrBatchTable /> : null}
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { prsubs: state.prsubs, user: state.user, board: state.board };
};

export default connect(
  mapStateToProps,
  { showError, fetchPrBatchDet, fetchSubPrBoard }
)(BatchDetails);
