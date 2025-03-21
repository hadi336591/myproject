import { useState, useEffect, useContext } from 'react';
import { 
  Container, Typography, Button, Box, TextField, Paper, 
  Grid, CircularProgress, Alert, Divider, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, Collapse
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';
import { AuthContext } from '../context/AuthContext';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [application, setApplication] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [paymentInfo, setPaymentInfo] = useState({
    // Credit Card
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    // Bank Transfer
    accountNumber: '',
    bankName: '',
    transferDate: '',
    referenceNumber: '',
    // Mobile Payment
    mobileNumber: '',
    transactionId: ''
  });

  useEffect(() => {
    // Check if user is logged in
    if (!auth) {
      navigate('/login', { state: { from: '/payment' } });
      return;
    }
    
    // Fetch user's application
    const fetchApplication = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        
        const data = await response.json();
        
        if (response.ok && data.application) {
          setApplication(data.application);
          
          // If payment is already completed, show success message
          if (data.application.paymentStatus) {
            setSuccess('Payment has already been completed for this application.');
          }
        } else if (!data.application) {
          setError('No applicationfound. Please submit an application form first.');
        } else {
          setError(data.message || 'Failed to fetch application data');
        }
      } catch (err) {
        console.error('Error fetching application:', err);
        setError('An error occurred while fetching your application data');
      }
    };
    
    fetchApplication();
  }, [auth, navigate]);

  const handlePaymentChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePayment = async () => {
    if (!application) {
      setError('No application found');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/payment/visa-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          applicationId: application._id,
          amount: 3000,
          currency: 'PKR',
          paymentMethod,
          paymentInfo: {
            ...paymentInfo,
            paymentMethod
          }
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Payment successful! Your visa application is now complete.');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(data.message || 'Payment failed');
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('An error occurred while processing your payment');
    } finally {
      setLoading(false);
    }
  };

  if (!auth) {
    return null; // Don't render anything if not authenticated (will redirect in useEffect)
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <BackButton />
      </Container>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            Visa Application Payment
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}
          
          {!application ? (
            <Alert severity="info">
              No application found. Please submit an application form first.
              <Button 
                variant="contained" 
                size="small" 
                sx={{ ml: 2 }}
                onClick={() => navigate('/apply')}
              >
                Apply Now
              </Button>
            </Alert>
          ) : application.paymentStatus ? (
            <Box sx={{ textAlign: 'center' }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                Payment has already been completed for this application.
              </Alert>
              <Button 
                variant="contained" 
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            </Box>
          ) : (
            <>
              <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                Please pay 3000 PKR to complete your visa application process.
              </Typography>
              
              <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
                <FormLabel component="legend">Select Payment Method</FormLabel>
                <RadioGroup
                  aria-label="payment-method"
                  name="payment-method"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <FormControlLabel value="creditCard" control={<Radio />} label="Credit/Debit Card" />
                  <FormControlLabel value="bankTransfer" control={<Radio />} label="Bank Transfer" />
                  <FormControlLabel value="easypaisa" control={<Radio />} label="Easypaisa" />
                  <FormControlLabel value="jazzCash" control={<Radio />} label="Jazz Cash" />
                </RadioGroup>
              </FormControl>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Credit Card Form */}
                <Collapse in={paymentMethod === 'creditCard'}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="Name on Card"
                      name="name"
                      value={paymentInfo.name}
                      onChange={handlePaymentChange}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Card Number"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      fullWidth
                      required
                      placeholder="1234 5678 9012 3456"
                    />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Expiry Date (MM/YY)"
                          name="expiry"
                          value={paymentInfo.expiry}
                          onChange={handlePaymentChange}
                          fullWidth
                          required
                          placeholder="MM/YY"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="CVV"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          fullWidth
                          required
                          type="password"
                          placeholder="123"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Collapse>
                
                {/* Bank Transfer Form */}
                <Collapse in={paymentMethod === 'bankTransfer'}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Please transfer 3000 PKR to our bank account and provide the details below:
                      <br />
                      Account Title: Visa Services
                      <br />
                      Account Number: 12345678901234
                      <br />
                      Bank: HBL Bank
                    </Alert>
                    <TextField
                      label="Your Bank Name"
                      name="bankName"
                      value={paymentInfo.bankName}
                      onChange={handlePaymentChange}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Your Account Number"
                      name="accountNumber"
                      value={paymentInfo.accountNumber}
                      onChange={handlePaymentChange}
                      fullWidth
                      required
                    />
                    <TextField
                      label="Transfer Date"
                      name="transferDate"
                      type="date"
                      value={paymentInfo.transferDate}
                      onChange={handlePaymentChange}
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Reference/Transaction Number"
                      name="referenceNumber"
                      value={paymentInfo.referenceNumber}
                      onChange={handlePaymentChange}
                      fullWidth
                      required
                    />
                  </Box>
                </Collapse>
                
                {/* Easypaisa Form */}
                <Collapse in={paymentMethod === 'easypaisa'}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Please send 3000 PKR to our Easypaisa account and provide the details below:
                      <br />
                      Account Title: Visa Services
                      <br />
                      Mobile Number: 03001234567
                    </Alert>
                    <TextField
                      label="Your Mobile Number"
                      name="mobileNumber"
                      value={paymentInfo.mobileNumber}
                      onChange={handlePaymentChange}
                      fullWidth
                      required
                      placeholder="03XX-XXXXXXX"
                    />
                    <TextField
                      label="Transaction ID"
                      name="transactionId"
                      value={paymentInfo.transactionId}
                      onChange={handlePaymentChange}
                      fullWidth
                      required
                    />
                  </Box>
                </Collapse>
                
                {/* Jazz Cash Form */}
                <Collapse in={paymentMethod === 'jazzCash'}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Please send 3000 PKR to our Jazz Cash account and provide the details below:
                      <br />
                      Account Title: Visa Services
                      <br />
                      Mobile Number: 03001234567
                    </Alert>
                    <TextField
                      label="Your Mobile Number"
                      name="mobileNumber"
                      value={paymentInfo.mobileNumber}
                      onChange={handlePaymentChange}
                      fullWidth
                      required
                      placeholder="03XX-XXXXXXX"
                    />
                    <TextField
                      label="Transaction ID"
                      name="transactionId"
                      value={paymentInfo.transactionId}
                      onChange={handlePaymentChange}
                      fullWidth
                      required
                    />
                  </Box>
                </Collapse>
                
                <Button
                  variant="contained"
                  onClick={handlePayment}
                  disabled={loading || application.paymentStatus}
                  fullWidth
                  size="large"
                  sx={{ mt: 2, py: 1.5 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Pay 3000 PKR'}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default PaymentPage;