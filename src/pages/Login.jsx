import React from 'react';
import useLogin from '../hook/useLogin';

function Login() {
  const { form, handlerChange } = useLogin();

  return (
    <form>
      <label htmlFor="email">
        <input
          value={ form.email }
          onChange={ handlerChange }
          data-testid="email-input"
          type="email"
          name="email"
          id="email"
        />
      </label>
      <label htmlFor="password">
        <input
          value={ form.password }
          data-testid="password-input"
          onChange={ handlerChange }
          type="password"
          name="password"
          id="password"
        />
      </label>
      <button data-testid="login-submit-btn">Enter</button>
    </form>
  );
}

export default Login;
