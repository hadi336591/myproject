import { Box, Typography, Grid, TextField, Button, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#424242', color: 'white', py: 4, mt: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Quick Links */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Typography variant="body2">Home</Typography>
          <Typography variant="body2">Services</Typography>
          <Typography variant="body2">Contact</Typography>
          <Typography variant="body2">Blog</Typography>
        </Grid>

        {/* Services */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" gutterBottom>
            Services
          </Typography>
          <Typography variant="body2">Visa Application</Typography>
          <Typography variant="body2">Immigration Consulting</Typography>
          <Typography variant="body2">Travel Assistance</Typography>
          <Typography variant="body2">Legal Support</Typography>
        </Grid>

        {/* Newsletter Signup */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" gutterBottom>
            Newsletter
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Subscribe to our newsletter for updates.
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Enter your email"
            sx={{ backgroundColor: 'white', borderRadius: 1, mb: 1 }}
            fullWidth
          />
          <Button variant="contained" color="secondary" fullWidth>
            Subscribe
          </Button>
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color="inherit">
              <Facebook />
            </IconButton>
            <IconButton color="inherit">
              <Twitter />
            </IconButton>
            <IconButton color="inherit">
              <Instagram />
            </IconButton>
            <IconButton color="inherit">
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Typography variant="body2" align="center" sx={{ mt: 4 }}>
        &copy; 2025 VisaEase. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;