import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Divider,
  Item,
  Segment,
  Header
} from "semantic-ui-react";
import { getGrvList, getGrv } from "../../../actions/utils/grv";
import TimeAgo from "react-timeago";
import { connect } from "react-redux";
import Grvdet from "./grvdet";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { wHeight } from "../../parms";
import NewQuery from "./NewQuery";

class INeedHelp extends Component {
  state = { new: false };

  componentDidMount() {
    this.props.getGrvList("ineedhelp");
  }

  grvForm = e => {
    this.props.getGrv(e);
    this.setState({ grvdet: true, curgrv: e });
  };

  setNewQuery = () => {
    this.setState({ new: true });
  };

  setviewQuery = () => {
    this.setState({ new: false });
  };

  render() {
    const grvlst = this.props.grvlst;
    const wheight = wHeight();
    return (
      <div className="animated fadeIn">
        <Card fluid>
          <Card.Content
            style={{ height: `${wheight * 1.15}px`, overflowY: "auto" }}
          >
            <Card.Header style={{ display: "flex" }}>
              <h3>Grievances</h3>
              <div className="ml-auto">
                <Button
                  basic
                  color="blue"
                  onClick={this.setNewQuery}
                  icon="add square"
                  content="New"
                />
                <Button
                  basic
                  color="blue"
                  onClick={this.setviewQuery}
                  icon="unordered list"
                  content="View All"
                />
                <Link to="/dashboard">
                  <Button basic color="red" content="Exit" icon="home" />
                </Link>
              </div>
            </Card.Header>
            <Divider />
            {!this.state.new ? (
              <div className="row clearfix" style={{ marginRight: "0px" }}>
                <div className="col-md-3">
                  <Segment
                    size="small"
                    position="left"
                    style={{
                      overflowY: "scroll",
                      height: `${wheight}px`
                    }}
                  >
                    <Header as="h3" dividing color="brown">
                      Previous Grievances
                    </Header>
                    <Item.Group divided>
                      {grvlst.map((el, i) => {
                        return (
                          <Item key={i}>
                            <Item.Content>
                              <Item.Header
                                as="a"
                                onClick={() => this.grvForm(el.fgrvid)}
                              >
                                {el.fgrvid} - {el.fgrvsub}
                              </Item.Header>
                              <Item.Meta>
                                <TimeAgo date={`${el.fgrvdate}`} />
                              </Item.Meta>
                            </Item.Content>
                          </Item>
                        );
                      })}
                    </Item.Group>
                  </Segment>
                </div>

                <div className="col-md-9">
                  {this.state.grvdet ? (
                    <Segment
                      style={{
                        maxHeight: `${wheight}px`,
                        overflowY: "scroll",
                        position: "initial",
                        paddingTop: "0em"
                      }}
                    >
                      <Grvdet
                        txns={this.props.grv.txns}
                        header={this.props.grv.header}
                      />
                    </Segment>
                  ) : null}
                </div>
              </div>
            ) : null}

            {this.state.new ? <NewQuery /> : null}
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const styles = {
  editor: {
    border: "1px solid gray",
    minHeight: "6em"
  }
};

const mapStateToProps = state => ({
  grvlst: state.grvlst,
  grv: state.grv,
  grv_det: state.grv_det
});

const mapDispatchToProps = { getGrvList, getGrv };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(INeedHelp);
