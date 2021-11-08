import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './Login.css';
import Input from '../components/Input';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleClick() {
    const user = { email };
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/comidas');
  }

  const isValidEmail = email.match(/\S+@\S+\.\S+/);
  const minLength = 6;

  return (
    <div className="containerLogin">
      <form className="boxLogin">
        <Input
          className="InputLogin"
          type="email"
          onChange={ (e) => setEmail(e.target.value) }
          value={ email }
          dataTestID="email-input"
        />
        <Input
          className="InputLogin"
          type="password"
          onChange={ (e) => setPassword(e.target.value) }
          value={ password }
          dataTestID="password-input"
        />
        <button
          type="button"
          className="btnLogin"
          data-testid="login-submit-btn"
          onClick={ handleClick }
          disabled={ !(password.length > minLength && isValidEmail) }
        >
          Entrar

        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
