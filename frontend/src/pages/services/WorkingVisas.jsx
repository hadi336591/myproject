import { Container, Typography, Box, Paper, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BackButton from '../../components/BackButton';

const WorkingVisas = () => {
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
            Working Visa Services
          </Typography>
          
          <Typography variant="body1" paragraph>
            Our working visa services help professionals, skilled workers, and seasonal employees secure the necessary permits to work legally in foreign countries. We provide expert guidance throughout the application process to ensure a smooth transition to your new workplace.
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Types of Work Visas
                </Typography>
                <ul>
                  <li>Skilled Worker Visas</li>
                  <li>Temporary Work Permits</li>
                  <li>Seasonal Worker Programs</li>
                  <li>Intra-Company Transfer Visas</li>
                  <li>Working Holiday Visas</li>
                  <li>Self-Employed and Entrepreneur Visas</li>
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
                  <li>Job offer letter from employer</li>
                  <li>Employment contract</li>
                  <li>Educational certificates and transcripts</li>
                  <li>Professional qualifications and licenses</li>
                  <li>Work experience letters</li>
                  <li>Language proficiency test results (if applicable)</li>
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
              Apply for Working Visa
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default WorkingVisas;