import React, { Component } from "react";
import {
    Card,
    Form,
    Divider,
    Dropdown,
    Button
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { showError, fetchUnivs } from "../../../actions";
import { connect } from "react-redux";
import InputMask from "react-input-mask";
import {
    getUserType
} from "../../../actions/utils/createUser";
import { ReportAPI } from "../../../apis/consts";

class UserTypeReport extends Component {
    state = {
        fchndate: false,
        usertype: [],
        funivcode: "",
        fregnofrm: "",
        fregnoto: "",
        fdegfrm: "",
        fdegto: "",
        fexmto: "",
        fexmfrm: "",
        fdatefrm: "",
        fdateto: "",
        open: false
    };
    async componentDidMount() {
        await this.props.fetchUnivs()
        await this.props.getUserType('EditUser');

    }

    handleChange = (e, data) => {

        switch (data.type) {
            case "text":
                this.setState({ [data.name]: data.value });
                return;
            default:
                this.setState({ [data.name]: data.value });
                return;
        }
    };

    handleChangedate = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = () => {
        const {
            funivcode,
            usertype,
            fcollfrm,
            fcollto,
            fdegfrm,
            fdegto,
            fexmto,
            fexmfrm
        } = this.state;
        const { fyear, fexamtype, fexamrange, fdeggrp } = this.props.degdet;

        if (fdeggrp === "") {
            const error = { header: "Error", content: "Select Degree Group" };
            this.props.showError(error);
            return;
        }
        if (fcollfrm === "") {
            const error = { header: "Error", content: "Enter College Range" };
            this.props.showError(error);
            return;
        }

        if (fdegfrm === "") {
            const error = { header: "Error", content: "Enter Degree range" };
            this.props.showError(error);
            return;
        }
        if (fexamrange === "") {
            const error = { header: "Error", content: "Enter Exam Range" };
            this.props.showError(error);
            return;
        }

        if (usertype === "") {
            const error = { header: "Error", content: "Select User Type" };
            this.props.showError(error);
            return;
        }
        this.setState({ fchndate: true });
    };

    handleReport = () => {
        const {
            fregnofrm,
            fregnoto,
            usertype, funivcode
        } = this.state;
        console.log("DETAILS", fregnofrm,
            fregnoto,
            usertype.join("*"), funivcode)

        if (true) {
            if (usertype.length === 0 || funivcode === "") {
                const error = { header: "Error", content: "Please select University and User Type." };
                this.props.showError(error);
                return;
            } else {
                var userTypeStr = usertype.join("*")
            }

            if (fregnofrm === "" || fregnoto === "") {
                const error = { header: "Error", content: "Enter Register Range" };
                this.props.showError(error);
                return;
            }
        }

        window.open(
            ReportAPI + "userTypeListReport" +
            // rformat +
            "&univcode=" +
            this.props.univcode +
            "&fregnofrom=" +
            fregnofrm +
            "&fregnoto=" +
            fregnoto +
            "&funivcode=" +
            funivcode +
            "&fusertype=" +
            userTypeStr,
            "_blank"
        );
    };

    render() {
        const {
            usertype, funivcode,
            fregnofrm,
            fregnoto,
            fdegfrm,
            fdegto,
            fexmto,
            fexmfrm,
            fchndate,
            fdatefrm,
            fdateto,
            open,
            size
        } = this.state;
        let univsOpt = this.props.univs.map((el, i) => {
            return {
                key: i,
                value: el.funivcode,
                text: `${el.funivcode} - ${el.funivname}`
            };
        });

        let typeList = this.props.userTypeList.map((el, i) => {
            return {
                key: i,
                value: el.FUSERTYPE,
                text: `${el.FUSERTYPE} - ${el.FTYPEDESC}`
            };
        });

        return (
            <div className="animated fadeIn">
                <Card fluid>
                    <Card.Content>
                        <Card.Header style={{ display: "flex" }}>
                            <h4>User Type Report</h4>
                            <div className="ml-auto">
                                <Button
                                    basic
                                    color="blue"
                                    onClick={this.handleReport}
                                    content="Report"
                                    icon="file"
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
                        <Card.Description style={{ overflowY: "auto", height: "69vh" }}>
                            <div className="col-md-7 col-lg-7 col-sm-12">
                                <Form>
                                    <Form.Field width={10}>
                                        <label>University</label>
                                        <Dropdown
                                            placeholder="Select University"
                                            search
                                            selection
                                            name="funivcode"
                                            value={funivcode}
                                            options={univsOpt}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Field width={10}>
                                        <label>User Type</label>
                                        <Dropdown
                                            placeholder="Select User Type"
                                            search
                                            selection
                                            multiple
                                            name="usertype"
                                            value={usertype}
                                            options={typeList}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Group>
                                        <Form.Field width={5}>
                                            <Form.Input
                                                placeholder="From"
                                                name="fregnofrm"
                                                value={fregnofrm}
                                                onChange={this.handleChange}
                                                maxLength="4"
                                                label="Register No. Range"
                                            />
                                        </Form.Field>
                                        <Form.Field width={5}>
                                            <Form.Input
                                                placeholder="To"
                                                name="fregnoto"
                                                value={fregnoto}
                                                onChange={this.handleChange}
                                                maxLength="4"
                                                style={{ marginTop: "1.6em" }}
                                            />
                                        </Form.Field>
                                    </Form.Group>
                                    {/* <Button
                                        color="blue"
                                        onClick={this.handleSubmit}
                                        content="Submit"
                                    /> */}
                                </Form>
                            </div>
                        </Card.Description>
                    </Card.Content>
                </Card>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        univs: state.univs,
        userTypeList: state.userTypeList,
        univcode: state.univ.funivcode,

    };
};

export default connect(
    mapStateToProps,
    {
        showError, fetchUnivs,
        getUserType
        // lastDateUpdate
    }
)(UserTypeReport);
