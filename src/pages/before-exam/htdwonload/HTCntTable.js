import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Divider, Input } from 'semantic-ui-react';
import { showError } from '../../../actions';

class HTCntTable extends Component {

    state = { HTCnt: { header: [], body: [], width: [], align: [] }, searchVal: '', width: [] }

    componentDidMount() {
        this.setState({ HTCnt: this.props.HTCnt, searchVal: '' });
    }

    componentDidUpdate(prevProps) {
        if (this.props.HTCnt.body !== prevProps.HTCnt.body) {
            this.setState({ HTCnt: this.props.HTCnt, searchVal: '' });
        }
    }

    searchTable = (e, data) => {
        const string = data.value;
        const searchPrbatch = this.props.HTCnt.body.filter(o => Object.keys(o).some(k => o[k].toString().toLowerCase().includes(string.toLowerCase())));
        this.setState({ HTCnt: { ...this.state.HTCnt, body: searchPrbatch }, searchVal: data.value });
    }

    buildtr = (el) => {
        let retarr = [];
        const HTCnt = this.state.HTCnt;
        const align = HTCnt.align;
        let i = 0;
        for (var key in el) {
            if (el.hasOwnProperty(key)) {
                retarr.push(<Table.Cell textAlign={align[i]}>
                    {el[key]}
                </Table.Cell>)
            }
            i++;
        }
        return retarr;
    }
    render() {
        const HTCnt = this.state.HTCnt;
        const htheader = HTCnt.header;
        const body = HTCnt.body;
        const width = HTCnt.width;


        const rows = body.map((el, i) => {

            return (<Table.Row key={i}> {this.buildtr(el)}</Table.Row>)
        })
        return (
            <div>
                <Divider />
                <div style={{
                    margin: '1em 1em', backgroundColor: 'white'
                }} className="stick" >
                    <Input fluid icon='search' placeholder='Search...'
                        value={this.state.searchVal} onChange={this.searchTable} />
                </div>
                <div className={this.props.wclass}>
                    <Table className="sticky" celled compact>
                        <Table.Header>
                            <Table.Row>
                                {htheader.map((el, i) => {
                                    return (
                                        <Table.HeaderCell style={{ width: `${width[i]}%` }} textAlign="center">
                                            {el}
                                        </Table.HeaderCell>
                                    );
                                })}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {rows}

                        </Table.Body>
                    </Table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { HTCnt: state.HTCnt };
}

export default connect(mapStateToProps, { showError })(HTCntTable);