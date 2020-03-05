import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Table, Modal, Form, Checkbox } from "semantic-ui-react";

import {
  fetchCombSub,
  addCombination,
  fetchCombSubEdit
} from "../../../actions";

import CombSubjectGrid from "./CombSubjectGrid";

class CombModal extends Component {
  state = {
    combcode: "",
    combdesc: "",
    combcodeError: false,
    combdescError: false,
    subnum: false,
    newcombsubs: {},
    combsubsError: false,
    loadGrid: this.props.edit
  };

  componentDidMount() {
    if (!this.state.edit) this.props.fetchCombSub(this.props.degree);
    else {
      console.log(
        "component did mount ===> ",
        this.state.edit,
        this.props.edCombcode
      );
      this.props.fetchCombSubEdit(this.props.edCombcode, this.props.degree);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.edCombcode !== prevProps.edCombcode) {
      console.log(
        "component did Update ===> ",
        this.state.edit,
        this.props.edCombcode
      );
      this.props.fetchCombSubEdit(this.props.edCombcode, this.props.degree);
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  loadGridHandle = () => this.setState({ loadGrid: true });

  handleSave = async () => {
    const { combcode, combdesc, newcombsubs } = this.state;

    // if( combcode === "")
    // {

    // }

    const newComb = {
      degree: this.props.degree,
      combcode,
      combdesc,
      combSubs: newcombsubs
    };

    const response = await this.props.addCombination(newComb);
    console.log(response);
  };

  onModalClose = () => {
    this.setState({ combcode: "", combdesc: "", newcombsubs: {}, subnum: "" });
    this.props.close();
  };

  handleSubChange = async (e, data) => {
    await this.setState({
      newcombsubs: {
        ...this.state.newcombsubs,
        [data.id]: data.value
      }
    });
  };

  renderAdd() {
    const { combcode, combdesc, subnum, loadGrid, newcombsubs } = this.state;

    const subs = this.props.combsubs;

    return (
      <div>
        <Modal
          style={{ height: "60%" }}
          dimmer={this.props.dim}
          open={this.props.open}
          onClose={this.props.close}
        >
          <Modal.Header>
            {this.props.header}
            <div style={{ float: "right" }}>
              <Button color="black" onClick={this.onModalClose}>
                Cancel
              </Button>
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content="Save"
                onClick={this.handleSave}
              />
            </div>
          </Modal.Header>

          <Modal.Content scrolling>
            <Form>
              <Form.Group>
                <Form.Input
                  placeholder="Comb. Code"
                  name="combcode"
                  required
                  minlength={3}
                  maxlength={4}
                  value={combcode}
                  label="Combination Code"
                  onChange={this.handleChange}
                  width={5}
                />

                <Form.Input
                  label="No. Of Subjects"
                  placeholder="No. Of Subjects"
                  name="subnum"
                  required
                  minlength={1}
                  maxlength={2}
                  value={subnum}
                  onChange={this.handleChange}
                  width={5}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  required
                  minlength={5}
                  maxlength={60}
                  label="Combination Desc"
                  placeholder="Comb. Desc."
                  name="combdesc"
                  value={combdesc}
                  onChange={this.handleChange}
                  width={10}
                />
              </Form.Group>
              <Button onClick={this.loadGridHandle}>List</Button>
            </Form>
            <br />
            <br />

            {loadGrid ? (
              <CombSubjectGrid
                subject={subs}
                handleSubChange={this.handleSubChange}
                subnum={subnum}
                newSubject={newcombsubs}
              />
            ) : null}
          </Modal.Content>
        </Modal>
      </div>
    );
  }

  renderEdit() {
    const { combcode, combdesc } = this.state;
    return (
      <div>
        <Modal
          style={{ height: "76%", top: "20%" }}
          dimmer={this.props.dim}
          open={this.props.open}
          onClose={this.props.close}
        >
          <Modal.Header>
            {this.props.header}
            <div style={{ float: "right" }}>
              <Button color="black" onClick={this.onModalClose}>
                Cancel
              </Button>
              <Button
                positive
                icon="checkmark"
                labelPosition="right"
                content="Save"
                onClick={this.handleSave}
              />
            </div>
          </Modal.Header>

          <Modal.Content scrolling>
            <Form>
              <Form.Input
                placeholder="Comb. Code"
                name="combcode"
                value={combcode}
                onChange={this.handleChange}
              />

              <Form.Input
                placeholder="Comb. Desc."
                name="combdesc"
                value={combdesc}
                onChange={this.handleChange}
              />
            </Form>
            <br />
            <br />

            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    style={{ width: "5%" }}
                    singleLine
                    textAlign="center"
                  >
                    Sl. No.
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "10%" }} textAlign="center">
                    Sub. Code
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Subject Name
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: "20%" }} textAlign="center">
                    Select
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.combsubs.map((sub, i) => {
                  return (
                    <Table.Row key={i}>
                      <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                      <Table.Cell textAlign="center" singleLine>
                        {sub.fsubcode}
                      </Table.Cell>
                      <Table.Cell>{sub.fsubname}</Table.Cell>
                      <Table.Cell textAlign="center">
                        <Checkbox
                          onChange={this.changeSubject}
                          label={{ children: "Select" }}
                          value={sub.fsubcode}
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Modal.Content>
        </Modal>
      </div>
    );
  }

  render() {
    if (!this.state.edit) return this.renderAdd();
    else return this.renderEdit();
  }
}

const mapStateToProps = state => {
  return {
    combsubs: state.combsubs
  };
};

export default connect(
  mapStateToProps,
  { fetchCombSub, addCombination, fetchCombSubEdit }
)(CombModal);
