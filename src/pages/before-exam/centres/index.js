import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Divider, Table, Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  saveCntrList,
  fetchCntrList,
  showError,
  changeCntrList
} from "../../../actions";
import { wHeight } from "../../parms";
class Centres extends Component {
  state = {
    centreList: [],
    frmsubmit: false,
    searchVal: ""
  };

  async componentDidMount() {
    if (this.props.user.fdeggrp === "") {
      const error = { header: "Error", content: "Degree group required" };
      this.props.showError(error);
      return;
    }

    await this.props.fetchCntrList(this.props.user.fdeggrp);
    this.setState({ frmsubmit: true });
  }

  componentDidUpdate(prevProps) {
    if (this.props.cntrList !== prevProps.cntrList) {
      this.setState({ centreList: [...this.props.cntrList] });
    }
  }

  setDeggrp = data => {
    this.setState({ degGrp: data });
  };

  changeCell = (e, el, i) => {
    const centreList = this.state.centreList;
    let arra = centreList.map((item, j) => {
      let data = item;
      if (j === i) {
        data = { ...el, [e.target.name]: e.target.value };
      }
      return data;
    });
    this.setState({ centreList: arra });
    // this.props.changeCntrList({ e, el, i });
  };

  handleSave = async () => {
    if (this.state.centreList.length <= 1) {
      this.setState({ error: true, errorMessage: "Enter the vlaues" });
      return;
    } else {
      this.setState({ error: false, errorMessage: "" });
    }

    for (let i = 0; i < this.state.centreList.length; i++) {
      let el = this.state.centreList[i];
      if (el.fdeggrp === "" || el.fdescpn === "") {
        this.setState({ error: true, errorMessage: "Enter all the vlaues" });
        return;
      }
    }
    this.setState({ error: false, errorMessage: "" });

    await this.props.saveCntrList(
      this.state.centreList,
      this.props.user.fdeggrp
    );

    // this.setState({ frmsubmit: false, centreList: [] });
  };

  handleCancel = () => {
    this.setState({ frmsubmit: false, centreList: [] });
  };

  searchTable = (e, data) => {
    const string = data.value;
    const searchresult = this.props.cntrList.filter(o =>
      Object.keys(o).some(k =>
        o[k].toLowerCase().includes(string.toLowerCase())
      )
    );
    this.setState({ centreList: searchresult, searchVal: data.value });
  };

  render() {
    const { centreList, frmsubmit } = this.state;

    const wheight = wHeight();

    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ display: "flex" }}>
              <h3>Centre List</h3>
              <div className="ml-auto">
                <Button
                  basic
                  color="blue"
                  content="Save"
                  disabled={!frmsubmit}
                  onClick={this.handleSave}
                  icon="save"
                />
                <Button
                  basic
                  color="black"
                  icon="ban"
                  onClick={this.handleCancel}
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
              {/* <div className="col-md-8">
                <Form>
                  <Button onClick={this.getCentresForUpdation} color="blue">
                    Submit
                  </Button>
                </Form>
              </div> */}
              {frmsubmit ? (
                <div className="ui form">
                  {/* <div style={{ marginBottom: '0.7em', float: 'right', marginRight: '1em' }} >
                    <Input icon='search' placeholder='Search...'
                      value={this.state.searchVal} onChange={this.searchTable} />
                  </div> */}
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell
                          style={{ width: "5%" }}
                          singleLine
                          textAlign="center"
                        >
                          Sl. No.
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "10%" }}
                          textAlign="center"
                        >
                          College Code
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">
                          College Name
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "10%" }}
                          textAlign="center"
                        >
                          Theory Centre
                        </Table.HeaderCell>
                        <Table.HeaderCell
                          style={{ width: "10%" }}
                          textAlign="center"
                        >
                          Practical Centre
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {centreList.map((el, i) => {
                        return (
                          <Table.Row key={i}>
                            <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                            <Table.Cell textAlign="center">
                              {el.fcollcode}
                            </Table.Cell>
                            <Table.Cell>{el.fcollname}</Table.Cell>
                            <Table.Cell textAlign="center" singleLine>
                              <input
                                className="field"
                                type="text"
                                name="fexamcodet"
                                id={i.toString()}
                                value={el.fexamcodet}
                                onChange={e => this.changeCell(e, el, i)}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <input
                                type="text"
                                value={el.fexamcodep}
                                name="fexamcodep"
                                id={i.toString()}
                                onChange={e => this.changeCell(e, el, i)}
                              />
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                </div>
              ) : null}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cntrList: state.cntrList,
    saveCntrList: state.saveCntrList,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {
    saveCntrList,
    fetchCntrList,
    showError,
    changeCntrList
  }
)(Centres);
