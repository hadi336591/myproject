import { Container, Typography, Paper } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" sx={{ color: 'primary.main', mb: 4 }}>
          Blog
        </Typography>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h6" sx={{ color: 'primary.main' }}>
            Blog Post Title
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            This is a sample blog post. More detailed content and articles about visa processes and travel tips will be coming soon.
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ color: 'primary.main' }}>
            Another Blog Post
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            This is another sample blog post. Stay tuned for more updates, news, and tips on visa applications.
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default Blog;
