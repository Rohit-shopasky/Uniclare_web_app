import React, { Component } from "react";
import { Card, Button, Form, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDegGrp, showError } from "../../../actions";
import {
  getDateMaster,
  insertUpdateDateMaster,
  deleteDateMaster
} from "../../../actions/masters/dateMaster";
import SelectDeggrp from "../../common/SelectDeggrp";
import DateMasterDisplay from "./ttdisplay";

class DateMaster extends Component {
  state = {
    deggrp: [],
    fdeggrp: "",
    fyear: "",
    fexamtype: "",
    fexamdate: "",
    frmSubmit: true,
    open: true
  };

  componentDidMount() {
    // this.props.fetchDegGrp();
    this.props.getDateMaster();
  }

  componentDidUpdate(prevProps) {
    if (this.props.deggrp !== prevProps.deggrp) {
      this.setState({ deggrp: [...this.props.deggrp] });
    }
  }

  cancel = () => {
    this.setState({
      fdeggrp: "",
      fyear: "",
      fexamtype: "",
      fexamdate: "",
      frmSubmit: false
    });
    this.props.deleteDateMaster();
  };

  changeDeggrp = (e, data) => {
    let deggrpsel = this.state.deggrp.filter(
      (el, i) => el.fdeggrp === data.value
    );
    let deggrp = deggrpsel[0];

    this.setState({
      fyear: deggrp.fyear,
      fexamtype: deggrp.fexamtype,
      fexamdate: deggrp.fexamdate,
      fdeggrp: deggrp.fdeggrp
    });
  };

  addRow = (e, data) => {
    this.datetable.addRowbtn(e, data);
  };

  handleSave = async () => {
    const datemaster = this.props.dateMaster.filter((el, i) => {
      if (el.fdatecode !== "" && el.fdate !== "") {
        return el;
      }
    });
    await this.props.insertUpdateDateMaster(datemaster, this.state.fdeggrp);
    // this.cancel();
  };

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h3>Date Master</h3>
        <div className="ml-auto">
          <Button
            disabled={!this.state.frmSubmit}
            basic
            color="blue"
            content="Add"
            onClick={this.addRow}
            icon="plus"
          />
          <Button
            disabled={!this.state.frmSubmit}
            basic
            color="green"
            content="Save"
            onClick={this.handleSave}
            icon="save"
          />
          <Button
            basic
            onClick={this.cancel}
            color="black"
            icon="ban"
            content="Cancel"
          />
          <Link to="/dashboard">
            <Button basic color="red" content="Exit" icon="home" />
          </Link>
        </div>
      </Card.Header>
    );
  };

  render() {
    const {
      fdeggrp,
      frmSubmit,
      fyear,
      fexamtype,
      fexamdate,
      open
    } = this.state;
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            {this.renderHeader()}
            <Divider />
            <Card.Description style={{ height: "72vh", overflowY: "auto" }}>
              <div className="col-md-6">
                <DateMasterDisplay onRef={ref => (this.datetable = ref)} />
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deggrp: state.deggrp,
    dateMaster: state.dateMaster
  };
};
export default connect(
  mapStateToProps,
  {
    fetchDegGrp,
    getDateMaster,
    insertUpdateDateMaster,
    deleteDateMaster,
    showError
  }
)(DateMaster);
