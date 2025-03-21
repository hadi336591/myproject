import { useState, useContext, useEffect } from 'react';
import { 
  Container, Box, Typography, TextField, Button, MenuItem, 
  Paper, Grid, Divider, CircularProgress, Alert, Stepper,
  Step, StepLabel, StepContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';
import { AuthContext } from '../context/AuthContext';

const VisaApplication = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    visaType: '',
    purpose: '',
    travelDate: '',
    returnDate: '',
    previousVisits: '',
    additionalInfo: ''
  });

  useEffect(() => {
    // Pre-fill email if user is logged in
    if (auth && auth.user) {
      setFormData(prev => ({
        ...prev,
        email: auth.user.email || '',
        fullName: auth.user.name || ''
      }));
    }
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.visaType || !formData.passportNumber) {
      setError('Please fill all required fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/visa-application', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(auth && { 'Authorization': `Bearer ${auth.token}` })
        },
        body: JSON.stringify({
          ...formData,
          userId: auth?.user?.id
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Your application has been submitted successfully!');
        
        // Clear form after successful submission
        setFormData({
          fullName: auth?.user?.name || '',
          email: auth?.user?.email || '',
          phone: '',
          nationality: '',
          passportNumber: '',
          visaType: '',
          purpose: '',
          travelDate: '',
          returnDate: '',
          previousVisits: '',
          additionalInfo: ''
        });
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError(data.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting visa application:', error);
      setError('An error occurred while submitting your application');
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
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            Visa Application Form
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          {!auth && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Please <Button size="small" onClick={() => navigate('/login', { state: { from: '/apply' } })}>login</Button> to your account to track your application status.
            </Alert>
          )}
          
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
          
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="fullName"
                  label="Full Name (as in passport)"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="nationality"
                  label="Nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="passportNumber"
                  label="Passport Number"
                  value={formData.passportNumber}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  name="visaType"
                  label="Visa Type"
                  value={formData.visaType}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  required
                >
                  <MenuItem value="">Select Visa Type</MenuItem>
                  <MenuItem value="Tourist">Tourist</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Immigration">Immigration</MenuItem>
                  <MenuItem value="Family">Family</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  select
                  name="purpose"
                  label="Purpose of Travel"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  required
                >
                  <MenuItem value="">Select Purpose</MenuItem>
                  <MenuItem value="Tourism">Tourism</MenuItem>
                  <MenuItem value="Business Meeting">Business Meeting</MenuItem>
                  <MenuItem value="Conference">Conference</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="Employment">Employment</MenuItem>
                  <MenuItem value="Family Visit">Family Visit</MenuItem>
                  <MenuItem value="Medical Treatment">Medical Treatment</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="travelDate"
                  label="Planned Travel Date"
                  type="date"
                  value={formData.travelDate}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  name="returnDate"
                  label="Planned Return Date"
                  type="date"
                  value={formData.returnDate}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  select
                  name="previousVisits"
                  label="Have you visited this country before?"
                  value={formData.previousVisits}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  name="additionalInfo"
                  label="Additional Information"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  By submitting this form, you agree to our terms and conditions. After submission, you will need to upload required documents and make a payment to complete your application.
                </Typography>
                
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                  sx={{ py: 1.5 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Submit Application'}
                </Button>
              </Grid>
            </Grid>
          </Box>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Application Process
            </Typography>
            <Stepper orientation="vertical">
              <Step active>
                <StepLabel>Submit Application Form</StepLabel>
                <StepContent>
                  <Typography variant="body2">
                    Fill out and submit the visa application form with your personal details.
                  </Typography>
                </StepContent>
              </Step>
              
              <Step>
                <StepLabel>Upload Documents</StepLabel>
                <StepContent>
                  <Typography variant="body2">
                    Upload required documents including passport copy, photos, and supporting documents.
                  </Typography>
                </StepContent>
              </Step>
              
              <Step>
                <StepLabel>Make Payment</StepLabel>
                <StepContent>
                  <Typography variant="body2">
                    Pay the visa processing fee to proceed with your application.
                  </Typography>
                </StepContent>
              </Step>
              
              <Step>
                <StepLabel>Application Review</StepLabel>
                <StepContent>
                  <Typography variant="body2">
                    Our team will review your application and documents.
                  </Typography>
                </StepContent>
              </Step>
              
              <Step>
                <StepLabel>Visa Decision</StepLabel>
                <StepContent>
                  <Typography variant="body2">
                    You will be notified of the visa decision via email.
                  </Typography>
                </StepContent>
              </Step>
            </Stepper>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default VisaApplication;