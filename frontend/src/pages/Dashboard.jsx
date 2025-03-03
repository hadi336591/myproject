import { useEffect, useState, useContext } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setDashboardData(data);
        } else {
          setError(data.message || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        console.log(err);
        setError('Failed to fetch dashboard data');
      }
    };

    if (auth && auth.token) {
      fetchDashboard();
    }
  }, [auth]);

  return (
    <>
      <Navbar />
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 4 }}>User Dashboard</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {dashboardData ? (
          <Box sx={{ mt: 2, textAlign: 'left' }}>
            <Typography variant="h6">Welcome, {dashboardData.user?.name}</Typography>
            {dashboardData.application ? (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1"><strong>Application Details:</strong></Typography>
                <Typography variant="body2">Full Name: {dashboardData.application.fullName}</Typography>
                <Typography variant="body2">Email: {dashboardData.application.email}</Typography>
                <Typography variant="body2">Visa Type: {dashboardData.application.visaType}</Typography>
                <Typography variant="body2">
                  Payment Status: {dashboardData.application.paymentStatus ? 'Paid' : 'Pending'}
                </Typography>
                <Typography variant="body2">
                  Draw Update: {dashboardData.application.drawUpdate || 'No update yet'}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body1" sx={{ mt: 2 }}>
                No application found.
              </Typography>
            )}
          </Box>
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>Loading dashboard...</Typography>
        )}
        <Button
          variant="contained"
          sx={{ mt: 4, backgroundColor: '#ffb300', color: 'black' }}
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          Logout
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
