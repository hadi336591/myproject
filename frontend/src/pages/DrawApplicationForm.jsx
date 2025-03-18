import { useState, useContext } from 'react';
import { 
  Container, Typography, Button, Box, TextField, Paper, 
  Grid, CircularProgress, Alert, MenuItem, Divider 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';
import { AuthContext } from '../context/AuthContext';

const DrawApplicationForm = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    passportNo: '',
    country: '',
    visaType: ''
  });
  const [files, setFiles] = useState({
    passportPhoto: null,
    passportScan: null
  });
  const [fileErrors, setFileErrors] = useState({
    passportPhoto: '',
    passportScan: ''
  });

  // Check if user is logged in
  if (!auth) {
    navigate('/login', { state: { from: '/draw-application' } });
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setFileErrors({
          ...fileErrors,
          [name]: 'Only JPG, PNG, and PDF files are allowed'
        });
        return;
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setFileErrors({
          ...fileErrors,
          [name]: 'File size must be less than 5MB'
        });
        return;
      }
      
      // Clear any previous errors
      setFileErrors({
        ...fileErrors,
        [name]: ''
      });
      
      // Set the file
      setFiles({
        ...files,
        [name]: file
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.fatherName || !formData.passportNo || 
        !formData.country || !formData.visaType || !files.passportPhoto || !files.passportScan) {
      setError('Please fill all required fields and upload all required documents');
      return;
    }
    
    // Check for file errors
    if (fileErrors.passportPhoto || fileErrors.passportScan) {
      setError('Please fix the file errors before submitting');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Create form data for file upload
    const submitData = new FormData();
    submitData.append('fullName', formData.fullName);
    submitData.append('fatherName', formData.fatherName);
    submitData.append('passportNo', formData.passportNo);
    submitData.append('country', formData.country);
    submitData.append('visaType', formData.visaType);
    submitData.append('passportPhoto', files.passportPhoto);
    submitData.append('passportScan', files.passportScan);
    
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
        // Store application ID in session storage for payment
        sessionStorage.setItem('drawApplicationId', data.applicationId);
        
        // Redirect to payment page
        navigate('/draw-payment');
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
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <BackButton />
      </Container>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            Lucky Draw Application
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            Fill out this form to enter our lucky draw for a chance to win free visa processing.
            After submission, you'll be directed to the payment page to pay the entry fee of 3000 PKR.
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Father's Name"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Passport Number"
                  name="passportNo"
                  value={formData.passportNo}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  fullWidth
                  required
                >
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                  <MenuItem value="Schengen">Schengen</MenuItem>
                  <MenuItem value="UAE">UAE</MenuItem>
                  <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  select
                  label="Visa Type"
                  name="visaType"
                  value={formData.visaType}
                  onChange={handleInputChange}
                  fullWidth
                  required
                >
                  <MenuItem value="Tourist">Tourist</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Family">Family</MenuItem>
                  <MenuItem value="Immigration">Immigration</MenuItem>
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Passport Size Photo *
                </Typography>
                <input
                  accept="image/jpeg,image/png,image/jpg"
                  type="file"
                  name="passportPhoto"
                  onChange={handleFileChange}
                  style={{ marginBottom: '8px' }}
                />
                {fileErrors.passportPhoto && (
                  <Typography color="error" variant="caption">
                    {fileErrors.passportPhoto}
                  </Typography>
                )}
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Passport Scan (First Page) *
                </Typography>
                <input
                  accept="image/jpeg,image/png,image/jpg,application/pdf"
                  type="file"
                  name="passportScan"
                  onChange={handleFileChange}
                  style={{ marginBottom: '8px' }}
                />
                {fileErrors.passportScan && (
                  <Typography color="error" variant="caption">
                    {fileErrors.passportScan}
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
                  sx={{ mt: 2, py: 1.5 }}
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