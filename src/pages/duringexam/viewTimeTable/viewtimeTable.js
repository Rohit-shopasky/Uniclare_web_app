import React, { Component } from 'react';
import { Divider, Table, Input } from 'semantic-ui-react';
import '../../../index.css';

class ViewTimeTable extends Component {
    state = { tdata: false, timetabledet: [], searchVal: "" }

    componentDidMount() {
        this.setState({ timetabledet: this.props.tblData });
        console.log('this.props.tblData', this.props);

    }
    componentDidUpdate(prevProps) {
        if (this.props.tblData !== prevProps.tblData) {
            this.setState({ timetabledet: this.props.tblData });
            console.log('this.props.tblData', this.props.tblData);
        }
    }

    searchTable = (e, data) => {
        const string = data.value;
        const searchPrbatch = this.props.tblData.filter(o => Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
        this.setState({ timetabledet: searchPrbatch, searchVal: data.value });
    }


    render() {
        const data = this.state.timetabledet;
        console.log("tblData", data);
        // if (data.lenght = 0) {

        // } else {
        return (
            <div >
                <Divider />
                <div style={{
                    marginBottom: '1em', backgroundColor: 'white'
                }} className="stick">
                    <Input icon='search' fluid placeholder='Search...' onChange={this.searchTable} value={this.state.searchVal} style={{ fontSize: '1.1em' }} />
                </div>
                <div>
                    <Table celled padded selectable size='small' color='olive' className="sticky">
                        <Table.Header>
                            <Table.Row textAlign="center">
                                <Table.HeaderCell>Sl.No.</Table.HeaderCell>
                                <Table.HeaderCell>Date of Exam</Table.HeaderCell>
                                <Table.HeaderCell>Timming</Table.HeaderCell>
                                <Table.HeaderCell>Degree</Table.HeaderCell>
                                <Table.HeaderCell>Semester </Table.HeaderCell>
                                <Table.HeaderCell>Q.P.Code</Table.HeaderCell>
                                <Table.HeaderCell>Subject</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {data.map((el, i) => {
                                return (
                                    <Table.Row key={i} style={{ overflow: "hidden" }}>
                                        <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                                        <Table.Cell textAlign="center">{el.fdate}</Table.Cell>
                                        <Table.Cell textAlign="center">{el.ftime}</Table.Cell>
                                        <Table.Cell textAlign="center">{el.fdegree}</Table.Cell>
                                        <Table.Cell textAlign="center">{el.fexamno}</Table.Cell>
                                        <Table.Cell textAlign="center">{el.fqpcode}</Table.Cell>
                                        <Table.Cell textAlign="left">{el.fsubname}</Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table >
                </div>
            </div>)
    }
}

export default ViewTimeTable;

