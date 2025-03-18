import { useState, useContext, useEffect } from 'react';
import { 
  Container, Typography, Button, Box, TextField, Paper, 
  CircularProgress, Alert, Link as MuiLink, Divider
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from || '/dashboard';

  // If user is already logged in, redirect
  useEffect(() => {
    if (auth) {
      if (auth.user.role === 'admin') {
        navigate('/admin');
      } else if (from) {
        navigate(from);
      } else {
        navigate('/dashboard');
      }
    }
  }, [auth, navigate, from]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store auth data in context
        login(data);
        
        // Redirect based on user role or the 'from' path
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else if (from) {
          navigate(from);
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  // Admin login handler
  const handleAdminLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'hadibinkhalid@hotmail.com',
          password: '12345678'
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store auth data in context
        login(data);
        
        // Redirect to admin panel
        navigate('/admin');
      } else {
        setError(data.message || 'Admin login failed');
      }
    } catch (err) {
      console.error('Error during admin login:', err);
      setError('An error occurred during admin login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" sx={{ mb: 3 }}>
            Login
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <MuiLink component={Link} to="/register">
                  Register here
                </MuiLink>
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Admin access:
            </Typography>
            <Button 
              variant="outlined" 
              onClick={handleAdminLogin}
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Login as Admin'}
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default Login;