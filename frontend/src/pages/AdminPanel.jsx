import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.default',
        }}
      >
        <Container sx={{ flexGrow: 1, py: { xs: 2, sm: 4 } }}>
          <BackButton />
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: 'secondary.main',
              mb: { xs: 2, sm: 4 },
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            }}
          >
            Admin Panel
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              color: 'text.primary',
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
            }}
          >
            Welcome to the Admin Panel. Here you can manage users, verify applications, and perform other administrative tasks.
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 4,
              backgroundColor: 'secondary.main',
              color: 'black',
              px: 3,
              py: 1,
            }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default AdminPanel;
