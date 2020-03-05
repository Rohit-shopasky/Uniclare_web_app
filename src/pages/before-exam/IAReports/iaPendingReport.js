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
class IaPendingReport extends Component {
    state = {
        frmSubmit: false,
        rftype: "PDF",
        fcolfrom: "0",
        fcolto: "ZZZZ",
        fdegfrom: "0",
        fdegto: "ZZZZ",
        fdeggrpfrom: "",
        fdeggrpto: "",
        reportType: "Regnowise",
    };

    handleChange = (e, data) => {
        if (data.name != "reportType")
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
            fdegto,
            fdeggrpfrom,
            fdeggrpto,

        } = this.state;




        reportType == "Regnowise" ?
            window.open(
                ReportAPI +
                "iaPendingReportRegNoWise" +
                "&univcode=" +
                fcuruniv +
                "&fdeggrpfrom=" +
                fdeggrpfrom +
                "&fdeggrpto=" +
                fdeggrpto +
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
            ) : window.open(
                ReportAPI +
                "IAPendingDetails" +
                "&univcode=" +
                fcuruniv +
                "&fdeggrpfrom=" +
                fdeggrpfrom +
                "&fdeggrpto=" +
                fdeggrpto +

                "&fcollfrom=" +
                fcolfrom +
                "&fcollto=" +
                fcolto +
                "&fdegfrom=" +
                fdegfrom +
                "&fdegto=" +
                fdegto,
                "_blank"
            )
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

    componentDidMount = () => {
        const { fdeggrp, fcuruniv } = this.props.user;
        this.setState({ fdeggrpfrom: fdeggrp, fdeggrpto: fdeggrp });

    }


    handleFromChange = (e, data) => {
        // console.log("value", e.target.name, e.target.value);
        let name = e.target.name;
        let value = e.target.value;
        if (name == "fdegfrom" || name == "fcolfrom" || name == "fdeggrpfrom") {
            if (name == "fdegfrom")
                value == "0" ? this.setState({ fdegto: "ZZZZ" }) : this.setState({ fdegto: value })
            if (name == "fcolfrom")
                value == "0" ? this.setState({ fcolto: "ZZZZ" }) : this.setState({ fcolto: value })
            if (name == "fdeggrpfrom")
                value == "0" ? this.setState({ fdeggrpto: "ZZZZ" }) : this.setState({ fdeggrpto: value })

        }


    }

    renderHeader = () => {
        return (
            <Card.Header style={{ display: "flex" }}>
                <h3>IA Marks Pending Report</h3>
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
            fdeggrpfrom,
            fdeggrpto,
        } = this.state;


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

        const reporttypeOptions = [
            { value: "Regnowise", text: "IA Pending Report (Regnowise)" },
            { value: "Detail", text: "IA Pending Report (Detail)" }

        ];

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

                                    <Form.Field>
                                        <label>Report Type</label>
                                        <Dropdown
                                            placeholder="Select Report Type"
                                            name="reportType"
                                            value={reportType}
                                            selection
                                            search
                                            options={reporttypeOptions}
                                            onChange={this.handleChange}
                                        />
                                    </Form.Field>
                                    <Form.Group>
                                        <Form.Input
                                            placeholder="From"
                                            value={fdeggrpfrom}
                                            width={8}
                                            name="fdeggrpfrom"
                                            onChange={this.handleChange}
                                            onBlur={this.handleFromChange}

                                            maxLength="5"
                                            label="Degree Group Range"
                                        />
                                        <Form.Input
                                            placeholder="To"
                                            name="fdeggrpto"
                                            value={fdeggrpto}
                                            width={8}
                                            onChange={this.handleChange}
                                            maxLength="5"
                                            style={{ marginTop: "1.6em" }}
                                        />
                                    </Form.Group>

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
)(IaPendingReport);
