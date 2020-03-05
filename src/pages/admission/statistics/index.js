import React, { Component } from "react";
import {
  Card,
  Button,
  Divider,
  Table,
  Dropdown,
  Form
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getAdmStats } from "../../../actions/admissions/admStats";
import { showError } from "../../../actions";
import { connect } from "react-redux";
import DegwiseAdmStats from "./DegwiseAdmStats";
import CollwiseAdmStats from "./CollwiseAdmstats";
import { wHeight } from "../../parms";
class AdmStats extends Component {
  state = { rtype: "", shwTbl: false };

  handleChange = (e, data) => {
    switch (data.type) {
      case "text":
        this.setState({ [data.name]: data.value });
      default:
        this.setState({ [data.name]: data.value });
    }
    this.setState({ shwTbl: false });
  };

  handleSubmit = async () => {
    var { rtype } = this.state;
    await this.props.getAdmStats(rtype);
    this.setState({ shwTbl: true });
  };

  render() {
    var rtypeOpt = [
      { key: "c", value: "collwise", text: "College Wise" },
      { key: "d", value: "degwise", text: "Degree Wise" }
    ];
    const wheight = wHeight();
    return (
      <>
        <Card fluid className="animated fadeIn">
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Admission Statistics</h4>
              <div className="ml-auto">
                {/* <Button
                  basic
                  color="green"
                  content="Detailed View"
                  onClick={this.handleView}
                  icon="eye"
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
                <Form.Field width={6}>
                  <label>Select</label>
                  <Dropdown
                    placeholder="Select here"
                    search
                    selection
                    id="rtype"
                    name="rtype"
                    options={rtypeOpt}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form>
              <Button
                basic
                size="small"
                color="green"
                content="Submit"
                onClick={this.handleSubmit}
                className="mt-2 mb-3"
              />
              {this.state.rtype == "collwise" && this.state.shwTbl && (
                <CollwiseAdmStats />
              )}
              {this.state.rtype == "degwise" && this.state.shwTbl && (
                <DegwiseAdmStats />
              )}
            </Card.Description>
          </Card.Content>
        </Card>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    collAdmStats: state.admCollStats
  };
};
export default connect(
  mapStateToProps,
  {
    getAdmStats,
    showError
  }
)(AdmStats);
