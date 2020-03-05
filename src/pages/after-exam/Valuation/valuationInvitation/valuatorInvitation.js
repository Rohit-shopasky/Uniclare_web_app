import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  Divider,
  Form,
  Button,
  Dropdown,
  Input,
  Table,
  Checkbox
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  getValInvi,
  changeInvite,
  changeALL,
  sendmessage
} from "../../../../actions/after-exam/valuatorInvitationAct";
import "../../../../index.css";
import { saveInviteData, saveInviteList } from "../../../../actions/index";

var techd = [],
  finaldata1 = [],
  finaldata2 = [],
  finaldata3 = [],
  lastupdate = [];

class ValuatorInvitation extends Component {
  state = {
    trrefs: [],
    pd:
      this.props.newData.length > 0
        ? this.props.newData
        : this.props.NowtableData.taechdet,
    tdata: false,
    valinvidet: [],
    selctAllArray: [],
    particularArray: [],
    searchVal: "",
    all: "notdefined",
    single: "",
    selectArr: []
  };

  componentDidMount() {
    this.setState({ valinvidet: this.props.tblData });
    console.log("this.props.tblData", this.props);
    this.props.sendmessage(this.state.pd);
  }
  componentDidUpdate(prevProps) {
    if (this.props.tblData !== prevProps.tblData) {
      this.setState({ valinvidet: this.props.tblData });
      console.log("this.props.tblData", this.props.tblData);
    }
  }

  async chnageCell2(data, type, finaldata) {
    console.log("forallt", data, type, finaldata);
    await this.props.changeALL(data, finaldata);
  }
  finaldata = async () => {
    console.log("Ssssss", this.props.NowtableData);
    finaldata1 = [];
    finaldata1 = [];
    finaldata2 = [];
    finaldata3 = [];

    this.props.NowtableData.taechdet.map(async (item, index) => {
      const d1 = [...new Set(techd)];
      if (d1.indexOf(index) > -1)
        await finaldata1.push({
          fteachcode: item.fteachcode,
          FTEACHNAME: item.FTEACHNAME,
          FSCALE: item.FSCALE,
          fmobile: item.fmobile,
          femail: item.femail,
          fboard: item.fboard,
          finvited: item.finvited
        });
    });
    this.props.NowtableData.taechdet.map(async item => {
      await finaldata2.push({
        fteachcode: item.fteachcode,
        FTEACHNAME: item.FTEACHNAME,
        FSCALE: item.FSCALE,
        fmobile: item.fmobile,
        femail: item.femail,
        fboard: item.fboard,
        finvited: "F"
      });

      this.props.NowtableData.taechdet.map(async item => {
        await finaldata3.push({
          fteachcode: item.fteachcode,
          FTEACHNAME: item.FTEACHNAME,
          FSCALE: item.FSCALE,
          fmobile: item.fmobile,
          femail: item.femail,
          fboard: item.fboard,
          finvited: "F"
        });
      });
    });

    console.log("finalDats", finaldata1);

    await this.props.saveInviteData(finaldata1);
  };

  async changeCell(data, el, i) {
    techd.push(i);
    console.log("data from table", data, el);

    const new_el = { ...el, finvited: data.checked ? "T" : "F" };

    await this.props.changeInvite(new_el, i, data);
    console.log("tech", [...new Set(techd)]);

    this.finaldata();
  }

  searchTable = (e, data) => {
    const string = data.value;
    const searchPrbatch = this.props.tblData.filter(o =>
      Object.keys(o).some(k =>
        o[k].toLowerCase().includes(string.toLowerCase())
      )
    );
    this.setState({ valinvidet: searchPrbatch, searchVal: data.value });
  };

  render() {
    const FLAG_100 = this.props.user.fcurtype == "100" ? true : false;
    console.log("FLAG_100", FLAG_100);
    var array2 = [];
    console.log("table data", this.props);
    // if (data.lenght = 0) {

    // } else {
    return (
      <div>
        <Divider />
        <div>
          <Table
            celled
            padded
            selectable
            size="small"
            color="olive"
            className="sticky"
          >
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell>Sl.No.</Table.HeaderCell>
                <Table.HeaderCell>Teacher Code</Table.HeaderCell>
                <Table.HeaderCell>Teacher Name</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Mobile Number</Table.HeaderCell>
                <Table.HeaderCell>Email ID</Table.HeaderCell>
                <Table.HeaderCell>Board</Table.HeaderCell>

                <Table.HeaderCell>
                  <input
                    style={{ height: "18px", width: "18px" }}
                    checked={this.state.all == "active" && "checked"}
                    type="checkbox"
                    onClick={async (e, data) => {
                      this.state.all == "active"
                        ? await this.setState({ all: "inactive" })
                        : await this.setState({ all: "active" });

                      // this.chnageCell2(
                      //     data,
                      //     e,
                      //     this.props.NowtableData.taechdet
                      // )
                      if (this.state.all == "inactive") {
                        let h = [];
                        this.state.pd.map(el => {
                          lastupdate = [];
                          console.log("lastupdate", lastupdate);
                          return h.push({
                            fteachcode: el.fteachcode,
                            FTEACHNAME: el.FTEACHNAME,
                            FSCALE: el.FSCALE,
                            fmobile: el.fmobile,
                            femail: el.femail,
                            fboard: el.fboard,
                            finvited: "F"
                          });
                        });
                        console.log("hhhhhhhhhh", h);
                        await this.setState({ pd: h });

                        console.log("pfpfpfpf", this.state.pd);
                        await this.props.sendmessage(this.state.pd);
                      } else {
                        lastupdate = this.state.pd;
                        console.log("lastupdate", lastupdate);
                      }
                      console.log("ss", this.state.all);

                      if (this.state.all == "active") {
                        let h = [];
                        await this.state.pd.map(el => {
                          lastupdate = [];
                          console.log("lastupdate", lastupdate);
                          console.log("cure", h);
                          return h.push({
                            fteachcode: el.fteachcode,
                            FTEACHNAME: el.FTEACHNAME,
                            FSCALE: el.FSCALE,
                            fmobile: el.fmobile,
                            femail: el.femail,
                            fboard: el.fboard,
                            finvited: "T"
                          });
                        });

                        console.log("hhhhhhhhhh", h);
                        await this.setState({ pd: h });

                        console.log("pfpfpfpf", this.state.pd);
                        await this.props.sendmessage(h);
                      }
                    }}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {console.log("before table", FLAG_100, this.state.pd)}
            <Table.Body>
              {this.state.pd.map((el, i) => {
                return (
                  <>
                    {" "}
                    {(FLAG_100 || this.props.user.fdegree == el.fboard) && (
                      <Table.Row key={i}>
                        <Table.Cell textAlign="center">{i + 1}</Table.Cell>
                        <Table.Cell textAlign="center">
                          {el.fteachcode}
                        </Table.Cell>
                        <Table.Cell textAlign="left">
                          {el.FTEACHNAME}
                        </Table.Cell>
                        <Table.Cell textAlign="center">{el.FSCALE}</Table.Cell>
                        <Table.Cell textAlign="center">{el.fmobile}</Table.Cell>
                        <Table.Cell textAlign="left">{el.femail}</Table.Cell>
                        <Table.Cell textAlign="center">{el.fboard}</Table.Cell>
                        <Table.Cell textAlign="center">
                          <div className="ui checkbox">
                            <input
                              type="checkbox"
                              onClick={async () => {
                                await this.setState({
                                  all: "inactive"
                                });
                                console.log("lastupdtae", lastupdate);
                                const ar = this.state.pd;
                                ar[i] = {
                                  fteachcode: el.fteachcode,
                                  FTEACHNAME: el.FTEACHNAME,
                                  FSCALE: el.FSCALE,
                                  fmobile: el.fmobile,
                                  femail: el.femail,
                                  fboard: el.fboard,
                                  finvited: el.finvited == "T" ? "F" : "T"
                                };
                                console.log("afterclcik", ar);
                                console.log("lastupdate", lastupdate);
                                this.setState({ pd: ar });
                                this.props.sendmessage(this.state.pd);
                              }}
                              checked={
                                this.state.all == "active"
                                  ? "checked"
                                  : el.finvited == "T"
                                  ? true
                                  : false
                              }
                            />
                            <label> </label>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    )}{" "}
                  </>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    NowtableData: state.valInvitation,
    saveInvitations: state.saveInvitation,
    user: state.user,
    newData: state.sendMsg
  };
};

export default connect(
  mapStateToProps,
  {
    changeInvite,
    changeALL,
    saveInviteData,
    saveInviteList,
    sendmessage
  }
)(ValuatorInvitation);
