import React, { useState } from 'react';

function LoginForm({ handleLogin }) {
  // Define state for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    // Call the handleLogin function from App.js with username and password
    if (username && password) {
      handleLogin(username, password);
    } else {
      setErrorMessage("Please fill in both fields.");
    }
  };

  return (
    <section id="loginSection">
      <h2>User Login</h2>
      <form id="loginForm" onSubmit={onSubmit}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit"><b>Login</b></button>
        {errorMessage && <p id="loginError" className="error-message">{errorMessage}</p>}
      </form>
      <button id="showSignupBtn">Don't have an account? Sign Up</button>
    </section>
  );
}

export default LoginForm;
