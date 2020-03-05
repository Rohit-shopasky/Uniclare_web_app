import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Dropdown } from "semantic-ui-react";
import { fetchPrSubs } from "../../actions/practicals/practicals";

class SelectPrSubs extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.fdegree !== prevProps.fdegree) {
      this.props.fetchPrSubs(this.props.fdegree, this.props.fboard);
    }
  }

  render() {
    const prsubs = this.props.prsubs;
    console.log(prsubs);
    const prsub_options = prsubs.map((el, i) => {
      return {
        key: i,
        value: el.fcsubcode,
        text: `${el.fcsubcode} - ${el.fsubname}`
      };
    });

    return (
      <Form.Field>
        <label>Subjects</label>
        <Dropdown
          fluid
          search
          selection
          value={this.props.fcsubcode}
          onChange={this.props.onSubChange}
          placeholder="Select Subject"
          options={prsub_options}
        />
      </Form.Field>
    );
  }
}

const mapStateToProps = state => {
  return { prsubs: state.prsubs };
};

export default connect(
  mapStateToProps,
  { fetchPrSubs }
)(SelectPrSubs);
