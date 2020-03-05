import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';

export default class CombGrid extends Component {
  render() {
		const combination = this.props.combs;
    return (
			<Table celled padded>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell style={{width: '5%'}} singleLine textAlign="center">Sl. No.</Table.HeaderCell>
						<Table.HeaderCell style={{width: '10%'}} textAlign="center">Comb. Code</Table.HeaderCell>
						<Table.HeaderCell textAlign="center">Combination Description</Table.HeaderCell>
						<Table.HeaderCell style={{width: '20%'}} textAlign="center">Action</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{ combination.map((comb, i)=>{ 
						return (<Table.Row key={i}>
						<Table.Cell textAlign="center">
								{ i+1 }
						</Table.Cell>
						<Table.Cell textAlign="center" singleLine>{ comb.fcombcode }</Table.Cell>
						<Table.Cell>
							{ comb.fcombdesc }
						</Table.Cell>
						<Table.Cell textAlign='center'>
							<Button size='mini' onClick={() => this.props.show(true, true, comb.fcombcode )} color="black" icon='pencil' content="Edit"/> 
							<Button size='mini' color="red" icon='trash' content="Delete" />
						</Table.Cell>
					</Table.Row>);
						} ) } 
				</Table.Body>
			</Table>
    )
  }
}
