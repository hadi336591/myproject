import { useState, useContext } from 'react';
import { 
  Container, Typography, Box, TextField, Button, 
  MenuItem, Paper, Grid, CircularProgress, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

const countries = [
  'Spain', 'United States', 'Canada', 'Germany', 'France', 'Türkiye',
  'United Kingdom', 'Australia', 'New Zealand', 'Italy', 'Switzerland'
];

const visaTypes = [
  'Tourist', 'Business', 'Work', 'Student', 'Family Reunion', 'Immigration'
];

const DrawApplicationForm = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    passportNo: '',
    country: '',
    visaType: '',
  });
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [passportScan, setPassportScan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check if user is logged in
  if (!auth) {
    return (
      <>
        <Navbar />
        <Container maxWidth="sm" sx={{ py: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Please log in to apply for the lucky draw
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/login', { state: { from: '/draw-application' } })}
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoChange = (e) => {
    setPassportPhoto(e.target.files[0]);
  };

  const handleScanChange = (e) => {
    setPassportScan(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate form
    if (!passportPhoto || !passportScan) {
      setError('Please upload both passport photo and passport scan');
      setLoading(false);
      return;
    }

    // Create form data for file upload
    const submitData = new FormData();
    submitData.append('fullName', formData.fullName);
    submitData.append('fatherName', formData.fatherName);
    submitData.append('passportNo', formData.passportNo);
    submitData.append('country', formData.country);
    submitData.append('visaType', formData.visaType);
    submitData.append('passportPhoto', passportPhoto);
    submitData.append('passportScan', passportScan);

    try {
      const response = await fetch('http://localhost:5000/api/draw-application', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`
        },
        body: submitData
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Application submitted successfully!');
        // Store application ID for payment
        localStorage.setItem('drawApplicationId', data.applicationId);
        // Redirect to payment page after a short delay
        setTimeout(() => {
          navigate('/draw-payment');
        }, 1500);
      } else {
        setError(data.message || 'Failed to submit application');
      }
    } catch (err) {
      console.error('Error submitting application:', err);
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
            Lucky Draw Application Form
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4 }}>
            Complete this form to enter the lucky draw for a chance to win free visa processing
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name (as on passport)"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Father's Name"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Passport Number"
                  name="passportNo"
                  value={formData.passportNo}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Country for Apply"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  variant="outlined"
                >
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Visa Type"
                  name="visaType"
                  value={formData.visaType}
                  onChange={handleChange}
                  required
                  variant="outlined"
                >
                  {visaTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Passport Size Photo
                </Typography>
                <input
                  accept="image/*"
                  type="file"
                  id="passport-photo"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="passport-photo">
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                  >
                    Upload Photo
                  </Button>
                </label>
                {passportPhoto && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected: {passportPhoto.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Passport Front Page Scan
                </Typography>
                <input
                  accept="image/*,.pdf"
                  type="file"
                  id="passport-scan"
                  onChange={handleScanChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="passport-scan">
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                  >
                    Upload Scan
                  </Button>
                </label>
                {passportScan && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected: {passportScan.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Submit Application'}
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

export default DrawApplicationForm;