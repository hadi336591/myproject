import { useState, useEffect, useContext } from 'react';
import { 
  Container, Typography, Box, Paper, Grid, Divider, 
  Button, CircularProgress, Alert, Chip, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    if (!auth) {
      navigate('/login');
      return;
    }
    
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setDashboardData(data);
        } else {
          setError(data.message || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('An error occurred while fetching your dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [auth, navigate]);

  const getPaymentMethodLabel = (method) => {
    switch(method) {
      case 'creditCard': return 'Credit/Debit Card';
      case 'bankTransfer': return 'Bank Transfer';
      case 'easypaisa': return 'Easypaisa';
      case 'jazzCash': return 'Jazz Cash';
      default: return 'Not specified';
    }
  };

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
        <Typography variant="h4" sx={{ mb: 4 }}>
          Welcome to Your Dashboard
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={4}>
          {/* User Profile Section */}
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
                  {dashboardData?.user?.name || 'N/A'}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {dashboardData?.user?.email || 'N/A'}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Account Type
                </Typography>
                <Chip 
                  label={dashboardData?.user?.role === 'admin' ? 'Admin' : 'User'} 
                  color={dashboardData?.user?.role === 'admin' ? 'primary' : 'default'}
                  size="small"
                />
              </Box>
              
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ mt: 2 }}
                onClick={() => navigate('/profile')}
              >
                Edit Profile
              </Button>
            </Paper>
          </Grid>
          
          {/* Applications Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Your Applications
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              {/* Draw Applications */}
              <Typography variant="subtitle1" gutterBottom>
                Lucky Draw Applications
              </Typography>
              
              {dashboardData?.drawApplications?.length > 0 ? (
                <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Visa Type</TableCell>
                        <TableCell>Payment Status</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell>Details</TableCell>
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
                          <TableCell>
                            {app.paymentStatus ? getPaymentMethodLabel(app.paymentMethod) : 'N/A'}
                          </TableCell>
                          <TableCell>
                            <Button 
                              size="small" 
                              variant="outlined"
                              onClick={() => navigate(`/draw-application/${app._id}`)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Card variant="outlined" sx={{ mb: 4, bgcolor: 'background.default' }}>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" gutterBottom>
                      You haven&apos;t applied for any lucky draws yet.
                    </Typography>
                    <Button 
                      variant="contained" 
                      sx={{ mt: 2 }}
                      onClick={() => navigate('/draw-application')}
                    >
                      Apply for Lucky Draw
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {/* Visa Applications */}
              <Typography variant="subtitle1" gutterBottom>
                Visa Applications
              </Typography>
              
              {dashboardData?.application ? (
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Name
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {dashboardData.application.fullName}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Email
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {dashboardData.application.email}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Visa Type
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {dashboardData.application.visaType}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Payment Status
                        </Typography>
                        <Chip 
                          label={dashboardData.application.paymentStatus ? 'Paid' : 'Pending'} 
                          color={dashboardData.application.paymentStatus ? 'success' : 'warning'}
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ) : (
                <Card variant="outlined" sx={{ bgcolor: 'background.default' }}>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" gutterBottom>
                      You haven&apos;t submitted any visa applications yet.
                    </Typography>
                    <Button 
                      variant="contained" 
                      sx={{ mt: 2 }}
                      onClick={() => navigate('/apply')}
                    >
                      Apply for Visa
                    </Button>
                  </CardContent>
                </Card>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;