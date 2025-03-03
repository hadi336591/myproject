import { useState, useContext } from 'react';
import { Container, Typography, Button, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';
import { AuthContext } from '../context/AuthContext';

const DrawPage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [error, setError] = useState('');

  const handlePaymentChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleDrawPayment = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 3000,
          currency: 'PKR',
          user: auth.user,
          paymentInfo,
          draw: true,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/dashboard');
      } else {
        setError(data.message || 'Payment failed');
      }
    } catch (err) {
      console.log(err);
      setError('Payment failed');
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <BackButton />
      </Container>
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Lucky Draw Payment
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 2 }}>
          Please pay 3000 PKR to join the lucky draw.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Card Number" name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} required />
          <TextField label="Expiry Date (MM/YY)" name="expiry" value={paymentInfo.expiry} onChange={handlePaymentChange} required />
          <TextField label="CVV" name="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} required />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" onClick={handleDrawPayment}>
            Pay 3000 PKR &amp; Join Draw
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default DrawPage;
