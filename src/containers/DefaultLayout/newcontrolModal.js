import React, { Component } from "react";
import { connect } from "react-redux";
import { closeError, fetchDegGrp } from "../../actions";
import { setDegreeGroup } from "../../actions/registration/loginRegn";
import { Button, Modal, Form, Dropdown, Card } from "semantic-ui-react";
import { wHeight } from "../../pages/parms/";
class NewControlModal extends Component {
  state = {
    deggrp: {
      fdeggrp: "",
      fdescpn: "",
      fyear: "",
      fexamtype: "",
      fexamdate: "",
      fdeleted: false
    },
    fexamrange: ""
  };

  componentDidMount() {
    this.props.fetchDegGrp();
    const control = localStorage.getItem("control");
    if (control !== null) {
      const control1 = JSON.parse(control);
      this.setState({
        deggrp: { ...this.state.deggrp, ...control1 },
        fexamrange: control1.fexamrange
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.props.fetchDegGrp();
    }
  }

  changeDeggrp = (e, data) => {
    const deggrp = this.props.deggrp.filter((el, i) => {
      return el.fdeggrp == data.value;
    })[0];
    this.setState({ deggrp: deggrp });

    this.props.setDegreeGroup({ ...deggrp, fexamrange: this.state.fexamrange });
  };

  setValues = () => {
    this.props.setDegreeGroup({
      ...this.state.deggrp,
      fexamrange: this.state.fexamrange
    });
  };

  changeExam = (e, data) => {
    this.setState({ fexamrange: data.value });
  };

  handleChange = (e, data) => {
    this.setState({
      deggrp: { ...this.state.deggrp, [data.name]: data.value }
    });
  };

  render() {
    // const { open, size, header, content } = this.props.error;
    const deggroup = this.props.deggrp;

    var deggroup_options = deggroup.map((el, i) => {
      return {
        key: i,
        value: el.fdeggrp,
        text: `${el.fdeggrp} - ${el.fdescpn}`
      };
    });

    const { fdeggrp, fyear, fexamtype, fexamdate } = this.state.deggrp;

    const examdate_options = [
      { key: 1, value: `${fyear}${fexamtype}`, text: fexamdate }
    ];

    const fyeartype = `${fyear}${fexamtype}`;

    const wHeight = (window.innerHeight * 50) / 100;

    return (
      <div>
        <Card fluid>
          <Card.Content>
            <Card.Description
              style={{ overflowY: "auto", height: `${this.wheight}px` }}
            >
              <Form>
                <Form.Field>
                  <label>Degree Group</label>
                  <Dropdown
                    size="mini"
                    fluid
                    search
                    selection
                    value={fdeggrp}
                    onChange={this.changeDeggrp}
                    placeholder="Select Degree Group"
                    disabled={this.props.disabled}
                    openOnFocus={false}
                    options={deggroup_options}
                    selectOnBlur={false}
                    searchInput={{ autoFocus: true }}
                  />
                </Form.Field>
                <Form.Field>
                  {/* <Form.Input
                  placeholder="Year"
                  name="fyear"
                  onChange={this.handleChange}
                  value={fyear}
                  width={4}
                  label="Year"
                />
                <Form.Input
                  placeholder="Type"
                  name="fexamtype"
                  onChange={this.handleChange}
                  value={fexamtype}
                  width={3}
                  label="Type"
                /> */}

                  <Dropdown
                    size="mini"
                    fluid
                    search
                    selection
                    value={fyeartype}
                    placeholder="Select Exam Date"
                    openOnFocus={false}
                    options={examdate_options}
                    selectOnBlur={false}
                  />
                  {/* <Form.Input
                  placeholder="Exam Date"
                  label="Exam Date"
                  width={10}
                  value={fexamdate}
                  readOnly
                /> */}
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    placeholder="Exam Range"
                    onChange={this.changeExam}
                    value={this.state.fexamrange}
                    width={4}
                    label="Exam Range"
                  />
                </Form.Field>
              </Form>
              <br />

              <Button
                style={{ padding: "0.5em 1em" }}
                color="blue"
                onClick={this.setValues}
                content="Set"
              />

              {/* <Button
                ref="error_ok"
                style={{ padding: "0.5em 1em" }}
                color="black"
                onClick={this.close}
                content="Close"
              /> */}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user, deggrp: state.deggrp };
};

export default connect(
  mapStateToProps,
  {
    closeError,
    fetchDegGrp,
    setDegreeGroup
  }
)(NewControlModal);
