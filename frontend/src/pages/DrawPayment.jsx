import { useState, useEffect, useContext } from 'react';
import { 
  Container, Typography, Box, TextField, Button, 
  Paper, Grid, CircularProgress, Alert, Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

const DrawPayment = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [applicationId, setApplicationId] = useState('');
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedId = localStorage.getItem('drawApplicationId');
    if (!storedId) {
      navigate('/draw-application');
    } else {
      setApplicationId(storedId);
    }
  }, [navigate]);

  // Check if user is logged in
  if (!auth) {
    return (
      <>
        <Navbar />
        <Container maxWidth="sm" sx={{ py: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Please log in to proceed with payment
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/login', { state: { from: '/draw-payment' } })}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  const handleChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/payment/draw-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          applicationId,
          paymentInfo
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Payment processed successfully!');
        localStorage.removeItem('drawApplicationId');
        
        // Store draw result for dashboard
        localStorage.setItem('drawResult', JSON.stringify({
          message: data.drawResult,
          isWinner: data.isWinner
        }));
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(data.message || 'Payment failed');
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <BackButton />
      </Container>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Lucky Draw Payment
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 2 }}>
            Complete your payment to enter the lucky draw
          </Typography>
          
          <Box sx={{ 
            backgroundColor: '#f5f5f5', 
            p: 2, 
            borderRadius: 1, 
            mb: 4,
            textAlign: 'center'
          }}>
            <Typography variant="h5" color="primary" gutterBottom>
              3000 PKR
            </Typography>
            <Typography variant="body2">
              Pay the fee to enter the lucky draw for a chance to win free visa processing
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handleChange}
                  required
                  placeholder="1234 5678 9012 3456"
                  inputProps={{ maxLength: 19 }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cardholder Name"
                  name="cardName"
                  value={paymentInfo.cardName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expiry Date (MM/YY)"
                  name="expiry"
                  value={paymentInfo.expiry}
                  onChange={handleChange}
                  required
                  placeholder="MM/YY"
                  inputProps={{ maxLength: 5 }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handleChange}
                  required
                  type="password"
                  inputProps={{ maxLength: 3 }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Pay 3000 PKR & Join Draw'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default DrawPayment;