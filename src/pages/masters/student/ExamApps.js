import React, { Component } from "react";
import { Item, Label, Segment, Table } from "semantic-ui-react";

export default class ExamApps extends Component {
  render() {
    console.log(this.props.examapps);
    return (
      <div>
        <Item.Group>
          {this.props.examapps.map((el, i) => {
            return (
              <Item key={i}>
                <Item.Image
                  size="tiny"
                  src={`/assets/img/pgimg/${el.fpaymentype}.jpg`}
                />

                <Item.Content>
                  <Item.Header as="a">
                    Application No. - {el.appno}
                    {el.fpaymentstatus.toLowerCase() == "success" ? (
                      <Label color="green" tag>
                        Success
                      </Label>
                    ) : (
                      <Label color="red" tag>
                        Failure
                      </Label>
                    )}
                  </Item.Header>
                  <Item.Meta>Applied on - {el.fdate} </Item.Meta>
                  <Segment.Group horizontal>
                    <Segment>
                      Total Fee : <b>{el.ftotalfee}</b>
                    </Segment>
                    <Segment>
                      Order ID : <b>{el.forderid}</b>
                    </Segment>
                  </Segment.Group>
                  {el.fpaymentstatus.toLowerCase() == "success" ? (
                    <Item.Extra>
                      Recived By : <b>{el.fackuser} </b> on{" "}
                      <b> {el.fackdate} </b>
                    </Item.Extra>
                  ) : null}
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </div>
    );
  }
}
