import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TouristVisa = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Banner */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://nileconsultant.com/wp-content/uploads/2020/07/tourist-visa.jpg)',
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
            Tourist Visa
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
            <Typography>Tourist Visa</Typography>
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
                { title: 'Business Visa', link: '/visas/business', active: false },
                { title: 'Immigration Visa', link: '/visas/immigration', active: false },
                { title: 'Tourists Visa', link: '/visas/tourist', active: true },
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
              Tourist Visa Services
            </Typography>
            
            <Typography paragraph>
              A tourist visa is a travel document that allows you to visit a foreign country for leisure, 
              sightseeing, visiting friends and family, or medical treatment. Tourist visas are typically 
              short-term and do not permit the holder to work or study in the host country.
            </Typography>
            
            <Typography paragraph>
              At Nile Consultant, we offer comprehensive tourist visa services for destinations worldwide. 
              Our team of experts will guide you through the application process, ensuring that you have all 
              the necessary documents and meet all requirements for a successful application.
            </Typography>
            
            <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4 }}>
              Popular Tourist Destinations
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                "United States",
                "European Union (Schengen)",
                "United Kingdom",
                "Canada",
                "Australia",
                "Japan",
                "United Arab Emirates",
                "Turkey"
              ].map((country, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
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
                    <Typography>{country}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            
            <Typography variant="h5" component="h3" gutterBottom>
              Required Documents
            </Typography>
            
            <Typography paragraph>
              While requirements vary by country, common documents for tourist visa applications include:
            </Typography>
            
            <ul>
              <li>Valid passport with at least 6 months validity beyond your planned stay</li>
              <li>Completed visa application form</li>
              <li>Recent passport-sized photographs</li>
              <li>Proof of accommodation (hotel reservations, invitation letter)</li>
              <li>Round-trip flight itinerary</li>
              <li>Travel insurance</li>
              <li>Proof of sufficient funds</li>
              <li>Evidence of ties to your home country</li>
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
                Apply for Tourist Visa
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      <Footer />
    </>
  );
};

export default TouristVisa;