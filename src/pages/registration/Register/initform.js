import React, { Component } from "react";
import { Form, Button, Dropdown, Card, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  getStates,
  changeRegn,
  getUnivs,
  validateRegno
} from "../../../actions/registration/loginRegn";
import { showError } from "../../../actions";

class InitForm extends Component {
  componentDidMount() {
    this.props.getStates();
  }

  handleChange = (e, { name, value }) => {
    this.props.changeRegn(name, value);
  };

  getUnivs = async (e, data) => {
    await this.props.changeRegn(data.name, data.value);
    this.props.getUnivs();
  };

  validateRegno = () => {
    const { fstate, funivcode, fuserid } = this.props.regn;
    if (fstate === "") {
      const error = { header: "Error", content: "Select State" };
      this.props.showError(error);
      return;
    }
    if (funivcode === "") {
      const error = { header: "Error", content: "Select University" };
      this.props.showError(error);
      return;
    }
    if (fuserid === "") {
      const error = {
        header: "Error",
        content: "Enter Reg. No. / Teacher Code"
      };
      this.props.showError(error);
      return;
    }
    this.props.validateRegno();
  };

  render() {
    const {
      states,
      univs,
      fstate,
      funivcode,
      fuserid,
      fregvalid,
      studinfo
    } = this.props.regn;

    var state_options = states.map((el, i) => {
      return { key: i, value: el.fstatecode, text: el.fstate };
    });

    var univ_options = univs.map((el, i) => {
      return { key: i, value: el.funivcode, text: el.funivname };
    });
    // const trs = ;
    return (
      <Form onSubmit={this.validateRegno}>
        <Form.Field required>
          <Dropdown
            size="mini"
            error={this.props.dgerror}
            fluid
            search
            selection
            placeholder="Select State"
            openOnFocus={false}
            name="fstate"
            value={fstate}
            options={state_options}
            searchInput={{ autoFocus: true }}
            onChange={this.getUnivs}
            required
          />
        </Form.Field>

        <Form.Field required>
          <Dropdown
            size="mini"
            error={this.props.dgerror}
            fluid
            search
            selection
            placeholder="Select University"
            name="funivcode"
            value={funivcode}
            options={univ_options}
            onChange={this.handleChange}
            required
          />
        </Form.Field>

        <Form.Field>
          <Form.Input
            name="fuserid"
            type="text"
            icon="user"
            iconPosition="left"
            placeholder="Reg. No. / Teach. Code"
            maxLength="8"
            minLength="5"
            value={fuserid}
            onChange={this.handleChange}
            required
          />
        </Form.Field>
        <div className="row">
          <div className="col-md-6">
            {!fregvalid ? (
              <Button color="blue" className="px-4">
                Validate
              </Button>
            ) : null}
          </div>
        </div>

        {fregvalid ? (
          <Card fluid>
            <Card.Content>
              <Table
                basic="very"
                celled
                collapsing
                columns="16"
                padded
                singleLine
              >
                {studinfo.fusertype === "900" ? (
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Name</Table.Cell>
                      <Table.Cell>
                        <b>{studinfo.fname}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Father Name</Table.Cell>
                      <Table.Cell>
                        <b>{studinfo.ffather}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Mother Name</Table.Cell>
                      <Table.Cell>
                        <b>{studinfo.fmother}</b>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ) : (
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Name</Table.Cell>
                      <Table.Cell>
                        <b>{studinfo.fname}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Date of birth</Table.Cell>
                      <Table.Cell>
                        <b>{studinfo.fdob}</b>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                )}
              </Table>
            </Card.Content>
          </Card>
        ) : null}
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    regn: state.regn
  };
};
export default connect(
  mapStateToProps,
  {
    getStates,
    showError,
    changeRegn,
    getUnivs,
    validateRegno
  }
)(InitForm);
