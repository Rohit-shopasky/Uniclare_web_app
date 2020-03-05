import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Dropdown } from "semantic-ui-react";
import { getCategory } from "../../../actions/finance/fee-str";

class SelectMulCategory extends Component {
  componentDidMount() {
    this.props.getCategory();
  }

  render() {
    const category = this.props.category;

    const category_options = category.map((el, i) => {
      return {
        key: i,
        value: el.fcategory,
        text: el.fdescpn
      };
    });

    return (
      <Form.Field>
        <label>Category</label>
        <Dropdown
          fluid
          name="fcategory"
          search
          selection
          value={this.props.fcategory}
          onChange={this.props.onCategoryChange}
          placeholder="Select Category"
          options={category_options}
          multiple
          disabled={this.props.disabled}
        />
      </Form.Field>
    );
  }
}

const mapStateToProps = state => {
  return { category: state.category, user: state.user };
};

export default connect(
  mapStateToProps,
  { getCategory }
)(SelectMulCategory);
