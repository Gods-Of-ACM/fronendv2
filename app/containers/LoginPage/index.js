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
import { login, register } from 'containers/NavBar/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  login(type, data) {
    if (type === 'login') {
      this.props.dispatch(login(data.username, data.password));
    } else {
      this.props.dispatch(register(data.username, data.password, data.firstName, data.lastName));
    }
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
                  header: 'Welcome to ChemMoa',
                  long: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe error facilis debitis deleniti nam ea excepturi. Voluptates impedit nisi provident minus, quaerat in quos. Obcaecati, esse, dicta! Fuga, sunt eum, impedit quos culpa explicabo iusto molestiae laudantium. Illum exercitationem saepe ratione modi quisquam sed magni expedita, fugiat reprehenderit nobis officia.',
                }}
              />
            </Col>
            <Col md={5} mdOffset={1}>
              <LoginCard handler={(type, data) => this.login(type, data)} />
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
