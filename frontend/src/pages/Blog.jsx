import { Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#FFCC00' }}>Blog</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>Blog content coming soon.</Typography>
      </Container>
      <Footer />
    </>
  );
};

export default Blog;
