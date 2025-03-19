import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WorkingVisa = () => {
  return (
    <>
      <Navbar />
      
      {/* Hero Banner */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://nileconsultant.com/wp-content/uploads/2020/07/work-visa.jpg)',
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
            Working Visa
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
            <Typography>Working Visa</Typography>
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
                { title: 'Tourists Visa', link: '/visas/tourist', active: false },
                { title: 'Working Visas', link: '/visas/working', active: true }
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
              Working Visa Services
            </Typography>
            
            <Typography paragraph>
              A working visa (or work visa) is an official document that allows foreign nationals to work in a 
              specific country for a defined period. Unlike business visas, which only permit business-related 
              activities such as meetings and conferences, work visas authorize the holder to be employed by a 
              company in the host country.
            </Typography>
            
            <Typography paragraph>
              At Nile Consultant, we provide comprehensive work visa services for various countries. Our team of 
              experts will guide you through the entire application process, from initial assessment to visa approval.
            </Typography>
            
            <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4 }}>
              Types of Work Visas
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                "Skilled Worker Visas",
                "Temporary Work Permits",
                "Seasonal Worker Visas",
                "Intra-Company Transfer Visas",
                "Working Holiday Visas",
                "Self-Employed Visas"
              ].map((type, index) => (
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
                    <Typography>{type}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            
            <Typography variant="h5" component="h3" gutterBottom>
              Required Documents
            </Typography>
            
            <Typography paragraph>
              While requirements vary by country and visa type, common documents for work visa applications include:
            </Typography>
            
            <ul>
              <li>Valid passport</li>
              <li>Completed visa application form</li>
              <li>Job offer or employment contract</li>
              <li>Educational qualifications and certificates</li>
              <li>Work experience letters</li>
              <li>Proof of language proficiency (if required)</li>
              <li>Medical examination results</li>
              <li>Police clearance certificate</li>
              <li>Proof of financial means</li>
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
                Apply for Working Visa
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      <Footer />
    </>
  );
};

export default WorkingVisa;