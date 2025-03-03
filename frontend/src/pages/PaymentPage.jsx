import { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('applicationData');
    if (data) {
      setApplicationData(JSON.parse(data));
    }
  }, []);

  const handlePaymentChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 3000,
          currency: 'PKR',
          applicationData,
          paymentInfo,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem('applicationData');
        navigate('/dashboard');
      } else {
        setError(data.message || 'Payment failed');
      }
    } catch (err) {
      console.log(err);
      setError('Payment failed');
    }
  };

  if (!applicationData) {
    return (
      <>
        <Navbar />
        <Container sx={{ py: 6, textAlign: 'center' }}>
          <Typography variant="h5">
            No application data found. Please fill out the visa application form first.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/apply')} sx={{ mt: 2 }}>
            Go to Visa Application
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Payment
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 2 }}>
          Please pay 3000 PKR to proceed with your visa application.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Card Number"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentChange}
            required
          />
          <TextField
            label="Expiry Date (MM/YY)"
            name="expiry"
            value={paymentInfo.expiry}
            onChange={handlePaymentChange}
            required
          />
          <TextField
            label="CVV"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handlePaymentChange}
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" onClick={handlePayment}>
            Pay 3000 PKR
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default PaymentPage;
