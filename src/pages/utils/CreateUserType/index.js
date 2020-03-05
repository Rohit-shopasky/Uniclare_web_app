import React, { Component } from "react";
import { Card, Form, Button, Divider, Table, Grid } from "semantic-ui-react";
import {
    getreasoncd,
    changeDet,
    savereasonMaster
} from "../../../actions/masters/reasonMaster";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { showError } from "../../../actions";
import {
    getUserType, saveusertypes
} from "../../../actions/utils/createUser";
import { addRow } from "../../../actions/masters/subEntryScrn";
import { wHeight } from "../../parms";
class CreateUserType extends Component {
    state = { codeDis: true };
    async componentDidMount() {
        // await this.props.getreasoncd();
        await this.props.getUserType('EditList')

    }

    changeCell = (data, el, i) => {
        const regex = /^[0-9\b]+$/;
        let newdata = {};
        const type = "USER_TYPE_LIST_EDIT";
        if (data.type == "checkbox") {
            const value = data.checked ? "T" : "F";
            newdata = { ...el, [data.name]: value };
            this.props.changeDet(newdata, i, type);
        } else if (data.name == 'FUSERTYPE') {
            let isInt = (regex.test(data.value) || data.value == "")
                && (newdata = { ...el, [data.name]: data.value },
                    this.props.changeDet(newdata, i, type))
        }
        else {
            newdata = { ...el, [data.name]: data.value.toUpperCase() };
            this.props.changeDet(newdata, i, type);
        }
    };

    handleSave = () => this.showErr();

    showErr = async () => {
        const emptyCount = this.props.typeDet.filter(
            (el, i) => el.FTYPEDESC == "" || el.FUSERTYPE == ""
        );
        // console.log("errr", emptyCount);
        if (emptyCount.length > 0) {
            const error = {
                header: "Error",
                content: "Fill Details Before saving. "
            };
            this.props.showError(error);
            return;
        } else {
            await this.props.saveusertypes();
            this.props.getUserType('EditList');
        }
    };

    add = async () => {
        let i = this.props.typeDet.length;
        const el = this.props.typeDet[i - 1];
        // console.log("add", i, el);

        if (el.FUSERTYPE === "" || el.FTYPEDESC === "") {
            const error = {
                header: "Error",
                content: "Fill Details to Add next Row. "
            };
            this.props.showError(error);
            return;
        }
        const type = "ADD_USER_TYPES";
        await this.props.addRow(type);
        this.setState({ codeDis: false });
    };

    render() {
        // console.log("statete", this.props.reasonsDet);
        const reasonsDet = this.props.typeDet == "" ? [] : this.props.typeDet;
        const wheight = wHeight();
        return (
            <>
                <Card fluid>
                    <Card.Content>
                        <Card.Header style={{ display: "flex" }}>
                            <h3>Create User Type</h3>
                            <div className="ml-auto">
                                <Button
                                    basic
                                    size="small"
                                    onClick={this.add}
                                    color="blue"
                                    icon="plus"
                                    content="Add"
                                />
                                <Button
                                    basic
                                    color="green"
                                    content="Save"
                                    onClick={this.handleSave}
                                    icon="save"
                                />
                                <Link to="/dashboard">
                                    <Button basic color="red" content="Exit" icon="home" />
                                </Link>
                            </div>
                        </Card.Header>
                        <Divider />
                        <Card.Description
                            style={{ height: `${wheight}px`, overflowY: "auto" }}
                        >
                            <Grid divided="vertically" className="mt-3">
                                <Grid.Row columns={2}>
                                    <Grid.Column>
                                        <Table celled compact style={{ padding: "0%" }}
                                            className="tbl sticky1"
                                        >
                                            <Table.Header>
                                                <Table.Row textAlign="center">
                                                    <Table.HeaderCell width="1">Sl. No.</Table.HeaderCell>
                                                    <Table.HeaderCell width="2" style={{ zIndex: '9' }}>Code</Table.HeaderCell>
                                                    <Table.HeaderCell width="12" style={{ zIndex: '9' }}>Description</Table.HeaderCell>
                                                    <Table.HeaderCell width="2" style={{ zIndex: '9' }}>Short Name</Table.HeaderCell>
                                                    <Table.HeaderCell width="1" style={{ zIndex: '9' }}>Del</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                {reasonsDet.map((el, i) => {
                                                    return (
                                                        <Table.Row key={i} >
                                                            <Table.Cell textAlign="center">
                                                                {i + 1}
                                                            </Table.Cell>
                                                            <Table.Cell style={{ padding: "0px 0px" }}>
                                                                <Form.Input
                                                                    placeholder="Code"
                                                                    value={el.FUSERTYPE}
                                                                    style={{ width: "65px" }}
                                                                    name="FUSERTYPE"
                                                                    textAlign="center"
                                                                    maxLength={3}
                                                                    readOnly={
                                                                        el.FEDIT == undefined ? true : false
                                                                    }
                                                                    onChange={(e, data) =>
                                                                        this.changeCell(data, el, i)
                                                                    }
                                                                />
                                                            </Table.Cell>
                                                            <Table.Cell style={{ padding: "0px 0px" }}>
                                                                <Form.Input
                                                                    placeholder="Description"
                                                                    value={el.FTYPEDESC}
                                                                    style={{ width: "100%" }}
                                                                    name="FTYPEDESC"
                                                                    onChange={(e, data) =>
                                                                        this.changeCell(data, el, i)
                                                                    }
                                                                />
                                                            </Table.Cell>
                                                            <Table.Cell style={{ padding: "0px 0px" }}>
                                                                <Form.Input
                                                                    placeholder="Sht.Name"
                                                                    value={el.FTYPESHORT}
                                                                    style={{ width: "65px" }}
                                                                    name="FTYPESHORT"
                                                                    textAlign="center"
                                                                    maxLength={2}
                                                                    // readOnly={
                                                                    //     el.fedit == undefined ? true : false
                                                                    // }
                                                                    onChange={(e, data) =>
                                                                        this.changeCell(data, el, i)
                                                                    }
                                                                />
                                                            </Table.Cell>
                                                            <Table.Cell
                                                                style={{ padding: "0px 0px" }}
                                                                textAlign="center"
                                                            >
                                                                {reasonsDet.length == i + 1 ? (
                                                                    <Form.Checkbox
                                                                        value={el.FDELETED}
                                                                        name="FDELETED"
                                                                        checked={el.FDELETED == "T"}
                                                                        onChange={(e, data) =>
                                                                            this.changeCell(data, el, i)
                                                                        }
                                                                        onKeyDown={e => {
                                                                            e.preventDefault();
                                                                            if (e.keyCode === 9) this.add();
                                                                        }}
                                                                    />
                                                                ) : (
                                                                        <Form.Checkbox
                                                                            value={el.FDELETED}
                                                                            name="FDELETED"
                                                                            checked={el.FDELETED == "T"}
                                                                            onChange={(e, data) =>
                                                                                this.changeCell(data, el, i)
                                                                            }
                                                                        />
                                                                    )}
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    );
                                                })}
                                            </Table.Body>
                                        </Table>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </>
        );
    }
}

const mapStatetoProps = state => {
    return {
        typeDet: state.userTypeList
    };
};
export default connect(
    mapStatetoProps,
    {
        getUserType, saveusertypes
        , changeDet, showError, addRow
    }
)(CreateUserType);
