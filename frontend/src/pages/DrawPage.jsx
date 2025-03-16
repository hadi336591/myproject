import { useState, useContext } from 'react';
import { Container, Typography, Button, Box, TextField, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';
import { AuthContext } from '../context/AuthContext';

const DrawPage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const handleApplyForDraw = () => {
    navigate('/draw-application');
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <BackButton />
      </Container>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" sx={{ mb: 3 }}>
            Lucky Draw Information
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  How It Works
                </Typography>
                <Typography variant="body1" paragraph>
                  Join our lucky draw for a chance to win free visa processing! Simply fill out the application form and pay the entry fee of 3000 PKR.
                </Typography>
                <Typography variant="body1" paragraph>
                  Winners are selected randomly, and if you win, your visa processing fees will be completely waived!
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="h6" gutterBottom>
                  Prize Details
                </Typography>
                <Typography variant="body1" paragraph>
                  • Free visa processing (worth up to 50,000 PKR)<br />
                  • Priority application handling<br />
                  • Dedicated visa consultant
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                backgroundColor: '#f5f5f5', 
                p: 3, 
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <Typography variant="h5" color="primary" gutterBottom>
                  Ready to Try Your Luck?
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Complete the application form and pay just 3000 PKR to enter the draw.
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={handleApplyForDraw}
                  sx={{ minWidth: 200 }}
                >
                  Apply for Draw
                </Button>
                
                <Box sx={{ mt: 4, width: '100%' }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Next Draw Date:
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {new Date(Date.now() + 3888000 * 1000).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, p: 2, backgroundColor: '#fff9c4', borderRadius: 1 }}>
            <Typography variant="body2" align="center">
              Note: This is a promotional offer. Terms and conditions apply. The draw is conducted fairly and winners are selected randomly.
            </Typography>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default DrawPage;