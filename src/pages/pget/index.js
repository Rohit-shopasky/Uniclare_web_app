import React, { Component } from "react";
import { Card, Button, Divider, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { wHeight } from "../parms";
import { getSavedData, saveApplication } from "../../actions/utils/pget";
import { showError } from "../../actions";
import { connect } from "react-redux";
import PGETEditApp from "./getpgetApp";

class PGETApp extends Component {
  state = { fappno: "", editApp: false };

  handleCancel = () => {
    this.setState({
      fappno: ""
    });
  };

  handleUpdate = async () => {
    console.log(this.props.pgetEditApp);
    await this.props.saveApplication(this.props.pgetEditApp);
    this.setState({ editApp: false });
  };
  handleChange = e => {
    this.setState({ fappno: e.target.value });
  };
  handleSubmit = () => {
    this.props.getSavedData(this.state.fappno);
    this.setState({ editApp: true });
  };
  render() {
    const wheight = wHeight();
    const { fappno } = this.state;
    return (
      <div>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>PGET Edit Application</h4>
              <div className="ml-auto">
                <Button
                  basic
                  color="blue"
                  content="Update"
                  icon="cloud upload"
                  onClick={this.handleUpdate}
                />
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
              <Form>
                <Form.Field width={8}>
                  <Form.Input
                    id="fappno"
                    label="Enter Application No."
                    placeholder="Application No."
                    value={fappno}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Button
                  content="Submit"
                  size="mini"
                  color="facebook"
                  onClick={this.handleSubmit}
                />
              </Form>
              {this.state.editApp ? <PGETEditApp /> : null}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    univcode: state.univ.funivcode,
    pgetEditApp: state.pgetEditApp
  };
};

export default connect(
  mapStateToProps,
  {
    showError,
    getSavedData,
    saveApplication
  }
)(PGETApp);
