import { Box, Container, Typography, Button, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Countdown from '../components/Countdown';

const HomePage = () => {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
          backgroundImage: "url('/assets/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', color: '#fff' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            Apply for Your Visa Online
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Secure, Fast, and Reliable Visa Processing for Europe, America, Canada, and Australia.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 4 }} href="/apply">
            Apply Now
          </Button>
        </Container>
      </Box>

      {/* Lucky Draw Section */}
      <Box sx={{ backgroundColor: 'secondary.main', py: 6 }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: '#fff' }}>
            Win a Free Visa Application!
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: '#fff' }}>
            Participate in our lucky draw by paying just 3000 PKR.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Countdown duration={600} />
          </Box>
          <Button variant="contained" color="primary" sx={{ mt: 3 }} href="/apply">
            Join Lucky Draw
          </Button>
        </Container>
      </Box>

      {/* Visa Categories Section */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: 'primary.main' }}>
            Visa Categories
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4, justifyContent: 'center' }}>
            {['Visit', 'Business', 'Work', 'Student'].map((type) => (
              <Grid item xs={12} sm={6} md={3} key={type}>
                <Box sx={{ backgroundColor: '#fff', p: 3, borderRadius: 2, textAlign: 'center', boxShadow: 2 }}>
                  <Typography variant="h6" sx={{ color: 'primary.main' }}>
                    {type} Visa
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    Apply for a {type.toLowerCase()} visa hassle-free.
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/apply">
                    Apply Now
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ backgroundColor: 'secondary.main', py: 6 }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: '#fff' }}>
            What Our Clients Say
          </Typography>
          <Box sx={{ mt: 4, backgroundColor: '#fff', p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.primary' }}>
              &quot;Great service! My visa application was smooth and hassle-free.&quot;
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, color: 'primary.main' }}>
              - John Doe
            </Typography>
          </Box>
          <Box sx={{ mt: 2, backgroundColor: '#fff', p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.primary' }}>
              &quot;Excellent support and quick processing. Highly recommended!&quot;
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, color: 'primary.main' }}>
              - Jane Smith
            </Typography>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default HomePage;
