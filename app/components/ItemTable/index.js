/**
*
* ItemTable: Takes in an array of objects and displays them as a table
*
*/

import React from 'react';

import { Table } from 'react-bootstrap';
import PropType from 'prop-types';

class ItemTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props); // headervals len should = todisplay
    this.headerVals = null;
    this.toDisplay = null;
    this.header = null;
    this.click = this.click.bind(this);
  }
  click(evt) {
    this.props.handleClick(evt.target.id);
  }
  render() {
    this.headerVals = Object.keys(this.props.data[0]);
    this.header = this.headerVals.map((val, idx) => <th key={idx.toString()}>{val}</th>);
    this.toDisplay = this.props.data.map((obj, idx) => (
      <tr key={idx.toString()} onClick={(evt) => this.click(evt)}>{ this.headerVals.map((val, index) => <td id={idx} key={index.toString()}>{obj[val] || ''}</td>)}</tr>
    )
    );
    return (
      <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            {this.header}
          </tr>
        </thead>
        <tbody>
          {this.toDisplay}
        </tbody>
      </Table>
    );
  }
}

ItemTable.propTypes = {
  data: PropType.array.isRequired,
  handleClick: PropType.func.isRequired,
};

export default ItemTable;
