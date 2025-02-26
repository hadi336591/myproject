import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      navigate('/');
    } catch (err) {
      console.log(err);
      alert('Registration failed');
    }
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', height: '100vh', alignItems: 'center' }}>
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography variant="h4" fontWeight="bold">Your Gateway to Global Travel</Typography>
        <Typography mt={2}>
          Join thousands of satisfied travelers who trust VisaEase for their visa applications. Apply with confidence and participate in our exclusive lucky draw program.
        </Typography>
      </Box>
      <Box sx={{ width: 400, p: 4, border: '1px solid #ddd', borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold">Welcome to VisaEase</Typography>
        <Typography color="textSecondary">Your trusted partner for visa applications and services</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} margin="normal" required />
          <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" required />
          <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" required />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Register</Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;