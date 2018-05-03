/**
*
* LoginCard
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Well, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

class LoginCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.results = {};
    this.confirm = null;
    this.submit = this.submit.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      toggle: 'Register',
      current: 'Login',
    };
  }
  changeForm() {
    if (this.state.toggle === 'Register') {
      this.setState({ toggle: 'Login', current: 'Register' });
    } else {
      this.setState({ toggle: 'Register', current: 'Login' });
    }
  }
  handleChange() {
    const password = this.results.password.value;
    const confirmPassword = this.confirm.value;
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords Don't Match");
    } else {
      confirmPassword.setCustomValidity('');
    }
  }
  submit(refs) {
    const formResults = (this.state.current === 'Login') ? {
      username: refs.username.value,
      password: refs.password.value,
    } : {
      username: refs.username.value,
      password: refs.password.value,
      firstName: refs.firstName.value,
      lastName: refs.lastName.value,
    };
    const formType = (this.state.current === 'Login') ? 'login' : 'register';
    this.props.handler(formType, formResults);
  }
  render() {
    const loginForm = (
      <FormGroup>
        <ControlLabel>Username</ControlLabel>
        <FormControl type="email" name="username" placeholder="example@example.com" inputRef={(ref) => { this.results.username = ref; }} required />
        <ControlLabel>Password</ControlLabel>
        <FormControl type="password" name="password" placeholder="**********" inputRef={(ref) => { this.results.password = ref; }} required />
      </FormGroup>);

    const registrationForm = (
      <FormGroup>
        <ControlLabel>Username</ControlLabel>
        <FormControl type="email" name="username" placeholder="example@example.com" inputRef={(ref) => { this.results.username = ref; }} required />
        <ControlLabel>Password</ControlLabel>
        <FormControl type="password" id="password" name="password" placeholder="**********" inputRef={(ref) => { this.results.password = ref; }} required />
        <ControlLabel>Confirm Password</ControlLabel>
        <FormControl onChange={this.handleChange} id="confirmPassword" type="password" name="password" placeholder="**********" inputRef={(ref) => { this.confirm = ref; }} required />
        <ControlLabel>First Name</ControlLabel>
        <FormControl type="text" name="firstName" placeholder="John" inputRef={(ref) => { this.results.firstName = ref; }} required />
        <ControlLabel>LastName</ControlLabel>
        <FormControl type="text" name="lastName" placeholder="Doe" inputRef={(ref) => { this.results.lastName = ref; }} required />
      </FormGroup>);

    const form = (this.state.toggle === 'Register') ? loginForm : registrationForm;

    return (
      <div>
        <Well bsSize="small">
          <form onSubmit={(evt) => { evt.preventDefault(); this.submit(this.results); }}>
            { form }
            <Button type="submit" bsStyle="primary">Submit</Button>
            <br />
            <br />
            <Button bsStyle="link" onClick={() => this.changeForm()}>Click here to {this.state.toggle}</Button>
          </form>
        </Well>
      </div>
    );
  }
}

LoginCard.propTypes = {
  handler: PropTypes.func.isRequired,
};

export default LoginCard;
