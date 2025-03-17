import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Countdown from '../components/Countdown';
import VisaCategories from '../components/VisaCategories';
import Testimonials from '../components/Testimonials';
import HeroCarousel from '../components/HeroCarousel';
import { useEffect, useState } from 'react';

const countries = [
  { src: 'https://nileconsultant.com/wp-content/uploads/2022/06/spain_1024x724.jpg', label: 'Spain' },
  { src: 'https://nileconsultant.com/wp-content/uploads/2020/07/immigration-1.jpg', label: 'United States' },
  { src: 'https://nileconsultant.com/wp-content/uploads/2020/08/immigration-2.jpg', label: 'Canada' },
  { src: 'https://nileconsultant.com/wp-content/uploads/2020/07/germany.jpg', label: 'Germany' },
  { src: 'https://nileconsultant.com/wp-content/uploads/2020/07/france.jpg', label: 'France' },
  { src: 'https://nileconsultant.com/wp-content/uploads/2020/07/turkiye.jpg', label: 'Türkiye' },
];

const HomePage = () => {
  const [heroContent, setHeroContent] = useState({
    title: 'Join Our Lucky Draw!',
    subtitle: 'Get a chance to win free visa processing by paying only 3000 PKR.',
    buttonText: 'Join Draw'
  });

  useEffect(() => {
    // Fetch hero content from API
    const fetchHeroContent = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/hero-section');
        if (response.ok) {
          const data = await response.json();
          if (data._id) {
            setHeroContent(data);
          }
        }
      } catch (error) {
        console.error('Error fetching hero content:', error);
      }
    };

    fetchHeroContent();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '70vh',
          overflow: 'hidden',
        }}
      >
        <HeroCarousel />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            zIndex: 2,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            {heroContent.title}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {heroContent.subtitle}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Countdown duration={3888000} />
          </Box>
          <Button variant="contained" sx={{ mt: 3 }} component={Link} to="/draw-application">
            {heroContent.buttonText}
          </Button>
        </Box>
      </Box>

      {/* Draw Section */}
      <Box sx={{ backgroundColor: '#303030', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center', color: 'white' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
            Apply for Your Visa Online
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Secure, Fast, and Reliable Visa Processing for Europe, America, Canada, and Australia.
          </Typography>
          <Button variant="contained" sx={{ mt: 4 }} component={Link} to="/apply">
            Apply Now
          </Button>
        </Container>
      </Box>

      {/* Image Grid Section */}
      <Box sx={{ py: 8, backgroundColor: '#F8F9FA' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle2" sx={{ letterSpacing: 1, color: 'gray', mb: 1 }}>
            COUNTRIES WE OFFER SUPPORT
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
            Immigration & Visa Services <br /> Following Countries
          </Typography>
          <Box sx={{ width: 50, height: 4, backgroundColor: '#d32f2f', mx: 'auto', mb: 4 }}></Box>

          <Grid container spacing={3}>
            {countries.map((country) => (
              <Grid item xs={12} sm={6} md={4} key={country.label}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 2,
                    '&:hover img': { transform: 'scale(1.05)' },
                  }}
                >
                  <img
                    src={country.src}
                    alt={country.label}
                    style={{ width: '100%', height: '220px', objectFit: 'cover', transition: '0.3s ease' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                      {country.label}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Visa Categories Section */}
      <VisaCategories />
      <Testimonials />

      <Footer />
    </>
  );
};

export default HomePage;