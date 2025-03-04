import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
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
          alignItems: 'center'
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', color: 'white' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#283593' }}>
            Apply for Your Visa Online
          </Typography>
          <Typography variant="h5" sx={{ mt: 2, color: 'black' }}>
            Secure, Fast, and Reliable Visa Processing for Europe, America, Canada, and Australia.
          </Typography>
          <Button variant="contained" sx={{ mt: 4 }} component={Link} to="/apply">
            Apply Now
          </Button>
        </Container>
      </Box>
      
      {/* Image Grid Section */}
      <Box sx={{ py: 6, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: 'secondary.main', mb: 4 }}>
            Our Global Reach
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <img src="/assets/europe.jpg" alt="Europe Visa" style={{ width: '100%', borderRadius: 8 }} />
              <Typography variant="subtitle1" sx={{ mt: 1, color: '#283593' }}>Europe</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <img src="/assets/america.jpg" alt="America Visa" style={{ width: '100%', borderRadius: 8 }} />
              <Typography variant="subtitle1" sx={{ mt: 1, color: '#283593' }}>America</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <img src="/assets/canada.jpg" alt="Canada Visa" style={{ width: '100%', borderRadius: 8 }} />
              <Typography variant="subtitle1" sx={{ mt: 1, color: '#283593' }}>Canada</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <img src="/assets/australia.jpg" alt="Australia Visa" style={{ width: '100%', borderRadius: 8 }} />
              <Typography variant="subtitle1" sx={{ mt: 1, color: '#283593' }}>Australia</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Lucky Draw Section */}
      <Box sx={{ backgroundColor: '#303030', py: 6 }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: 'secondary.main' }}>
            Win a Free Visa Application!
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: 'white' }}>
            Participate in our lucky draw by paying just 3000 PKR.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Countdown duration={600} />
          </Box>
          <Button variant="contained" sx={{ mt: 3, backgroundColor: 'secondary.main', color: 'black' }} component={Link} to="/apply">
            Join Lucky Draw
          </Button>
        </Container>
      </Box>

      {/* Visa Categories Section */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: 'secondary.main' }}>
            Visa Categories
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4, justifyContent: 'center' }}>
            {['Visit', 'Business', 'Work', 'Student'].map((type) => (
              <Grid item xs={12} sm={6} md={3} key={type}>
                <Box sx={{ backgroundColor: 'background.paper', p: 3, borderRadius: 2, textAlign: 'center', boxShadow: 3 }}>
                  <Typography variant="h6" sx={{ color: 'secondary.main' }}>
                    {type} Visa
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.primary' }}>
                    Apply for a {type.toLowerCase()} visa hassle-free.
                  </Typography>
                  <Button variant="contained" sx={{ mt: 2, backgroundColor: 'secondary.main', color: 'black' }} component={Link} to="/apply">
                    Apply Now
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ backgroundColor: '#303030', py: 6 }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ color: 'secondary.main' }}>
            What Our Clients Say
          </Typography>
          <Box sx={{ mt: 4, backgroundColor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.primary' }}>
              &quot;Great service! My visa application was smooth and hassle-free.&quot;
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, color: 'secondary.main' }}>
              - John Doe
            </Typography>
          </Box>
          <Box sx={{ mt: 2, backgroundColor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.primary' }}>
              &quot;Excellent support and quick processing. Highly recommended!&quot;
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, color: 'secondary.main' }}>
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
