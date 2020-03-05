import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Divider, Button, Form } from "semantic-ui-react";
import { showError } from "../../../actions";
import {
  fetchQpBoard,
  fetchQpStatistics
} from "../../../actions/after-exam/valuation";
import { wHeight } from "../../parms";
import SelectSubBoard from "../../common/SelectSubBoard";
import StatTable from "./StatTable";

class Statistics extends Component {
  state = { fboard: "", frmsubmit: false };

  componentDidMount() {
    this.props.fetchQpBoard(this.props.user.fdeggrp);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.fdeggrp !== prevProps.user.fdeggrp) {
      this.props.fetchQpBoard(this.props.user.fdeggrp);
    }
  }

  onBoardChange = (e, data) => {
    this.setState({ fboard: data.value });
  };

  handleSubmit = async () => {
    this.setState({ frmsubmit: false });
    await this.props.fetchQpStatistics(this.state.fboard);
    this.setState({ frmsubmit: true });
  };

  render() {
    const wheight = wHeight();
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Valuation Statistics</h4>
              <div className="ml-auto">
                {/* <Button
                  basic
                  color="blue"
                  content="Upload"
                  icon="cloud upload"
                  onClick={this.upload}
                /> */}
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
                <Form.Field width={8}>
                  <SelectSubBoard
                    fboard={this.state.fboard}
                    onBoardChange={this.onBoardChange}
                    board={this.props.board}
                  />
                </Form.Field>
                <Button
                  color="blue"
                  onClick={this.handleSubmit}
                  content="Submit"
                />
              </Form>
              {this.state.frmsubmit ? <StatTable /> : null}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  board: state.board
});

export default connect(
  mapStateToProps,
  { showError, fetchQpBoard, fetchQpStatistics }
)(Statistics);
