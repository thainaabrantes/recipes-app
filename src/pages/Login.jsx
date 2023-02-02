import React from 'react';
import useLogin from '../hook/useLogin';
import logo from '../images/logo-recipes-app.svg';
import tomato from '../images/tomato.svg';
import '../css/login.css';

function Login() {
  const { form, handlerChange, isFormValid, handlerClick } = useLogin();

  return (
    <section className="login-page">
      <div className="purple-container">
        <img className="logo-img" src={ logo } alt="Logo" />
        <img className="tomato-img" src={ tomato } alt="Tomato" />
      </div>
      <div className="form-container">
        <form className="form-login">
          <h1 className="login-title">Login</h1>
          <label htmlFor="email">
            <input
              className="input-login"
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
              className="input-login"
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
            className="login-botton"
            onClick={ handlerClick }
            type="button"
            disabled={ isFormValid() }
            data-testid="login-submit-btn"
          >
            Enter
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
