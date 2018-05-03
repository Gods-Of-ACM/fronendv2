/**
*
* FloatingButton
*
*/

import React from 'react';
// import styled from 'styled-components';

import { Button, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';

class FloatingButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={{ position: 'fixed', bottom: '5vh', right: '5vh', zIndex: 5 }}>
        <form action="http://localhost:3001/search/basic" method="GET" target="_blank">
          <input type="hidden" value={this.props.query} name="q" />
          <input type="hidden" value="true" name="file" />
          <Button type="submit" bsSize="large">
            <Glyphicon glyph="save-file" bsStyle="lg" />
          </Button>
        </form>
      </div>
    );
  }
}

FloatingButton.propTypes = {
  query: PropTypes.string.isRequired,
};

export default FloatingButton;
