/**
*
* ItemTable
*
*/

import React from 'react';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import { Table } from 'react-bootstrap';
import PropType from 'prop-types';
// import messages from './messages';

class ItemTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props); // headervals len should = todisplay
    this.headerVals = Object.keys(this.props.data[0]);
    this.header = this.headerVals.map((val) => <th>{val}</th>);
    this.toDisplay = this.props.data.map((obj) => (
      <tr>{ this.headerVals.map((val) => <td>{obj[val] || ''}</td>)}</tr>
    )
    );
  }
  render() {
    return (
      <Table>
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
  data: PropType.array,
};

export default ItemTable;
