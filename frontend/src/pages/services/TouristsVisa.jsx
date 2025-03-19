import { Container, Typography, Box, Paper, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BackButton from '../../components/BackButton';

const TouristsVisa = () => {
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
            Tourist Visa Services
          </Typography>
          
          <Typography variant="body1" paragraph>
            Our tourist visa services are designed to help travelers explore new destinations with ease. Whether you're planning a vacation, visiting friends and family, or simply exploring a new country, we provide comprehensive assistance to make your travel dreams a reality.
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Popular Tourist Destinations
                </Typography>
                <ul>
                  <li>Schengen Countries (Europe)</li>
                  <li>United States</li>
                  <li>United Kingdom</li>
                  <li>Canada</li>
                  <li>Australia</li>
                  <li>UAE (Dubai)</li>
                  <li>Thailand</li>
                  <li>Malaysia</li>
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
                  <li>Recent passport-sized photographs</li>
                  <li>Proof of accommodation</li>
                  <li>Round-trip flight itinerary</li>
                  <li>Travel insurance</li>
                  <li>Bank statements (last 3-6 months)</li>
                  <li>Employment verification letter</li>
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
              Apply for Tourist Visa
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default TouristsVisa;