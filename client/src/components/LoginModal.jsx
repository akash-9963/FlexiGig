import React, { useState } from 'react';
import axios from 'axios';
import { useStateProvider } from '../context/StateContext';
import { reducerCases } from '../context/constants';

const LoginModal = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, dispatch] = useStateProvider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      dispatch({ type: reducerCases.SET_USER, userInfo: response.data.user });
      closeModal();
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="modal">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default LoginModal;
