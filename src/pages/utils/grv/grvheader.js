import React, { Component } from 'react';
import { Segment, Card, Icon, Header, Image, } from 'semantic-ui-react';


class GrvHeader extends Component {
  state = {}

  render() {
    const header = this.props.header;
    const items = [
      {
        header: `${header.funivshort} - ${header.funivname}`,
        description: `Contact: ${header.fgrvmobile} | Reg. No.: ${header.fregno} | Name: ${header.fgrvfrom} | Email: ${header.fgrvemail}`,
        meta: `Grvid: ${header.fgrvid} | UnivCode: ${header.funivcode}`,
      }
    ]
    return (
      <div>
        <Card position="right" color='violet' style={{ position: 'fixed' }} >
          <Card.Content>
          <Header as='h3'>Header</Header>
            <Header as='h4' icon textAlign='center'>
              <Image circular size="mini" style={{ width: '85px', margin: '1rem auto' }} src={`../../../../../assets/img/logos/${header.funivshort}_logo.jpg`} />
              <Header.Content>{`${header.funivcode} - ${header.funivshort}`}</Header.Content>
            </Header>
            <p>Univ. Name: <b>{header.funivname}</b></p>
            <p>Grv ID: <b>{header.fgrvid}</b></p>
            <p>Reg. No.: <b>{header.fregno}</b></p>
            <p>Name: <b>{header.fgrvfrom}</b></p>
            <p>Contact: <b>{header.fgrvmobile}</b></p>
            <p>Email: <b>{header.fgrvemail}</b></p>
          </Card.Content>
        </Card>

      </div>
    );
  }
}

export default GrvHeader;