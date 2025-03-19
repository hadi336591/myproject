import { Container, Typography, Box, Paper, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BackButton from '../../components/BackButton';

const ImmigrationVisa = () => {
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
            Immigration Visa Services
          </Typography>
          
          <Typography variant="body1" paragraph>
            Our immigration visa services help individuals and families who wish to permanently relocate to another country. We provide expert guidance on various immigration pathways including skilled migration, family sponsorship, and investment-based immigration.
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Immigration Pathways
                </Typography>
                <ul>
                  <li>Skilled Worker Immigration</li>
                  <li>Family Sponsorship</li>
                  <li>Investment and Entrepreneur Programs</li>
                  <li>Humanitarian and Refugee Programs</li>
                  <li>Study-to-PR Pathways</li>
                </ul>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Our Immigration Services
                </Typography>
                <ul>
                  <li>Eligibility assessment for various immigration programs</li>
                  <li>Documentation preparation and verification</li>
                  <li>Application submission and follow-up</li>
                  <li>Interview preparation</li>
                  <li>Settlement assistance</li>
                  <li>Post-landing services</li>
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
              Apply for Immigration Visa
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default ImmigrationVisa;