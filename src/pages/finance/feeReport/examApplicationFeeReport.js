import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    Button,
    Form,
    Dropdown,
    Divider,
    Radio,
    Table
} from "semantic-ui-react";
import { connect } from "react-redux";
import { ReportAPI } from "../../../apis/consts";
import { showError } from "../../../actions";
import InputMask from "react-input-mask";
import { wHeight } from "../../parms";
import moment from "moment";
//import { getWorkDone } from "../actions/after-exam/workdonereport";
class ExamApplicationFeeReport extends Component {
    state = {
        frmSubmit: false,
        rftype: "PDF",
        fcolfrom: "0",
        fcolto: "ZZZZ",
        fdegfrom: "0",
        fdegto: "ZZZZ",
    };

    handleChange = (e, data) => {
        data.value = data.value.toUpperCase();
        switch (data.type) {
            case "text":
                this.setState({ [data.name]: data.value });
            default:
                this.setState({ [data.name]: data.value });
        }
        this.setState({ frmSubmit: false });
    };



    handleReport = () => {
        const { fdeggrp, fcuruniv } = this.props.user;
        const {
            reportType,
            rftype,
            fcolfrom,
            fcolto,
            fdegfrom,
            fdegto
        } = this.state;




        window.open(
            ReportAPI +
            "resultStatsReport" +
            "&univcode=" +
            fcuruniv +
            "&fdeggrp=" +
            fdeggrp +
            "&rftype=" +
            rftype +
            "&fcolfrom=" +
            fcolfrom +
            "&fcolto=" +
            fcolto +
            "&fdegfrom=" +
            fdegfrom +
            "&fdegto=" +
            fdegto,
            "_blank"
        );
    }

    handleChangedate = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCancel = () => {
        this.setState({
            reportType: "",
            reportFormat: "",
            frmDeggrp: ""
        });
    };


    handleFromChange = (e, data) => {
        // console.log("value", e.target.name, e.target.value);
        let name = e.target.name;
        let value = e.target.value;
        if (name == "fdegfrom" || name == "fcolfrom") {
            if (name == "fdegfrom")
                value == "0" ? this.setState({ fdegto: "ZZZZ" }) : this.setState({ fdegto: value })
            if (name == "fcolfrom")
                value == "0" ? this.setState({ fcolto: "ZZZZ" }) : this.setState({ fcolto: value })

        }


    }

    renderHeader = () => {
        return (
            <Card.Header style={{ display: "flex" }}>
                <h3>Exam Application Fee Report (Semesterwise)</h3>
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
        );
    };

    render() {
        const {
            frmSubmit,
            reportType,
            rftype,
            tcodefrom,
            tcodeto,
            vdatefrom,
            vdateto,
            fcolfrom,
            fcolto,
            fdegfrom,
            fdegto,
        } = this.state;

        const reporttypeOptions = [
            { value: "datewWiseValDet", text: "Date Wise Valuation Details" }
        ];
        const formatChars = {
            n: "[0-1]",
            m: "[0-9]",
            e: "[0-3]",
            d: "[0-9]",
            z: "[1-2]",
            y: "[0-9]"
        };
        const wheight = wHeight();
        console.log(reportType, frmSubmit);
        return (
            <div className="animated fadeIn">
                <Card fluid>
                    <Card.Content>
                        {this.renderHeader()}
                        <Divider />
                        <Card.Description
                            style={{ overflowY: "auto", height: `${wheight}px` }}
                        >
                            <div className="col-md-6">
                                <Form>

                                    <Form.Group>
                                        <Form.Input
                                            placeholder="From"
                                            value={fcolfrom}
                                            width={8}
                                            name="fcolfrom"
                                            onChange={this.handleChange}
                                            onBlur={this.handleFromChange}

                                            maxLength="5"
                                            label="College Range"
                                        />
                                        <Form.Input
                                            placeholder="To"
                                            name="fcolto"
                                            value={fcolto}
                                            width={8}
                                            onChange={this.handleChange}
                                            maxLength="5"
                                            style={{ marginTop: "1.6em" }}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Input
                                            placeholder="From"
                                            value={fdegfrom}
                                            width={8}
                                            name="fdegfrom"
                                            onChange={this.handleChange}
                                            onBlur={this.handleFromChange}

                                            maxLength="5"
                                            label="Degree Range"
                                        />
                                        <Form.Input
                                            placeholder="To"
                                            name="fdegto"
                                            value={fdegto}
                                            width={8}
                                            onChange={this.handleChange}
                                            maxLength="5"
                                            style={{ marginTop: "1.6em" }}
                                        />
                                    </Form.Group>


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
        user: state.user,
        data2: state.allworkDOneReport
    };
};
export default connect(
    mapStateToProps,
    {
        showError,

    }
)(ExamApplicationFeeReport);
