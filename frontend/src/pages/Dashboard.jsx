import { useState, useEffect, useContext } from 'react';
import { 
  Container, Typography, Box, Paper, Grid, Button, 
  Card, CardContent, Divider, Chip, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [drawResult, setDrawResult] = useState(null);

  useEffect(() => {
    // Check for draw result in localStorage
    const storedResult = localStorage.getItem('drawResult');
    if (storedResult) {
      setDrawResult(JSON.parse(storedResult));
      // Clear it after reading
      localStorage.removeItem('drawResult');
    }

    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (auth && auth.token) {
      fetchDashboardData();
    }
  }, [auth]);

  if (!auth) {
    return (
      <>
        <Navbar />
        <Container maxWidth="sm" sx={{ py: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Please log in to view your dashboard
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/login', { state: { from: '/dashboard' } })}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <Container sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading your dashboard...
          </Typography>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {auth.user.name}
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {drawResult && (
          <Alert 
            severity={drawResult.isWinner ? "success" : "info"} 
            sx={{ mb: 3 }}
          >
            {drawResult.message}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* User Profile Card */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Your Profile
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">
                  {auth.user.name}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {auth.user.email}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Account Type
                </Typography>
                <Chip 
                  label={auth.user.role === 'admin' ? 'Administrator' : 'User'} 
                  color={auth.user.role === 'admin' ? 'primary' : 'default'}
                  size="small"
                />
              </Box>
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ mt: 2 }}
                onClick={() => navigate('/draw-application')}
              >
                Apply for Lucky Draw
              </Button>
            </Paper>
          </Grid>

          {/* Draw Applications */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Your Lucky Draw Applications
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {dashboardData && dashboardData.drawApplications && dashboardData.drawApplications.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Application Date</TableCell>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Visa Type</TableCell>
                        <TableCell>Payment Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dashboardData.drawApplications.map((app) => (
                        <TableRow key={app._id}>
                          <TableCell>
                            {new Date(app.drawEntryDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{app.fullName}</TableCell>
                          <TableCell>{app.country}</TableCell>
                          <TableCell>{app.visaType}</TableCell>
                          <TableCell>
                            <Chip 
                              label={app.paymentStatus ? 'Paid' : 'Pending'} 
                              color={app.paymentStatus ? 'success' : 'warning'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" gutterBottom>
                    You haven't applied for any lucky draws yet.
                  </Typography>
                  <Button 
                    variant="contained" 
                    onClick={() => navigate('/draw-application')}
                    sx={{ mt: 2 }}
                  >
                    Apply Now
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Visa Applications */}
          {dashboardData && dashboardData.application && (
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Your Visa Applications
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          Full Name
                        </Typography>
                        <Typography variant="body1">
                          {dashboardData.application.fullName}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          Email
                        </Typography>
                        <Typography variant="body1">
                          {dashboardData.application.email}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          Visa Type
                        </Typography>
                        <Typography variant="body1">
                          {dashboardData.application.visaType}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          Application Date
                        </Typography>
                        <Typography variant="body1">
                          {new Date(dashboardData.application.createdAt).toLocaleDateString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          Payment Status
                        </Typography>
                        <Chip 
                          label={dashboardData.application.paymentStatus ? 'Paid' : 'Pending'} 
                          color={dashboardData.application.paymentStatus ? 'success' : 'warning'}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">
                          Draw Entry
                        </Typography>
                        <Chip 
                          label={dashboardData.application.drawEntry ? 'Entered' : 'Not Entered'} 
                          color={dashboardData.application.drawEntry ? 'success' : 'default'}
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;