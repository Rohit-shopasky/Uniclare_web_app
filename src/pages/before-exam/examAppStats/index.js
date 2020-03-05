import React, { Component } from "react";
import {
  getExamAppStats,
  getDetExamAppStats
} from "../../../actions/before-exam/exmAppStats";
import { showError } from "../../../actions";
import { wHeight } from "../../parms";
import { Card, Divider, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ExmAppStatsG1 from "./graph1";
import ExmAppStatsG2 from "./graph2";

class ExmAppStats extends Component {
  state = {
    shwTbl: false
  };

  async componentDidMount() {
    await this.props.getExamAppStats();
    this.setState({ shwTbl: true });
  }

  handleView = async () => {
    await this.props.getDetExamAppStats();

    let path = "/pages/before-exam/examAppStats/DetExmStats";
    this.props.history.push(path);
  };
  render() {
    let { shwTbl } = this.state;

    return (
      <div>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Exam Application Statistics</h4>
              <div className="ml-auto">
                <Button
                  basic
                  color="green"
                  content="Detailed View"
                  onClick={this.handleView}
                  icon="eye"
                />
                <Link to="/dashboard">
                  <Button basic color="red" content="Exit" icon="home" />
                </Link>
              </div>
            </Card.Header>

            <Divider />
            {shwTbl && (
              <div>
                <ExmAppStatsG1 />
                <ExmAppStatsG2 />
              </div>
            )}
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    AppStats: state.ExamAppStats
  };
};
export default connect(
  mapStateToProps,
  {
    showError,
    getExamAppStats,
    getDetExamAppStats
  }
)(ExmAppStats);
