import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    setUsername("");
    setPassword("");
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });

      console.log('Login success:', response.data);
      // Store the token to local storage
      localStorage.clear();
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      navigate('/CreateTodo');
      
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid username or password');
      // Set the headers Authorization access token
      axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      {error && <Alert severity="error">{error}</Alert>}
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-field">
          <TextField
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="form-field">
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="button-group">
          <Button onClick={handleSignupRedirect} variant="contained">
            Signup
          </Button>
          <Button type="submit" color="success" variant="contained">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
