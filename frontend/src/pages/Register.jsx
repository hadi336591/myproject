import { useState, useContext } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = Object.fromEntries(new FormData(e.target));
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data);
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.log(err);
      setError('Registration failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Register
      </Typography>
      {error && <Typography color="error" align="center">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField name="name" label="Name" variant="outlined" required />
        <TextField name="email" label="Email" variant="outlined" type="email" required />
        <TextField name="password" label="Password" variant="outlined" type="password" required />
        <Button type="submit" variant="contained">
          Register
        </Button>
        <Typography align="center">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
