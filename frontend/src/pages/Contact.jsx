import { Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#FFCC00' }}>Contact Us</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Feel free to contact us via email at support@visaapply.com.
        </Typography>
      </Container>
      <Footer />
    </>
  );
};

export default Contact;
