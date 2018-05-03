/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Image, Form, FormGroup, FormControl, Button, Col } from 'react-bootstrap';
import { push } from 'react-router-redux';
import styled from 'styled-components';
import logo from 'images/CheMoa_Transparent.png';
import Description from 'components/Description';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.input = null;
  }

  submit() {
    this.props.dispatch(push(`/search?q=${this.input.value}`));
  }

  render() {
    const CenterImage = styled.div`
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0,0,0,0);
    `;

    return (
      <div>
        <Helmet>
          <title>Homepage</title>
          <meta name="description" content="Description of Homepage" />
        </Helmet>

        <CenterImage>
          <Image src={logo} responsive />
        </CenterImage>
        <Col md={8} mdOffset={2}>
          <Description name="ieatcake" innerStyle={{ className: 'text-center' }} text={{ short: 'Justin will write this later', long: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque totam natus exercitationem illo, voluptatibus, ullam molestias reiciendis deserunt, optio officia quam vel. Voluptates quidem nihil dignissimos libero, quaerat dicta! Quia, aperiam, doloremque. Dolorum odio incidunt, rem, doloremque amet delectus beatae nisi rerum eligendi. Neque non sequi optio numquam atque ipsa rerum accusamus magnam perspiciatis, ratione, officiis, eius? Adipisci temporibus ab optio id numquam, deleniti aspernatur modi nisi libero! Laudantium excepturi nesciunt fugit ab facilis porro cupiditate? Molestiae distinctio expedita veritatis illum aliquam saepe doloribus modi natus quae. Sunt, quis. Dolore consequuntur aut autem quis, iure reiciendis eligendi iste molestias incidunt!' }} />
        </Col>
        <Form onSubmit={(evt) => { evt.preventDefault(); this.submit(); }}>
          <FormGroup>
            <Col md={7} mdOffset={2}>
              <FormControl bsSize="large" type="text" placeholder="Search" inputRef={(ref) => { this.input = ref; }} />
            </Col>
            <Col md={2}>
              <Button bsSize="lg" type="submit">Submit</Button>
            </Col>
          </FormGroup>
        </Form>

      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
