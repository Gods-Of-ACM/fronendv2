/**
*
* FloatingButton
*
*/

import React from 'react';
// import styled from 'styled-components';

import { Button, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { API_URL } from 'containers/App/constants';

class FloatingButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let param;
    if (this.props.isAdvanced) {
      param = this.props.query.slice(this.props.query.indexOf('=') + 1);
    }

    return (
      (this.props.isAdvanced) ? (
        <div style={{ position: 'fixed', bottom: '5vh', right: '5vh', zIndex: 5 }}>
          <form action={`${API_URL}/search/advanced${this.props.query}`} method="GET" target="_blank">
            <input type="hidden" value={param} name="q" />
            <input type="hidden" value="true" name="file" />
            <Button type="submit" bsSize="large">
              <Glyphicon glyph="save-file" bsStyle="lg" />
            </Button>
          </form>
        </div>
      ) :
      (
        <div style={{ position: 'fixed', bottom: '5vh', right: '5vh', zIndex: 5 }}>
          <form action={`${API_URL}/search/basic`} method="GET" target="_blank">
            <input type="hidden" value={this.props.query} name="q" />
            <input type="hidden" value="true" name="file" />
            <Button type="submit" bsSize="large">
              <Glyphicon glyph="save-file" bsStyle="lg" />
            </Button>
          </form>
        </div>
      )
    );
  }
}

FloatingButton.propTypes = {
  query: PropTypes.string.isRequired,
  isAdvanced: PropTypes.bool.isRequired,
};

export default FloatingButton;
