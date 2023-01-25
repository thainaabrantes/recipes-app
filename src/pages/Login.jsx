import React from 'react';
import useLogin from '../hook/useLogin';

function Login() {
  const { form, handlerChange, isFormValid, handlerClick } = useLogin();

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
          placeholder="Email"
        />
      </label>
      <label htmlFor="password">
        <input
          placeholder="Password"
          value={ form.password }
          data-testid="password-input"
          onChange={ handlerChange }
          type="password"
          name="password"
          id="password"
        />
      </label>
      <button
        onClick={ handlerClick }
        type="button"
        disabled={ isFormValid() }
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
