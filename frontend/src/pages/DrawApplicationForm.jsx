import { useState, useContext } from 'react';
import { 
  Container, Box, Typography, TextField, Button, MenuItem, 
  Paper, Grid, CircularProgress, Alert, Divider 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';
import { AuthContext } from '../context/AuthContext';

const countries = [
  'Spain', 'United States', 'Canada', 'Germany', 'France', 'Türkiye'
];

const visaTypes = [
  'Tourist', 'Business', 'Work', 'Student', 'Immigration'
];

const DrawApplicationForm = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form data state
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    passportNo: '',
    country: '',
    visaType: '',
  });
  
  // File state
  const [files, setFiles] = useState({
    passportPhoto: null,
    passportScan: null
  });
  
  // File preview URLs
  const [previews, setPreviews] = useState({
    passportPhoto: null,
    passportScan: null
  });
  
  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    
    if (fileList && fileList[0]) {
      // Update file state
      setFiles({
        ...files,
        [name]: fileList[0]
      });
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(fileList[0]);
      setPreviews({
        ...previews,
        [name]: previewUrl
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!auth) {
      setError('Please log in to submit an application');
      return;
    }
    
    // Validate files
    if (!files.passportPhoto || !files.passportScan) {
      setError('Please upload both passport photo and passport scan');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Create form data for file upload
      const submitData = new FormData();
      
      // Add text fields
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      // Add files
      submitData.append('passportPhoto', files.passportPhoto);
      submitData.append('passportScan', files.passportScan);
      
      // Get token from auth context
      const token = auth.token;
      
      // Submit application
      const response = await fetch('http://localhost:5000/api/draw-application', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Application submitted successfully!');
        
        // Store application ID in session storage for payment
        sessionStorage.setItem('drawApplicationId', data.application._id);
        
        // Redirect to payment page after a short delay
        setTimeout(() => {
          navigate('/draw-payment');
        }, 1500);
      } else {
        setError(data.message || 'Failed to submit application');
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      setError('An error occurred while submitting your application');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 2 }}>
        <BackButton />
      </Container>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" sx={{ mb: 3 }}>
            Lucky Draw Application Form
          </Typography>
          <Divider sx={{ mb: 4 }} />
          
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
              <Grid item xs={12} md={6}>
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
              
              <Grid item xs={12} md={6}>
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
              
              <Grid item xs={12} md={6}>
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
              
              <Grid item xs={12} md={6}>
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
                  <MenuItem value="">Select Country</MenuItem>
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
                  <MenuItem value="">Select Visa Type</MenuItem>
                  {visaTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Passport Size Photo
                </Typography>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="passport-photo-upload"
                  type="file"
                  name="passportPhoto"
                  onChange={handleFileChange}
                />
                <label htmlFor="passport-photo-upload">
                  <Button variant="outlined" component="span" fullWidth>
                    Upload Photo
                  </Button>
                </label>
                {previews.passportPhoto && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <img 
                      src={previews.passportPhoto} 
                      alt="Passport Photo Preview" 
                      style={{ maxWidth: '100%', maxHeight: '150px', border: '1px solid #ccc' }}
                    />
                  </Box>
                )}
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Passport Front Page Scan
                </Typography>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="passport-scan-upload"
                  type="file"
                  name="passportScan"
                  onChange={handleFileChange}
                />
                <label htmlFor="passport-scan-upload">
                  <Button variant="outlined" component="span" fullWidth>
                    Upload Scan
                  </Button>
                </label>
                {previews.passportScan && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <img 
                      src={previews.passportScan} 
                      alt="Passport Scan Preview" 
                      style={{ maxWidth: '100%', maxHeight: '150px', border: '1px solid #ccc' }}
                    />
                  </Box>
                )}
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 2 }}>
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
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default DrawApplicationForm;