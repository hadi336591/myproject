import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ImmigrationVisa = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Banner */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://nileconsultant.com/wp-content/uploads/2020/08/immigration-2.jpg)',
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
            Immigration Visa
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
            <Typography>Immigration Visa</Typography>
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
                { title: 'Immigration Visa', link: '/visas/immigration', active: true },
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
              Immigration Visa Services
            </Typography>
            
            <Typography paragraph>
              An immigration visa is designed for individuals who wish to permanently relocate to another country. 
              Unlike temporary visas, immigration visas (also known as permanent resident visas) allow holders to 
              live, work, and study in the host country indefinitely.
            </Typography>
            
            <Typography paragraph>
              At Nile Consultant, we provide comprehensive immigration visa services for various countries. Our 
              experienced consultants will help you navigate the complex immigration process, ensuring that you 
              meet all requirements and submit a strong application.
            </Typography>
            
            <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4 }}>
              Benefits of Immigration Visa
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                "Permanent residence in the host country",
                "Freedom to work for any employer",
                "Access to healthcare and social services",
                "Education opportunities for you and your family",
                "Path to citizenship in many countries",
                "Ability to sponsor family members"
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
              Immigration Pathways
            </Typography>
            
            <Typography paragraph>
              There are several pathways to immigration, including:
            </Typography>
            
            <ul>
              <li><strong>Family Sponsorship:</strong> For those with close family members who are citizens or permanent residents</li>
              <li><strong>Skilled Worker Programs:</strong> For individuals with valuable skills, education, and work experience</li>
              <li><strong>Business Immigration:</strong> For entrepreneurs, investors, and self-employed individuals</li>
              <li><strong>Refugee and Humanitarian Programs:</strong> For those seeking protection or humanitarian assistance</li>
              <li><strong>Special Immigration Programs:</strong> Country-specific programs for certain groups</li>
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
                Apply for Immigration Visa
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      <Footer />
    </>
  );
};

export default ImmigrationVisa;