import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getGrvList, getGrv } from "../../../actions/utils/grv";
import Grvdet from "./grvdet";
import React, { Component, createRef } from "react";
import TimeAgo from "react-timeago";
import { Grid, Item, Segment, Button, Card } from "semantic-ui-react";

class Grievance extends Component {
  state = { grvdet: false, curgrv: "" };
  contextRef = createRef();

  componentDidMount() {
    this.props.getGrvList("reply");
    this.setState({ grvdet: false });
  }

  grvForm = e => {
    this.props.getGrv(e);
    this.setState({ grvdet: true, curgrv: e });
  };

  renderHeader = () => {
    return (
      <Card.Header style={{ display: "flex", padding: "1em 1em" }}>
        <h3>Grievances</h3>
        <div className="ml-auto">
          <Button basic color="black" icon="refresh" content="Reload" />
          <Link to="/dashboard">
            <Button basic color="red" content="Exit" icon="home" />
          </Link>
        </div>
      </Card.Header>
    );
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card fluid style={{ minHeight: "82vh" }}>
          {this.renderHeader()}
          <Card.Content>
            <Grid centered columns={2} style={{ margin: "auto" }}>
              <Grid.Column width={4} style={{ paddingRight: "0em" }}>
                <Segment
                  size="small"
                  position="left"
                  style={{
                    width: "250px",
                    overflowY: "scroll",
                    height: "68vh",
                    position: "absolute"
                  }}
                >
                  <Item.Group divided>
                    {this.props.grvlst.map((el, i) => {
                      return (
                        <Item key={i}>
                          <Item.Content>
                            <Item.Header
                              as="a"
                              onClick={() => this.grvForm(el.fgrvid)}
                            >
                              {el.fgrvid} - {el.fgrvsub}
                            </Item.Header>
                            <Item.Meta>By {el.fgrvuser}</Item.Meta>
                            <TimeAgo date={`${el.fgrvdate}`} />
                          </Item.Content>
                        </Item>
                      );
                    })}
                  </Item.Group>
                </Segment>
              </Grid.Column>

              <Grid.Column width={12} style={{ paddingLeft: "0em" }}>
                {this.state.grvdet ? (
                  <Segment
                    style={{
                      maxHeight: "68vh",
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
              </Grid.Column>
            </Grid>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    grvlst: state.grvlst,
    grv: state.grv,
    grv_det: state.grv_det
  };
};

export default connect(
  mapStateToProps,
  {
    getGrvList,
    getGrv
  }
)(Grievance);
