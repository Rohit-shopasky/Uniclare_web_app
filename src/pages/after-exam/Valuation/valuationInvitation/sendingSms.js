// import React, { Component } from 'react';
// import { Divider, Table, Input, Form } from 'semantic-ui-react';
// import '../../../index.css';

// class SendingSms extends Component {
//     state = {
//         sdata: false,
//         sendingsmsdet: [],
//         searchVal: "",
//         template: false,
//         custom: false,
//     }

//     componentDidMount() {
//         this.setState({ sendingsmsdet: this.props.smsData });
//         console.log('this.props.smsData', this.props);

//     }
//     componentDidUpdate(prevProps) {
//         if (this.props.smsData !== prevProps.smsData) {
//             this.setState({ sendingsmsdet: this.props.smsData });
//             console.log('this.props.smsData', this.props.smsData);
//         }
//     }

//     searchTable = (e, data) => {
//         const string = data.value;
//         const searchPrbatch = this.props.smsData.filter(o => Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
//         this.setState({ sendingsmsdet: searchPrbatch, searchVal: data.value });
//     }


//     render() {
//         const data = this.state.sendingsmsdet;
//         console.log("smsData", data);
//         return (
//             <div >
//                 <Divider />
//                 <div style={{
//                     marginBottom: '1em', backgroundColor: 'white'
//                 }} className="stick">
//                     <Input icon='search' fluid placeholder='Search...' onChange={this.searchTable} value={this.state.searchVal} style={{ fontSize: '1.1em' }} />
//                 </div>
//                 <div>
//                     <Form >
//                         <Form.Group>
//                             <Radio
//                                 label='Template SMS'
//                                 name='template'
//                                 value={template}
//                                 checked={this.state.template}
//                                 onClick={this.handleTemplate}
//                             />
//                             <Radio
//                                 label='Custom SMS'
//                                 name='custom'
//                                 value={custom}
//                                 style={{ marginLeft: '2%' }}
//                                 checked={this.state.custom}
//                                 onClick={this.handleCustom}
//                             />
//                         </Form.Group>
//                         {this.state.custom ? (
//                             <div>
//                                 <Form.Field width={11} height={200}>
//                                     <Form.TextArea
//                                         label="Type your message here..."
//                                         placeholder="Message"
//                                         value={message}
//                                         name="message"
//                                         onChange={this.handleChange}
//                                     />
//                                 </Form.Field>
//                                 <Form.Field>
//                                     <Button
//                                         onClick={this.handleMessage}
//                                         basic
//                                         color="blue"
//                                         icon="send"
//                                         content="Send"
//                                     />
//                                 </Form.Field>
//                             </div>
//                         ) : null}
//                         {this.state.template ? (
//                             <div>
//                                 <Form.Field width={11}>

//                                 </Form.Field>
//                                 <Form.Field width={11}>
//                                     <Form.TextArea

//                                         defaultValue="dsdsdsdsds"
//                                         onChange={(e) => {
//                                             console.log("e", e, e.target.value)
//                                         }}

//                                         name="message"
//                                     // onChange={this.handleChange}
//                                     />
//                                 </Form.Field>
//                                 <Form.Field>
//                                     <Button
//                                         onClick={this.handleMessage}
//                                         basic
//                                         color="blue"
//                                         icon="send"
//                                         content="Send"
//                                     />
//                                 </Form.Field>
//                             </div>
//                         ) : null}
//                     </Form>
//                 </div>
//             </div>)
//     }
// }

// export default SendingSms;

