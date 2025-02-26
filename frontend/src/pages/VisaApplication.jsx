import { Container, Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VisaApplication = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      visaType: e.target.visaType.value,
    };

    try {
      const response = await fetch('http://localhost:5000/api/visa-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Response:', data);
      // Handle response (e.g., show success message)
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" sx={{ color: 'primary.main', mb: 4 }}>
          Visa Application Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="fullName" label="Full Name" variant="outlined" required />
          <TextField name="email" label="Email" variant="outlined" type="email" required />
          <TextField select name="visaType" label="Visa Type" variant="outlined" required>
            <MenuItem value="">Select Visa Type</MenuItem>
            <MenuItem value="Visit">Visit</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary">
            Submit Application
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default VisaApplication;
