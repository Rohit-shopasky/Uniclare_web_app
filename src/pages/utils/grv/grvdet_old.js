import React, { Component } from 'react';
import {
  Grid, Icon, Header, Divider, Button, TextArea, Card, Image,
  Label, Form, Checkbox, Message, GridColumn
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getGrv, grvSend, clrGrv } from '../../../actions/grv';
import '../../../index.css';
import TimeAgo from 'react-timeago';
import { Editor, EditorState, RichUtils } from 'draft-js';
import axios from 'axios';
import univadmin from '../../../apis/univadmin';

class Grvdet extends Component {
  state = { reply: "", msgsnt: false, fclose: false, qryclsd: false, file: null, editorState: EditorState.createEmpty(), editor: "" };

  componentDidMount() {
    // this.setState({ msgsnt: false });
    return this.state.msgsnt;
  }
  //text editor
  setEditor = (editor) => {
    this.setState({ editor: editor });
  }
  //text editor on change
  onChange = (editorState) => {
    this.setState({ editorState: editorState });
    console.log("editt", this.state.editorState);
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  handleChange = (e, data) => {

    switch (data.type) {
      case 'checkbox':
        this.setState({ [data.name]: data.checked });
        return;
      default:
        this.setState({ [data.name]: data.value });
        return;
    }
  }
  onItalicClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }

  replyTxt = (evt) => {
    this.setState({ reply: evt.target.value });
  }

  handleFile(evt) {
    let file = evt.target.files[0];
    this.setState({ file: file });
  }

  sendRply = () => {

    const grv = this.props.grv.header;
    let file = this.state.file;
    const formData = new FormData();

    if (!this.state.reply) {
      console.log('no reply typed', this.state.reply);
    }
    else if (!this.state.fclose) {
      this.props.grvSend(this.state.reply, formData);
      this.setState({ reply: "", file: null, msgsnt: true });
      console.log("case nt closed");
    }
    else {
      console.log('close case');
      this.props.grvSend(this.state.reply, formData);
      this.props.clrGrv();
      this.setState({ reply: "", file: null, msgsnt: true, qryclsd: true });
    }

    // formData.append('myFile', file);
    // axios({
    //   url: `${univadmin}` + '/app.php?a=grvSend',
    //   method: 'post',
    //   data: {
    //     fgroup: '250',
    //     fusername: 'raksha',
    //     fgrv: grv,
    //     frply: this.state.reply,
    //     ffile: formData
    //   }
    // }).then((response) => console.log("res", response));

  }
  closeCase = () => {

    this.props.clrGrv();
  }


  render() {
    const styles = {
      editor: {
        minHeight: '6em',
        border: '1px solid black',
        lineHeight: '1.5em',
        fontSize: '1.2em',
        borderRadius: '13px',
        padding: '0.5rem',
      },
      ediBtn: {
        padding: '0.5rem',
      }
    }

    const txns = this.props.txns;
    const header = this.props.header;
    const { fclose, msgsnt, qryclsd } = this.state;

    return (
      <div>
        <div style={{ position: 'sticky', top: '0', zIndex: '2', backgroundColor: 'white' }}>

          <Grid columns={3} style={{ marginTop: '-0.6rem' }}>
            <GridColumn width={2} style={{ padding: '0em' }}>
              <Image circular size="mini" style={{ width: '85px', marginTop: '1rem' }} src={`../../../../../assets/img/logos/${header.funivshort}_logo.jpg`} /><br />
            </GridColumn>

            <Grid.Column width={4}>
              <p >Univ. Code: <b>{header.funivcode} </b></p>
              <p>Reg. No.: <b>{header.fregno}</b></p>
              <p>Grv. ID: <b>{header.fgrvid}</b></p>
            </Grid.Column>

            <Grid.Column width={10}>
              <p>Univ. Name: <b>{header.funivname}</b></p>
              <p>Name: <b>{header.fgrvfrom}</b></p>
              <p>Grv. Date: <b>{header.fgrvdate}</b></p>
              {/* <p>Email: <b>{header.fgrvemail}</b></p> */}
            </Grid.Column>
          </Grid>
          <div style={{ marginLeft: '7.4rem' }}>
            <Header as='h4' style={{ marginBottom: '0rem' }}>Grv. Subject: {this.props.grv.header.fgrvsub}</Header>
            {/* Grv. Message: {this.props.grv.header.fgrvmsg} */}
          </div>
          <Divider />
        </div>
        <Card fluid color='green'>
          <Card.Content style={{ textAlign: 'left' }}>
            <Image floated='left' circular size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
            <Card.Header as='h5'>STUDENT</Card.Header>
            <Card.Meta as='h6'>{header.fgrvdate}</Card.Meta>
            <Card.Description>{this.props.grv.header.fgrvmsg}
              {this.props.grv.header.ffilepath !== null ?
                <a href={`http://studentportal/universitysolutions.in/grv Query Files/${this.props.grv.header.funivcode}_${this.props.grv.header.ffilepath}`} download>{`${this.props.grv.header.funivcode}_${this.props.grv.header.ffilepath}`}</a>
                : null}
            </Card.Description>
          </Card.Content>
        </Card>
        <div style={{ overflowY: 'hidden', paddingBottom: '1em' }}>
          {txns.map((el, i) => {

            if (el.ffromuser == 'STUDENT' || el.ffromuser == 'COLLEGE') {
              return (
                <Card fluid key={i} color='green'>
                  <Card.Content style={{ textAlign: 'left' }}>
                    <Image floated='left' circular size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
                    <Card.Header as='h5'>{el.ffromuser}</Card.Header>
                    <Card.Meta as='h6'>{el.fgrvtrandate}</Card.Meta>
                    <Card.Description>{el.fgrvtranmsg}
                      {el.fgrvtranfile !== "" ? <div> <a href={`http://studentportal/universitysolutions.in/grv Query Files/${el.fgrvtranfile}`} download></a></div> : null}

                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            }
            else {
              return (<Card fluid key={i} color='pink' style={{ marginLeft: 'auto' }}>
                <Card.Content style={{ textAlign: 'right' }}>
                  <Image floated='right' circular size='mini' src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg' />
                  <Card.Header as='h5'>{el.ffromuser}</Card.Header>
                  <Card.Meta as='h6'>{el.fgrvtrandate}</Card.Meta>
                  <Card.Description style={{ marginRight: '3rem' }}>
                    <p>{el.fgrvtranmsg}</p>
                    <div>{el.fgrvtranfile !== "" ?
                      <p><Icon name='paperclip' /><a href={`http://studentportal/universitysolutions.in/grv Query Files/${this.props.grv.header.funivcode}_${el.fgrvtranfile}`} download>{`${this.props.grv.header.funivcode}_${el.fgrvtranfile}`}</a></p> :
                      null}
                    </div>

                  </Card.Description>
                </Card.Content>
              </Card>

              );
            }
          })}
          {qryclsd == true ? <Label color='red' horizontal>
            Issue cleared
      </Label> : null}
        </div>
        <div>
          <TextArea className="form-control" placeholder='Reply Here' value={this.state.reply} onChange={evt => this.replyTxt(evt)} onKeyDown={(e) => e.keyCode === 13 ? this.sendRply() : false}></TextArea>
          {/* <input id="attachFile" name="attachFile" type="file" className="mt-1" onChange={evt => this.handleFile(evt)} /><br /> */}

          {/* <div style={styles.ediBtn}>
            <Button icon="italic" size="mini" onClick={this.onItalicClick} />
            <Button icon="bold" size="mini" onClick={this.onBoldClick} />
          </div>
          <div style={styles.editor}>
            <Editor
              ref={this.setEditor}
              editorState={this.state.editorState}
              onChange={this.onChange('editorState')}
              handleKeyCommand={this.handleKeyCommand}
              onKeyDown={(e) => e.keyCode === 13 ? this.sendRply() : false}
            />
          </div> */}
          <Form.Field control={Checkbox} onChange={this.handleChange}
            checked={fclose === true}
            name="fclose" label='Close Case' />
          <Button size='mini' className="mt-2" content='Reply' color='green' icon='send' onClick={() => this.sendRply()} />

        </div>
        {/* <Button size='mini' className="mt-2" content='Close Case' color='red' icon='bullseye' onClick={() => this.closeCase()} /> */}

        <div className="mt-1">{msgsnt ? <Message floating content={`${this.props.grvSnt}`} color='olive' size='small' /> : null}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log(state.grvSnt);
  return {
    grv: state.grv,
    grvSnt: state.grvSnt
  };
}

export default connect(mapStateToProps, {
  getGrv, grvSend, clrGrv
})(Grvdet);