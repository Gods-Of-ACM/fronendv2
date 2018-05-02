/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Col, Grid } from 'react-bootstrap';
import LoginCard from 'components/LoginCard';
import Description from 'components/Description';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  login() {
    console.log('hello');
  }

  render() {
    return (
      <div style={{ marginTop: '100px' }}>
        <Grid>
          <Row className="show-grid">
            <Col md={5} mdOffset={1}>
              <Description
                name="dont care"
                text={{
                  header: 'MY NAME IS JOSEPH',
                  long: 'This is a longer Description that you should totally read',
                }}
              />
            </Col>
            <Col md={5} mdOffset={1}>
              <LoginCard handler={() => this.login()} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginpage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
