import React, { useState } from 'react';

function SignupForm({ handleSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSignup(username, password);  // Call the signup handler passed from App.js
    setUsername(''); // Clear the form
    setPassword(''); // Clear the form
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
