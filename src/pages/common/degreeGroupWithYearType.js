import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Dropdown } from "semantic-ui-react";
import { fetchDegGrp } from "../../actions";

class DegreeGroupWithYearType extends Component {
  state = {
    deggrp: {
      fdeggrp: "",
      fdescpn: "",
      fyear: "",
      fexamtype: "",
      fexamdate: "",
      fdeleted: false
    }
  };
  componentDidMount() {
    this.props.fetchDegGrp();

    if (this.props.user.fdeggrp !== "") {
      const deggrp = this.props.deggrp.filter((el, i) => {
        return el.fdeggrp === this.props.user.fdeggrp;
      })[0];
      this.setState({ deggrp: deggrp });

      // this.props.changeDeggrp(data.value);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.props.fetchDegGrp();

      if (this.props.user.fdeggrp !== "") {
        const deggrp = this.props.deggrp.filter((el, i) => {
          return el.fdeggrp === this.props.user.fdeggrp;
        })[0];
        this.setState({ deggrp: deggrp });

        // this.props.changeDeggrp(data.value);
      }
    }
  }

  changeDeggrp = (e, data) => {
    const deggrp = this.props.deggrp.filter((el, i) => {
      return el.fdeggrp === data.value;
    })[0];
    this.setState({ deggrp: deggrp });

    this.props.changeDeggrp(data.value);
  };

  render() {
    const deggroup = this.props.deggrp;

    var deggroup_options = deggroup.map((el, i) => {
      return {
        key: i,
        value: el.fdeggrp,
        text: `${el.fdeggrp} - ${el.fdescpn}`
      };
    });

    const { fdeggrp, fyear, fexamtype, fexamdate } = this.state.deggrp;

    return (
      <div>
        <Form.Field>
          <label>Degree Gro</label>
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
        <Form.Group>
          <Form.Input
            placeholder="Year"
            value={fyear}
            width={4}
            label="Year"
            readOnly
          />
          <Form.Input
            placeholder="Type"
            value={fexamtype}
            width={3}
            label="Type"
            readOnly
          />
          <Form.Input
            placeholder="Exam Date"
            label="Exam Date"
            width={10}
            value={fexamdate}
            readOnly
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
)(DegreeGroupWithYearType);
