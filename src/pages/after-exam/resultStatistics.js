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
import { ReportAPI } from "../../apis/consts";
import { showError } from "../../actions";
import InputMask from "react-input-mask";
import { wHeight } from "../parms";
import moment from "moment";
import { getWorkDone } from "../../actions/after-exam/workdonereport";
class ResultStatistics extends Component {
    state = {
        showtable: false,
        frmDeggrp: "",
        reportType: "datewWiseValDet",
        frmSubmit: false,
        rftype: "PDF",
        tcodefrom: "0000",
        tcodeto: "zzzz",
        vdatefrom: moment()
            .subtract(7, "days")
            .format("DD/MM/YYYY"),
        vdateto: moment().format("DD/MM/YYYY"),

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
            tcodefrom,
            tcodeto,
            vdatefrom,
            vdateto
        } = this.state;
        if (fdeggrp === "") {
            const error = { header: "Error", content: "Select Degree Group" };
            this.props.showError(error);
            return;
        }
        // var C = " http://192.168.0.32/univadmin
        //     / app.php ? a = teachWorkDone
        //     & univcode=041 &
        //         deggrp=UG &
        //             tcodefrom=0000
        //                 & tcodeto=zzzz
        //                     & vdatefrom=13 / 11 / 2019 &
        //                         vdateto=20 / 11 / 2019 &
        //                             format=PDF & user=""
        console.log(
            ReportAPI +
            "teachWorkDone" +
            "&univcode=" +
            fcuruniv +
            "&deggrp=" +
            fdeggrp +
            "&tcodefrom=" +
            tcodefrom +
            "&tcodeto=" +
            tcodeto +
            "&vdatefrom=" +
            vdatefrom +
            "&vdateto=" +
            vdateto +
            "&format=PDF",
            this.props.user.fuserid
        );

        if (this.props.user.fcurtype == "600") {
            window.open(
                ReportAPI +
                "teachWorkDone" +
                "&univcode=" +
                fcuruniv +
                "&deggrp=" +
                fdeggrp +
                "&tcodefrom=" +
                this.props.user.fuserid +
                "&tcodeto=" +
                this.props.user.fuserid +
                "&vdatefrom=" +
                vdatefrom +
                "&vdateto=" +
                vdateto +
                "&format=PDF" +
                "&fcollcode=" +
                this.props.user.fcollcode,
                "_blank"
            );
        } else if (parseInt(this.props.user.fcurtype) >= 500) {
            window.open(
                ReportAPI +
                "teachWorkDone" +
                "&univcode=" +
                fcuruniv +
                "&deggrp=" +
                fdeggrp +
                "&tcodefrom=0000" +
                "&tcodeto=ZZZZ" +
                "&vdatefrom=" +
                vdatefrom +
                "&vdateto=" +
                vdateto +
                "&format=PDF" +
                "&fcollcode=" +
                this.props.user.fcollcode,
                "_blank"
            );
        } else {
            window.open(
                ReportAPI +
                "teachWorkDone" +
                "&univcode=" +
                fcuruniv +
                "&deggrp=" +
                fdeggrp +
                "&tcodefrom=0000" +
                "&tcodeto=ZZZZ" +
                "&vdatefrom=" +
                vdatefrom +
                "&vdateto=" +
                vdateto +
                "&format=PDF",
                "_blank"
            );
        }
    };
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
                <h3>Result Statistics</h3>
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
        getWorkDone
    }
)(ResultStatistics);
