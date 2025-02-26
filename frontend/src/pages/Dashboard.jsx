import { Container, Typography, Paper, Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" align="center" sx={{ color: 'primary.main', mb: 4 }}>
          User Dashboard
        </Typography>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Welcome to your dashboard! Here you can track your visa applications, view your lucky draw entries, and manage your profile.
          </Typography>
          <Box sx={{ mt: 3 }}>
            {/* Additional dashboard components or statistics can be placed here */}
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
