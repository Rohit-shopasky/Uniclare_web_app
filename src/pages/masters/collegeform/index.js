import React, { Component } from "react";
import {
  Card,
  Divider,
  Button,
  Form,
  Dropdown,
  Radio
} from "semantic-ui-react";
import { connect } from "react-redux";

import { showError } from "../../../actions";
import {
  getCollegeList,
  GetSpecificCollege,
  Collegeform,
  SaveCollegeForm,
  CancelForm
} from "../../../actions/masters/collegeform";
import { Link } from "react-router-dom";
import { wHeight } from "../../parms";
var deg_options = [];
class CollegeForm extends Component {
  componentDidMount() {
    this.props.getCollegeList();
  }

  state = {
    checkbox: "",
    checkbox1: "",
    getallclg: true,
    colcode: "",
    flag: false,
    shodrop1: false,
    shodrop: false,
    error: false,
    errorMessage: "",
    frmsubmit: false,
    fdeggrp: ""
  };

  setDeggrp = data => {
    this.setState({ fdeggrp: data });
  };

  handleSave = async () => {
    await this.props.SaveCollegeForm(this.props.Collegeformdata);
    this.handleCancel();
  };

  handleCancel = () => {
    this.setState({ flag: false, colcode: "" });
    this.props.CancelForm();
  };

  handleChangeSelectClg = async (e, { name, value }) => {
    await this.props.Collegeform("FCOLLCODE", value);

    this.setState({ colcode: value });

    this.props.collegeList.map(async item => {
      return (await (value === item.fcollcode)) ? (
        <> {await this.props.GetSpecificCollege(value)}</>
      ) : null;
    });
    await this.setState({ flag: true });
  };

  handleChange = async (e, { name, value }) => {
    this.props.Collegeformdata.FCOLLNAME != "" &&
      this.props.Collegeformdata.FTOWN != "" &&
      this.props.Collegeformdata.FCOLLCODE != "" &&
      this.setState({ flag: true });

    if (name !== "ffaculty") {
      await this.props.Collegeform(name, value, typeof value);
    }
    if (name == "ffaculty") {
      if (typeof value == "object" && name == "ffaculty") {
        var stringdata = this.props.SpecificCollegeDetails.ffaculty
          ? this.props.SpecificCollegeDetails.ffaculty
          : "";

        if (true) {
          var str = "";
          value.map((item, i) => {
            return i < value.length && item != ""
              ? (str = `${item}*${str}`)
              : null;
          });
          await this.props.Collegeform(name, str);
        }
      }
    }

    {
      value == "NA" && (await this.setState({ checkbox: "NA" }));
    }

    {
      value == "A" && (await this.setState({ checkbox: "A" }));
    }
    {
      value == "AUTO" && (await this.setState({ checkbox1: "AUTO" }));
    }
    {
      value == "AFF" && (await this.setState({ checkbox1: "AFF" }));
    }
  };

  add = async () => {
    await this.setState({ getallclg: false });
  };

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <h4>College Form</h4>
        <div className="ml-auto">
          <Button
            disabled={!this.state.flag}
            basic
            color="green"
            content="Save"
            onClick={this.handleSave}
            icon="save"
          />
          <Button
            basic
            onClick={this.handleCancel}
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
    const deggrp = this.props.deggrp;

    deg_options = deggrp.map((el, i) => {
      return {
        key: i,
        value: el.fdeggrp,
        text: el.fdeggrp
      };
    });

    const currentFormdata = this.props.Collegeformdata;

    const currentFADMSTATUS = currentFormdata.FADMSTATUS;

    const collegeOptionsList = this.props.collegeList.map(item => {
      return {
        value: item.fcollcode,
        text: `${item.fcollcode} ${item.fcollname}`
      };
    });

    if (currentFormdata.ffaculty != null) {
      var str = currentFormdata.ffaculty;
      var array = str.split("*");
    }
    array = array == undefined ? [] : array;
    const wheight = wHeight();

    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            {this.renderHeader()}
            <Divider />
            <Card.Description
              style={{ height: `${wheight}px`, overflowY: "auto" }}
            >
              <div className="col-md-8">
                <Form>
                  <Form.Group>
                    <Form.Field width={16}>
                      <label>College List</label>
                      <Dropdown
                        size="mini"
                        fluid
                        openOnFocus={false}
                        selectOnBlur={false}
                        searchInput={{ autoFocus: true }}
                        placeholder="Select college "
                        name="collegeOptionsList"
                        allowAdditions
                        onAddItem={this.add}
                        // @ts-ignore
                        openOnFocus={false}
                        selectOnBlur={false}
                        value={this.state.colcode}
                        selection
                        search
                        options={collegeOptionsList}
                        onChange={this.handleChangeSelectClg}
                      />
                    </Form.Field>
                  </Form.Group>

                  {(this.state.flag || this.state.shodrop1) && (
                    <>
                      <Form.Group width={16}>
                        <Form.Input
                          width={3}
                          placeholder="College Code"
                          value={
                            currentFormdata.FCOLLCODE
                              ? currentFormdata.FCOLLCODE
                              : this.state.colcode
                          }
                          label="College Code"
                          name="FCOLLCODE"
                          readOnly={
                            this.props.Collegeformdata.FCOLLCODE != "" ||
                            this.state.colcode != ""
                          }
                          onChange={this.handleChange}
                        />

                        <Form.Input
                          width={10}
                          id="FCOLLNAME"
                          name="FCOLLNAME"
                          label="College Name"
                          value={currentFormdata.FCOLLNAME}
                          placeholder="College Name"
                          onChange={this.handleChange}
                        />

                        <Form.Input
                          placeholder="Consituency"
                          // value={fyear}
                          width={4}
                          label="Consituency"
                          name="FTOWN"
                          value={currentFormdata.FTOWN}
                          onChange={this.handleChange}
                        />
                      </Form.Group>

                      <Form.Group width={16}>
                        <Form.Input
                          placeholder="Address Line1"
                          // value={fyear}
                          width={8}
                          label="Address Line1"
                          name="FCOLLADD1"
                          value={currentFormdata.FCOLLADD1}
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          placeholder="Land Line number"
                          // value={fexamtype}
                          value={currentFormdata.FPHONE}
                          width={8}
                          label="Land Line number"
                          name="FPHONE"
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Group width={16}>
                        <Form.Input
                          placeholder="Enter Address Line2"
                          // value={fyear}
                          width={8}
                          label="Address Line2"
                          name="FCOLLADD2"
                          value={currentFormdata.FCOLLADD2}
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          placeholder="Mobile Number"
                          // value={fexamtype}
                          value={currentFormdata.fmobile}
                          width={8}
                          label="Mobile"
                          name="fmobile"
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Group width={16}>
                        <Form.Input
                          placeholder="Address Line3"
                          // value={fyear}
                          width={8}
                          label="Address Line3"
                          name="FCOLLADD3"
                          value={currentFormdata.FCOLLADD3}
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          placeholder="Alternate Mobile"
                          // value={fexamtype}
                          value={currentFormdata.faltmobile}
                          width={8}
                          label="Alternate Mobile"
                          name="faltmobile"
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Group width={16}>
                        <Form.Input
                          placeholder="Address Line4"
                          // value={fyear}
                          width={8}
                          label="Address Line4"
                          name="FCOLLADD4"
                          value={currentFormdata.FCOLLADD4}
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          placeholder="Email"
                          // value={fexamtype}
                          value={currentFormdata.FEMAILC}
                          width={8}
                          label="Email"
                          name="FEMAILC"
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Field width={8} inline>
                          <label>Admission Status </label>
                          <Form.Field
                            width={8}
                            control={Radio}
                            name="FADMSTATUS"
                            label="A"
                            value="A"
                            checked={
                              (this.state.checkbox != ""
                                ? this.state.checkbox
                                : currentFADMSTATUS) == "A"
                            }
                            onChange={this.handleChange}
                          />

                          <Form.Field
                            width={8}
                            control={Radio}
                            name="FADMSTATUS"
                            label="NA"
                            value="NA"
                            checked={
                              (this.state.checkbox != ""
                                ? this.state.checkbox
                                : currentFADMSTATUS) == "NA"
                            }
                            onChange={this.handleChange}
                          />
                        </Form.Field>

                        <Form.Field width={8} inline>
                          <label>College Type </label>
                          <Form.Field
                            width={8}
                            control={Radio}
                            name="FCOLLTYPE"
                            label="AFFILIATED"
                            value="AFF"
                            checked={
                              (this.state.checkbox1 != ""
                                ? this.state.checkbox1
                                : currentFormdata.FCOLLTYPE) == "AFF"
                            }
                            onChange={this.handleChange}
                          />

                          <Form.Field
                            width={8}
                            control={Radio}
                            name="FCOLLTYPE"
                            label="AUTONOMOUS"
                            value="AUTO"
                            checked={
                              (this.state.checkbox1 != ""
                                ? this.state.checkbox1
                                : currentFormdata.FCOLLTYPE) == "AUTO"
                            }
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                      </Form.Group>

                      <Form.Group width={16}>
                        <Form.Field width={8}>
                          <label>Select Degree Group</label>

                          {array.length > 0 && (
                            <Dropdown
                              label="sss"
                              name="ffaculty"
                              fluid
                              search
                              selection
                              onChange={this.handleChange}
                              placeholder="Select Degree"
                              options={deg_options}
                              value={array}
                              multiple
                              disabled={this.props.disabled}
                            />
                          )}
                          {array.length <= 0 && (
                            <Dropdown
                              label="sss"
                              name="ffaculty"
                              fluid
                              search
                              selection
                              onChange={this.handleChange}
                              placeholder="Select Degree"
                              options={deg_options}
                              value={array}
                              multiple
                              disabled={this.props.disabled}
                            />
                          )}
                        </Form.Field>

                        <Form.Input
                          placeholder="Principle Name"
                          // value={fexamtype}
                          value={currentFormdata.FPRINCIPALNAME}
                          width={8}
                          label="Principal Name"
                          name="FPRINCIPALNAME"
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Group width={16}>
                        <Form.Input
                          placeholder="Branch Account number"
                          // value={fyear}
                          width={8}
                          label="Branch Account number"
                          name="fbankaccno"
                          value={currentFormdata.fbankaccno}
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          placeholder="Branch Code"
                          // value={fexamtype}
                          value={currentFormdata.fbranchcode}
                          width={8}
                          label="Branch Code"
                          name="fbranchcode"
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      {/* <Form.Dropdown
                    placeholder="Select Options"
                    value={['2']}
                    fluid multiple selection
                    options={options}
                  /> */}

                      <Form.Group width={16}>
                        <Form.Input
                          placeholder="Bank Name"
                          // value={fyear}
                          width={8}
                          label="Bank Name"
                          name="fbank"
                          value={currentFormdata.fbank}
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          placeholder="IFSC CODE"
                          // value={fexamtype}
                          value={currentFormdata.fifsccode}
                          width={8}
                          label="IFSC CODE"
                          name="fifsccode"
                          onChange={this.handleChange}
                        />
                      </Form.Group>

                      <Form.Group width={16}>
                        <Form.Input
                          placeholder="Branch Name"
                          // value={fyear}
                          width={8}
                          label="Branch Name"
                          name="fbankbranch"
                          value={currentFormdata.fbankbranch}
                          onChange={this.handleChange}
                        />
                        <Form.Input
                          placeholder="Bank Location"
                          // value={fexamtype}
                          value={currentFormdata.fbankplace}
                          width={8}
                          label="Bank Location"
                          name="fbankplace"
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                    </>
                  )}
                </Form>
              </div>
              <Divider />
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    saveDeggrp: state.saveDeggrp,
    univcode: state.user.fcuruniv,
    collegeList: state.collegeList,
    deggrp: state.deggrp,
    Collegeformdata: state.CollegeForm,
    SpecificCollegeDetails: state.GetSpecificCollege
  };
};

export default connect(
  mapStateToProps,
  {
    showError,
    getCollegeList,
    SaveCollegeForm,
    Collegeform,
    CancelForm,
    GetSpecificCollege
  }
)(CollegeForm);
