import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Dropdown } from "semantic-ui-react";
import { fetchSubPrBoard } from "../../actions/practicals/practicals";

class SelectSubBoard extends Component {
  render() {
    const board = this.props.board;

    const board_options = board.map((el, i) => {
      return {
        key: i,
        value: el.fboardcode,
        text: `${el.fboardcode} - ${el.fboardname}`
      };
    });

    return (
      <Form.Field>
        <label>Board</label>
        <Dropdown
          fluid
          search
          selection
          value={this.props.fboard}
          onChange={this.props.onBoardChange}
          placeholder="Select Board"
          options={board_options}
        />
      </Form.Field>
    );
  }
}

const mapStateToProps = state => {
  return { board: state.boards, user: state.user };
};

export default connect(
  mapStateToProps,
  { fetchSubPrBoard }
)(SelectSubBoard);
