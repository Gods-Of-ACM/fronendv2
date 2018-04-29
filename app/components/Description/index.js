/**
*
* Description
* Pass in text object with short and long descriptions as values {short:'', long:''}
*/

import React from 'react';
// import styled from 'styled-components';

import PropType from 'prop-types';
import { Panel, Button } from 'react-bootstrap';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

class Description extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.flip = this.flip.bind(this);
  }
  flip(evt) {
    evt.preventDefault();
    // this.expanded = !this.expanded;
    const old = this.state.expanded;
    this.setState({ expanded: !old });
  }
  render() {
    const { short, long, header } = this.props.text;
    const button = <Button bsStyle="link" onClick={(evt) => { this.flip(evt); }}>{this.state.expanded ? 'Less' : 'More' }</Button>;
    const body = () => {
      if (short && long) { // if both are defined
        return (<Panel.Body>{this.state.expanded ? long : short }{button}</Panel.Body>);
      } else if (!short) {
        return (<Panel.Body>{ long }</Panel.Body>);
      }
      return (<Panel.Body>{ short }</Panel.Body>);
    };
    // const toggleable = short && long;
    return (
      <Panel>
        {header ? <Panel.Heading>{header}</Panel.Heading> : ''}
        {body()}
      </Panel>
    );
  }
}

Description.propTypes = {
  text: PropType.shape({
    short: PropType.string,
    long: PropType.string,
    header: PropType.string,
  }).isRequired,
  // borderless: PropType.bool,
};

export default Description;
