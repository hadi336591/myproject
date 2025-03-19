import { Container, Typography, Box, Paper, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BackButton from '../../components/BackButton';

const BusinessVisa = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <BackButton />
      </Container>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Business Visa Services
          </Typography>
          
          <Typography variant="body1" paragraph>
            Our business visa services are designed to help entrepreneurs, executives, and professionals travel internationally for business purposes. We provide comprehensive assistance throughout the application process to ensure a smooth experience.
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Business Visa Benefits
                </Typography>
                <ul>
                  <li>Attend business meetings and conferences</li>
                  <li>Explore business opportunities and partnerships</li>
                  <li>Negotiate contracts and agreements</li>
                  <li>Visit company branches or subsidiaries</li>
                  <li>Participate in short-term training</li>
                </ul>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Required Documents
                </Typography>
                <ul>
                  <li>Valid passport with at least 6 months validity</li>
                  <li>Completed visa application form</li>
                  <li>Business invitation letter from host company</li>
                  <li>Letter from your employer stating purpose of trip</li>
                  <li>Proof of sufficient funds for your stay</li>
                  <li>Travel itinerary and accommodation details</li>
                  <li>Business registration documents</li>
                </ul>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => navigate('/apply')}
              sx={{ px: 4, py: 1.5 }}
            >
              Apply for Business Visa
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default BusinessVisa;