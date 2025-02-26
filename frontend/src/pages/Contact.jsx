import { Container, Typography, Box, TextField, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement the logic to handle contact form submission
    console.log('Message sent');
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" sx={{ color: 'primary.main', mb: 4 }}>
          Contact Us
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Your Name" variant="outlined" required />
          <TextField label="Your Email" variant="outlined" required type="email" />
          <TextField label="Message" variant="outlined" multiline rows={4} required />
          <Button type="submit" variant="contained" color="primary">
            Send Message
          </Button>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
