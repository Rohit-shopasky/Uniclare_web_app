import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Dropdown } from "semantic-ui-react";
import { fetchDegGrp } from "../../../actions";

class DegreeGroupForm extends Component {
  state = {
    deggrp: {
      fdeggrp: "",
      fdescpn: "",
      fyear: "",
      fexamtype: "",
      fexamdate: "",
      fdeleted: false
    },
    degoptions: [],
    degreeGroup: []
  };
  componentDidMount() {
    this.props.fetchDegGrp();
    this.props.onRef(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.deggrp !== prevProps.deggrp) {
      this.setState({ degreeGroup: this.props.deggrp });
    }
  }

  changeDeggrp = async (e, data) => {
    const deggrp = this.state.degreeGroup.filter((el, i) => {
      return el.fdeggrp == data.value.toUpperCase();
    })[0];
    // if it is new addition
    if (deggrp === undefined) {
      this.setState({
        deggrp: {
          fdeggrp: data.value,
          fdescpn: "",
          fyear: "",
          fexamtype: "",
          fexamdate: "",
          fdeleted: false
        }
      });
    } else {
      this.setState({ deggrp: deggrp });
    }
    await this.props.changeDeggrp(data.value);
    this.props.getDegrees();
  };
  // This Function is to add new item to select box After adding onchange will also be triggered
  handleAddition = async (e, { value }) => {
    await this.setState({
      degreeGroup: [
        {
          fdeggrp: value,
          fdescpn: "",
          fyear: "",
          fexamtype: "",
          fexamdate: "",
          fdeleted: false
        },
        ...this.state.degreeGroup
      ]
    });
  };

  handleChange = (e, data) => {
    this.setState({
      deggrp: { ...this.state.deggrp, [data.name]: data.value }
    });
  };

  handleCancel = () => {
    this.setState({
      deggrp: {
        fdeggrp: "",
        fdescpn: "",
        fyear: "",
        fexamtype: "",
        fexamdate: "",
        fdeleted: false
      }
    });
  };

  render() {
    const deggroup = this.state.degreeGroup;
    var deggroup_options = deggroup.map((el, i) => {
      return { key: i, value: el.fdeggrp, text: `${el.fdeggrp}` };
    });

    const { fdeggrp, fyear, fdescpn, fexamtype, fexamdate } = this.state.deggrp;

    return (
      <div>
        <Form.Group>
          <Form.Field width={4}>
            <label>Degree Group</label>
            <Dropdown
              size="mini"
              fluid
              search
              selection
              value={fdeggrp}
              onChange={this.changeDeggrp}
              allowAdditions
              onAddItem={this.handleAddition}
              placeholder="Deg. Grp."
              disabled={this.props.disabled}
              openOnFocus={false}
              options={deggroup_options}
              selectOnBlur={false}
              searchInput={{ autoFocus: true }}
            />
          </Form.Field>
          <Form.Field width={13}>
            <Form.Input
              placeholder="Description"
              value={fdescpn}
              label="Description"
              name="fdescpn"
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Input
            placeholder="Year"
            value={fyear}
            width={4}
            label="Year"
            name="fyear"
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Type"
            value={fexamtype}
            width={3}
            label="Type"
            name="fexamtype"
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Exam Date"
            label="Exam Date"
            width={10}
            name="fexamdate"
            value={fexamdate}
            onChange={this.handleChange}
          />
        </Form.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deggrp: state.deggrp,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { fetchDegGrp }
)(DegreeGroupForm);
