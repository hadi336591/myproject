import { useState, useEffect } from 'react';
import { 
  Container, Typography, Button, Box, Grid, Paper, 
  Card, CardContent, CardMedia, CardActions, Divider 
} from '@mui/material';
import { useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Countdown from '../components/Countdown';
import VisaCategories from '../components/VisaCategories';
import Testimonials from '../components/Testimonials';
import HeroCarousel from '../components/HeroCarousel';

const countries = [
  { src: 'https://nileconsultant.com/wp-content/uploads/2022/06/spain_1024x724.jpg', label: 'Spain' },
  { src: 'https://nileconsultant.com/wp-content/uploads/2020/07/immigration-1.jpg', label: 'United States' },
  { src: 'https://nileconsultant.com/wp-content/uploads/2020/08/immigration-2.jpg', label: 'Canada' },
  { src: '	https://nileconsultant.com/wp-content/uploads/2022/06/Germany-flag-1024x724-1.jpg', label: 'Germany' },
  { src: 'https://nileconsultant.com/wp-content/uploads/2022/06/France-Smartphone-Market_1024x724.jpg', label: 'France' },
  { src: 'https://nileconsultant.com/wp-content/uploads/2020/08/163d4f60-c55c-11e8-87bb-0242ac11000d.webp', label: 'Türkiye' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [heroContent, setHeroContent] = useState({
    title: 'Join Our Lucky Draw!',
    subtitle: 'Get a chance to win free visa processing by paying only 3000 PKR.',
    buttonText: 'Join Draw Now'
  });
  const [newsFeeds, setNewsFeeds] = useState([]);
  const [setLoading] = useState(true);

  useEffect(() => {
    // Fetch hero content and news feeds
    const fetchContent = async () => {
      try {
        // Fetch hero content
        const heroResponse = await fetch('http://localhost:5000/api/admin/hero-content');
        if (heroResponse.ok) {
          const heroData = await heroResponse.json();
          if (heroData) {
            setHeroContent(heroData);
          }
        }
        
        // Fetch news feeds (if you have an endpoint for this)
        // For now, using placeholder data
        setNewsFeeds([
          {
            id: 1,
            title: 'New Visa Requirements',
            content: 'Updated visa requirements for European countries. Check our blog for details.'
          },
          {
            id: 2,
            title: 'Office Closed for Holiday',
            content: 'Our office will be closed on August 14th for Independence Day.'
          },
          {
            id: 3,
            title: 'Lucky Draw Winner Announced',
            content: 'Congratulations to Ahmed Ali for winning our last lucky draw!'
          }
        ]);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  const handleJoinDraw = () => {
    navigate('/draw-application');
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section with Carousel */}
      <Box 
        sx={{ 
          position: 'relative',
          height: '80vh',
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
          <Typography variant="h6" sx={{ mt: 1, mb: 3, maxWidth: '800px', textAlign: 'center' }}>
            {heroContent.subtitle}
          </Typography>
          <Box sx={{ mt: 2 }}>
          <Countdown duration={2592000000} />
          </Box>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            onClick={handleJoinDraw}
            sx={{ 
              mt: 4,
              px: 4, 
              py: 1.5, 
              fontSize: '1.1rem',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
              }
            }}
          >
            {heroContent.buttonText || 'Join Draw Now'}
          </Button>
        </Box>
      </Box>
      
      {/* Spacer */}
      <Box sx={{ height: '2rem' }} />
      
      {/* Apply Section */}
      <Box sx={{ backgroundColor: '#001f3f', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center', color: 'white' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
            Apply for Your Visa Online
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            Secure, Fast, and Reliable Visa Processing for Europe, America, Canada, and Australia.
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 4 }} 
            onClick={() => navigate('/apply')}
          >
            Apply Now
          </Button>
        </Container>
      </Box>
      
      {/* Spacer */}
      <Box sx={{ height: '2rem' }} />
      
      {/* Countries Grid Section */}
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
      
      {/* Spacer */}
      <Box sx={{ height: '2rem' }} />
      
      {/* Services Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Our Services
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
          We provide comprehensive visa services to make your travel hassle-free
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image="https://nileconsultant.com/wp-content/uploads/2020/08/feature-2.jpg"
                alt="Visa Application"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  Visa Application
                </Typography>
                <Typography>
                  We handle visa applications for all major countries. Our experts ensure your application is complete and accurate.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate('/apply')}>Apply Now</Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image="/images/lucky-draw.jpg"
                alt="Lucky Draw"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  Lucky Draw
                </Typography>
                <Typography>
                  Join our lucky draw for a chance to win free visa processing. Only 3000 PKR to enter!
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleJoinDraw}>Join Draw</Button>
              </CardActions>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image="	https://nileconsultant.com/wp-content/uploads/2020/08/feature-3.jpg"
                alt="Consultation"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  Consultation
                </Typography>
                <Typography>
                  Get expert advice on visa requirements, documentation, and application procedures.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate('/contact')}>Contact Us</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      {/* Spacer */}
      <Box sx={{ height: '2rem' }} />
      
      {/* Visa Categories Section */}
      <VisaCategories />
      
      {/* Spacer */}
      <Box sx={{ height: '2rem' }} />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Spacer */}
      <Box sx={{ height: '2rem' }} />
      
      {/* News Feed Section */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Latest Updates
          </Typography>
          <Divider sx={{ mb: 4 }} />
          
          <Grid container spacing={3}>
            {newsFeeds.map((news) => (
              <Grid item xs={12} key={news.id}>
                <Paper elevation={1} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {news.title}
                  </Typography>
                  <Typography variant="body1">
                    {news.content}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      <Footer />
    </>
  );
};

export default HomePage;