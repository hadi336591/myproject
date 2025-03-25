import { useState, useEffect, useContext } from 'react';
import { 
  Container, Typography, Button, Box, TextField, Paper, 
  Grid, CircularProgress, Alert, Divider, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, Collapse, Dialog, DialogContent
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';
import { AuthContext } from '../context/AuthContext';
import SafepayCheckout from '../components/SafepayCheckout';

const DrawPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [applicationId, setApplicationId] = useState('');
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
  const [safepayCheckoutUrl, setSafepayCheckoutUrl] = useState('');
  const [showSafepayCheckout, setShowSafepayCheckout] = useState(false);

  useEffect(() => {
    // Get application ID from session storage
    const storedId = sessionStorage.getItem('drawApplicationId');
    if (!storedId) {
      setError('No application found. Please submit an application first.');
    } else {
      setApplicationId(storedId);
    }
    
    // Check if user is logged in
    if (!auth) {
      navigate('/login');
    }

    // Check for Safepay redirect
    const urlParams = new URLSearchParams(location.search);
    const status = urlParams.get('status');
    const orderId = urlParams.get('order_id');
    
    if (status === 'success' && orderId) {
      // Verify the payment with backend
      verifyPayment(orderId);
    } else if (status === 'cancelled') {
      setError('Payment was cancelled. Please try again.');
    }
  }, [auth, navigate, location.search]);

  const verifyPayment = async (orderId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('safepayToken');
      
      const response = await fetch('http://localhost:5000/api/payment/safepay/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          token,
          applicationId: orderId
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Payment successful! ' + (data.drawResult || ''));
        
        // Clear application ID from session storage
        sessionStorage.removeItem('drawApplicationId');
        localStorage.removeItem('safepayToken');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(data.message || 'Payment verification failed');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setError('An error occurred while verifying your payment');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSafepayPayment = async () => {
    if (!applicationId) {
      setError('No application found');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/payment/safepay/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          applicationId,
          returnUrl: window.location.href.split('?')[0] // Current URL without query params
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.checkoutUrl) {
        // Store token for verification after redirect
        localStorage.setItem('safepayToken', data.token);
        
        // Open Safepay checkout
        setSafepayCheckoutUrl(data.checkoutUrl);
        setShowSafepayCheckout(true);
      } else {
        setError(data.message || 'Failed to create payment session');
      }
    } catch (error) {
      console.error('Error creating Safepay session:', error);
      setError('An error occurred while setting up the payment');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!applicationId) {
      setError('No application found');
      return;
    }
    
    if (paymentMethod === 'safepay') {
      handleSafepayPayment();
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/payment/draw-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          applicationId,
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
        setSuccess('Payment successful! ' + (data.drawResult || ''));
        
        // Clear application ID from session storage
        sessionStorage.removeItem('drawApplicationId');
        
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

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <BackButton />
      </Container>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            Lucky Draw Payment
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            Please pay 3000 PKR to join the lucky draw and get a chance to win free visa processing.
          </Typography>
          
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
              <FormControlLabel value="safepay" control={<Radio />} label="Safepay (Recommended)" />
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
            
            {/* Safepay Form */}
            <Collapse in={paymentMethod === 'safepay'}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Pay securely using Safepay - Pakistan's trusted payment gateway.
                  <br />
                  You'll be redirected to Safepay's secure checkout page.
                </Alert>
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <img 
                    src="https://getsafepay.com/wp-content/uploads/2023/03/safepay-logo-1.png" 
                    alt="Safepay" 
                    style={{ height: '40px' }} 
                  />
                </Box>
              </Box>
            </Collapse>
            
            <Button
              variant="contained"
              onClick={handlePayment}
              disabled={loading}
              fullWidth
              size="large"
              sx={{ mt: 2, py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Pay 3000 PKR & Join Draw'}
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />

      {/* Safepay Checkout Dialog */}
      <Dialog 
        open={showSafepayCheckout} 
        onClose={() => setShowSafepayCheckout(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogContent sx={{ p: 0, height: '600px' }}>
          <SafepayCheckout checkoutUrl={safepayCheckoutUrl} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DrawPayment;