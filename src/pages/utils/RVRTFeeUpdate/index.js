import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Divider, Button, Form, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { showError } from "../../../actions";
import InputMask from "react-input-mask";
import { wHeight } from "../../parms";
import {
  getDegExmRng,
  getFeeUpdateDet,
  updateRVRTFeeDet
} from "../../../actions/after-exam/RVRTFeeUpdate";

class RVRTFeeUpdate extends Component {
  state = {
    fresdate: "",
    fcollfrm: "0000",
    fcollto: "ZZZZ",
    fregto: "ZZZZZ",
    fregfrm: "00000",
    fexam: "",
    fdeg: "",
    frvdate: "",
    frtdate: "",
    fcvdate: "",
    fpcdate: "",
    fridate: "",
    frvfee: "",
    frtfee: "",
    fcvfee: "",
    fpcfee: "",
    frifee: "",
    shwTbl: false
  };

  async componentDidMount() {
    await this.props.getDegExmRng(this.state.fresdate);
  }

  handleChangedate = (e, data) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  getDegExmRng = async () => {
    await this.props.getDegExmRng(this.state.fresdate);
  };

  handleSave = async () => {
    var {
      fresdate,
      fdeg,
      fexam,
      fcollfrm,
      fcollto,
      fregfrm,
      fregto,
      frvfee,
      frtfee,
      fcvfee,
      fpcfee,
      frvdate,
      frtdate,
      fcvdate,
      fpcdate,
      fridate,
      frifee
    } = this.state;

    fexam = fexam.join("','");
    fdeg = fdeg.join("','");

    var data = {
      fexam: fexam,
      fdeg: fdeg,
      fcollfrm: fcollfrm,
      fcollto: fcollto,
      fregfrm: fregfrm,
      fregto: fregto,
      frvfee: frvfee,
      frtfee: frtfee,
      fcvfee: fcvfee,
      fpcfee: fpcfee,
      frvdate: frvdate,
      frtdate: frtdate,
      fcvdate: fcvdate,
      fpcdate: fpcdate,
      fridate: fridate,
      frifee: frifee
    };

    await this.props.updateRVRTFeeDet(data);
    this.handleCancel();
  };

  handleCancel = () => {
    this.setState({
      fresdate: "",
      fcollfrm: "0000",
      fcollto: "ZZZZ",
      fregto: "ZZZZZ",
      fregfrm: "00000",
      fexam: "",
      fdeg: "",
      frvdate: "",
      frtdate: "",
      fcvdate: "",
      fpcdate: "",
      fridate: "",
      frvfee: "",
      frtfee: "",
      fcvfee: "",
      fpcfee: "",
      frifee: "",
      shwTbl: false
    });
  };
  render() {
    var degreeOpt =
      this.props.DegExmRng.deg == undefined ? [] : this.props.DegExmRng.deg;

    var ExamRngOpt =
      this.props.DegExmRng.exm == undefined ? [] : this.props.DegExmRng.exm;

    const formatChars = {
      n: "[0-1]",
      m: "[0-9]",
      e: "[0-3]",
      d: "[0-9]",
      z: "[1-2]",
      y: "[0-9]"
    };
    const wheight = wHeight();
    return (
      <div>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h4>Fee / Date Update - RV / RT / PC</h4>
              <div className="ml-auto">
                <Button
                  basic
                  color="blue"
                  content="Save"
                  onClick={this.handleSave}
                  icon="save"
                />
                <Button
                  basic
                  onClick={this.handleCancel}
                  color="black"
                  icon="times circle"
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
                <div
                  className="row clearfix"
                  style={{ marginRight: "0px", marginLeft: "-5px" }}
                >
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Field width={16}>
                        <label>Degree Range</label>
                        <Dropdown
                          placeholder="Degrees"
                          search
                          selection
                          multiple
                          name="fdeg"
                          value={this.state.fdeg}
                          options={degreeOpt.map((el, i) => {
                            return {
                              key: i,
                              value: el.fdegree,
                              text: `${el.fdegree}`
                            };
                          })}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={16}>
                        <label>Exam Range</label>
                        <Dropdown
                          placeholder="Exam Range"
                          search
                          selection
                          multiple
                          id="fexam"
                          name="fexam"
                          value={this.state.fexam}
                          options={ExamRngOpt.map((el, i) => {
                            return {
                              key: i,
                              value: el.fexamno,
                              text: `${el.fexamname}`
                            };
                          })}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={8}>
                        <Form.Input
                          placeholder="From"
                          name="fcollfrm"
                          value={this.state.fcollfrm}
                          onChange={this.handleChange}
                          maxLength="4"
                          label="College Range"
                        />
                      </Form.Field>
                      <Form.Field width={8}>
                        <Form.Input
                          placeholder="To"
                          name="fcollto"
                          value={this.state.fcollto}
                          onChange={this.handleChange}
                          maxLength="4"
                          style={{ marginTop: "1.6em" }}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={8}>
                        <Form.Input
                          placeholder="From"
                          name="fregfrm"
                          value={this.state.fregfrm}
                          onChange={this.handleChange}
                          maxLength="10"
                          label="Register No. Range"
                        />
                      </Form.Field>
                      <Form.Field width={8}>
                        <Form.Input
                          placeholder="To"
                          name="fregto"
                          value={this.state.fregto}
                          onChange={this.handleChange}
                          maxLength="10"
                          style={{ marginTop: "1.6em" }}
                        />
                      </Form.Field>
                    </Form.Group>
                  </div>
                  {/* </div>
                <div className="row clearfix"> */}

                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Field width={16}>
                        <label>Re-Valuation </label>
                      </Form.Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={8}>
                        <label>Last Date </label>
                        <InputMask
                          type="text"
                          placeholder="RV Last Date"
                          name="frvdate"
                          mask="ed/nm/zyyy"
                          formatChars={formatChars}
                          value={this.state.frvdate}
                          onChange={this.handleChangedate}
                        />
                      </Form.Field>
                      <Form.Field width={8}>
                        <Form.Input
                          label="Fee"
                          placeholder="RV Fee"
                          name="frvfee"
                          value={this.state.frvfee}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={16}>
                        <label>Re-Totalling </label>
                      </Form.Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={8}>
                        <label>Last Date </label>
                        <InputMask
                          type="text"
                          label="Fee"
                          placeholder="RT Last Date"
                          name="frtdate"
                          mask="ed/nm/zyyy"
                          formatChars={formatChars}
                          value={this.state.frtdate}
                          onChange={this.handleChangedate}
                        />
                      </Form.Field>

                      <Form.Field width={8}>
                        <Form.Input
                          label="Fee"
                          placeholder="RT Fee"
                          name="frtfee"
                          value={this.state.frtfee}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={16}>
                        <label>Photo Copy </label>
                      </Form.Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={8}>
                        <label> Last Date </label>
                        <InputMask
                          type="text"
                          placeholder="PC Last date"
                          name="fpcdate"
                          mask="ed/nm/zyyy"
                          formatChars={formatChars}
                          value={this.state.fpcdate}
                          onChange={this.handleChangedate}
                        />
                      </Form.Field>

                      <Form.Field width={8}>
                        <Form.Input
                          label="Fee"
                          placeholder="PC Fee"
                          name="fpcfee"
                          value={this.state.fpcfee}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={16}>
                        <label>Challenge Valuation </label>
                      </Form.Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={8}>
                        <label> Last Date </label>
                        <InputMask
                          type="text"
                          placeholder="CV Last Date"
                          name="fcvdate"
                          mask="ed/nm/zyyy"
                          formatChars={formatChars}
                          value={this.state.fcvdate}
                          onChange={this.handleChangedate}
                        />
                      </Form.Field>
                      <Form.Field width={8}>
                        <Form.Input
                          label="Fee"
                          placeholder="CV Fee"
                          name="fcvfee"
                          value={this.state.fcvfee}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    </Form.Group>

                    <Form.Group>
                      <Form.Field width={16}>
                        <label>Result Improvement </label>
                      </Form.Field>
                    </Form.Group>
                    <Form.Group>
                      <Form.Field width={8}>
                        <label> Last Date </label>
                        <InputMask
                          type="text"
                          placeholder="RI Last Date"
                          name="fridate"
                          mask="ed/nm/zyyy"
                          formatChars={formatChars}
                          value={this.state.fridate}
                          onChange={this.handleChangedate}
                        />
                      </Form.Field>
                      <Form.Field width={8}>
                        <Form.Input
                          label="Fee"
                          placeholder="RI Fee"
                          name="frifee"
                          value={this.state.frifee}
                          onChange={this.handleChange}
                        />
                      </Form.Field>
                    </Form.Group>
                  </div>
                  <Divider vertical> >> </Divider>
                </div>
              </Form>
              {/* <Button
                basic
                color="green"
                content="Submit"
                onClick={this.handleSubmit}
                className="mb-3"
              /> */}
              {/* {this.state.shwTbl && <FeeUpdateTbl />} */}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    DegExmRng: state.getDegExmRng,
    FeeUpdateDet: state.shwFeeUpdateDet
  };
};
export default connect(
  mapStateToProps,
  {
    showError,
    getDegExmRng,
    getFeeUpdateDet,
    updateRVRTFeeDet
  }
)(RVRTFeeUpdate);
