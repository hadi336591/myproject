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
          headers: { Authorization: `Bearer ${auth.token}` },
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
        <Typography variant="h4" sx={{ mb: 4 }}>
          User Dashboard
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {dashboardData ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              Welcome, {dashboardData.user ? dashboardData.user.id : ''}
            </Typography>
            {dashboardData.application && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Your Visa Application:</Typography>
                <Typography variant="body2">Name: {dashboardData.application.fullName}</Typography>
                <Typography variant="body2">Email: {dashboardData.application.email}</Typography>
                <Typography variant="body2">Visa Type: {dashboardData.application.visaType}</Typography>
                <Typography variant="body2">
                  Payment Status: {dashboardData.application.paymentStatus ? 'Paid' : 'Pending'}
                </Typography>
              </Box>
            )}
          </Box>
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Loading dashboard...
          </Typography>
        )}
        <Button variant="contained" sx={{ mt: 4 }} onClick={() => {
          logout();
          navigate('/');
        }}>
          Logout
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
