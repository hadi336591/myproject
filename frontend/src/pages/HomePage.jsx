import { useState, useEffect } from 'react';
import { 
  Container, Typography, Button, Box, Grid, Paper, 
  Card, CardContent, CardMedia, CardActions, Divider 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const [heroContent, setHeroContent] = useState({
    title: 'Join Our Lucky Draw!',
    subtitle: 'Get a chance to win free visa processing by paying only 3000 PKR.',
    buttonText: 'Join Draw Now'
  });
  const [newsFeeds, setNewsFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

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
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 8,
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {heroContent.title}
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            {heroContent.subtitle}
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            onClick={handleJoinDraw}
            sx={{ 
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
        </Container>
      </Box>
      
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
                image="/images/visa-application.jpg"
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
                image="/images/consultation.jpg"
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