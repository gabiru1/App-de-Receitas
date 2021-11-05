import React, { useState } from 'react';
import Input from '../components/Input';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleClick() {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
  }

  const isValidEmail = email.match(/\S+@\S+\.\S+/);
  const minLength = 6;

  return (
    <form>
      <Input
        type="email"
        onChange={ (e) => setEmail(e.target.value) }
        value={ email }
        dataTestID="email-input"
      />
      <Input
        type="password"
        onChange={ (e) => setPassword(e.target.value) }
        value={ password }
        dataTestID="password-input"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleClick }
        disabled={ !(password.length > minLength && isValidEmail) }
      >
        Entrar

      </button>
    </form>
  );
}

export default Login;
