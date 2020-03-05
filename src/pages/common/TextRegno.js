import React from 'react';
import { Form, Input } from 'semantic-ui-react';

const TextRegno = (props) => {
  console.log(props);
  return (
    <Form.Field>
      <label>{props.label}</label>
      <Input {...props.input}
        placeholder={props.placeholder} type={props.type} />
    </Form.Field>
  )
}

export default TextRegno;