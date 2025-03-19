import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BusinessVisa = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Banner */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://nileconsultant.com/wp-content/uploads/2020/07/business-visa.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          mb: 6
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
            Business Visa
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
            <Typography component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
              Nile Consultant
            </Typography>
            <Typography sx={{ mx: 1 }}>&gt;</Typography>
            <Typography component={Link} to="#" sx={{ color: 'white', textDecoration: 'none' }}>
              Services
            </Typography>
            <Typography sx={{ mx: 1 }}>&gt;</Typography>
            <Typography>Business Visa</Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper elevation={3} sx={{ overflow: 'hidden' }}>
              <Box sx={{ bgcolor: '#2c5282', color: 'white', p: 2 }}>
                <Typography variant="h6">Visa Services</Typography>
              </Box>
              
              {[
                { title: 'Business Visa', link: '/visas/business', active: true },
                { title: 'Immigration Visa', link: '/visas/immigration', active: false },
                { title: 'Tourists Visa', link: '/visas/tourist', active: false },
                { title: 'Working Visas', link: '/visas/working', active: false }
              ].map((item) => (
                <Box 
                  key={item.title}
                  component={Link}
                  to={item.link}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    borderBottom: '1px solid #eee',
                    bgcolor: item.active ? '#f0f5ff' : 'white',
                    color: item.active ? '#2c5282' : 'inherit',
                    textDecoration: 'none',
                    '&:hover': {
                      bgcolor: '#f0f5ff',
                      color: '#2c5282'
                    }
                  }}
                >
                  <Typography>{item.title}</Typography>
                  <Box sx={{ color: item.active ? '#2c5282' : '#ccc' }}>→</Box>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={8} lg={9}>
            <Typography variant="h4" component="h2" gutterBottom>
              Business Visa Services
            </Typography>
            
            <Typography paragraph>
              A business visa is a document that allows you to enter a foreign country for business purposes. 
              These purposes may include attending meetings, conferences, or establishing business relationships. 
              However, they typically do not permit the visa holder to work for a company in the host country.
            </Typography>
            
            <Typography paragraph>
              At Nile Consultant, we specialize in business visa applications for various countries. Our team of 
              experts will guide you through the entire process, from documentation to submission, ensuring a 
              smooth and hassle-free experience.
            </Typography>
            
            <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4 }}>
              Benefits of Business Visa
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                "Attend business meetings and conferences",
                "Explore business opportunities",
                "Negotiate contracts with potential clients",
                "Visit company branches or subsidiaries",
                "Participate in short-term training",
                "Network with industry professionals"
              ].map((benefit, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      bgcolor: '#2c5282', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      ✓
                    </Box>
                    <Typography>{benefit}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            
            <Typography variant="h5" component="h3" gutterBottom>
              Required Documents
            </Typography>
            
            <Typography paragraph>
              The specific requirements for a business visa vary by country, but generally include:
            </Typography>
            
            <ul>
              <li>Valid passport with at least 6 months validity</li>
              <li>Completed visa application form</li>
              <li>Invitation letter from the host company</li>
              <li>Proof of sufficient funds</li>
              <li>Travel itinerary and accommodation details</li>
              <li>Business cover letter explaining the purpose of your trip</li>
              <li>Proof of ties to your home country</li>
            </ul>
            
            <Box sx={{ mt: 4, mb: 2 }}>
              <Button 
                variant="contained" 
                size="large" 
                component={Link} 
                to="/apply"
                sx={{ 
                  bgcolor: '#2c5282', 
                  '&:hover': { bgcolor: '#1a365d' } 
                }}
              >
                Apply for Business Visa
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      <Footer />
    </>
  );
};

export default BusinessVisa;