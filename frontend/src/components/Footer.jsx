import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#303030', color: 'white', pt: 6, pb: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Visa Services
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              We provide comprehensive visa services to make your travel hassle-free. Our expert team ensures smooth processing of your visa applications.
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="linkedin">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/apply" color="inherit" display="block" sx={{ mb: 1 }}>
              Apply for Visa
            </Link>
            <Link href="/draw-application" color="inherit" display="block" sx={{ mb: 1 }}>
              Lucky Draw
            </Link>
            <Link href="/blog" color="inherit" display="block" sx={{ mb: 1 }}>
              Blog
            </Link>
            <Link href="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact Us
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Visa Types
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Tourist Visa
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Business Visa
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Student Visa
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Work Visa
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Immigration
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              123 Main Street, Lahore, Pakistan
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: +92 300 1234567
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: info@visaservices.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Hours: Mon-Fri 9:00 AM - 5:00 PM
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 3, mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Visa Services. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;