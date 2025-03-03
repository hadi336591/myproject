import { Container, Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

const VisaApplication = () => {
  const navigate = useNavigate();

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
      if (response.ok) {
        // Redirect to a confirmation page or back to home
        navigate('/');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error submitting visa application:', error);
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
          <Button type="submit" variant="contained">
            Submit Application
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default VisaApplication;
