import { useState, useEffect, useContext } from 'react';
import { 
  Container, Typography, Box, Paper, Grid, Divider, 
  Button, CircularProgress, Alert, Chip, Card, CardContent,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Stepper, Step, StepLabel, StepContent
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
  const [applicationStatus, setApplicationStatus] = useState({
    formSubmitted: false,
    documentsUploaded: false,
    paymentCompleted: false,
    applicationComplete: false
  });

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
          
          // Check application status
          if (data.application) {
            const formSubmitted = true;
            const documentsUploaded = data.application.documents && data.application.documents.length > 0;
            const paymentCompleted = data.application.paymentStatus;
            const applicationComplete = formSubmitted && documentsUploaded && paymentCompleted;
            
            setApplicationStatus({
              formSubmitted,
              documentsUploaded,
              paymentCompleted,
              applicationComplete
            });
          }
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
                  {auth?.user?.name || 'N/A'}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {auth?.user?.email || 'N/A'}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Account Type
                </Typography>
                <Chip 
                  label={auth?.user?.role === 'admin' ? 'Admin' : 'User'} 
                  color={auth?.user?.role === 'admin' ? 'primary' : 'default'}
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
            
            {/* Application Status */}
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Application Status
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Stepper orientation="vertical" activeStep={
                applicationStatus.applicationComplete ? 3 : 
                applicationStatus.paymentCompleted ? 2 : 
                applicationStatus.documentsUploaded ? 1 : 
                applicationStatus.formSubmitted ? 0 : -1
              }>
                <Step>
                  <StepLabel>Form Submission</StepLabel>
                  <StepContent>
                    <Typography variant="body2">
                      {applicationStatus.formSubmitted 
                        ? 'You have successfully submitted your application form.' 
                        : 'Please submit your visa application form.'}
                    </Typography>
                    {!applicationStatus.formSubmitted && (
                      <Button 
                        variant="contained" 
                        size="small" 
                        sx={{ mt: 1 }}
                        onClick={() => navigate('/apply')}
                      >
                        Apply Now
                      </Button>
                    )}
                  </StepContent>
                </Step>
                
                <Step>
                  <StepLabel>Document Upload</StepLabel>
                  <StepContent>
                    <Typography variant="body2">
                      {applicationStatus.documentsUploaded 
                        ? 'Your documents have been uploaded successfully.' 
                        : 'Please upload all required documents for your application.'}
                    </Typography>
                    {applicationStatus.formSubmitted && !applicationStatus.documentsUploaded && (
                      <Button 
                        variant="contained" 
                        size="small" 
                        sx={{ mt: 1 }}
                        onClick={() => navigate('/upload-documents')}
                      >
                        Upload Documents
                      </Button>
                    )}
                  </StepContent>
                </Step>
                
                <Step>
                  <StepLabel>Payment</StepLabel>
                  <StepContent>
                    <Typography variant="body2">
                      {applicationStatus.paymentCompleted 
                        ? 'Payment has been completed successfully.' 
                        : 'Please complete the payment for your application.'}
                    </Typography>
                    {applicationStatus.formSubmitted && 
                     applicationStatus.documentsUploaded && 
                     !applicationStatus.paymentCompleted && (
                      <Button 
                        variant="contained" 
                        size="small" 
                        sx={{ mt: 1 }}
                        onClick={() => navigate('/payment')}
                      >
                        Make Payment
                      </Button>
                    )}
                  </StepContent>
                </Step>
                
                <Step>
                  <StepLabel>Application Complete</StepLabel>
                  <StepContent>
                    <Typography variant="body2">
                      Your application is complete and is being processed. You will be notified of any updates.
                    </Typography>
                  </StepContent>
                </Step>
              </Stepper>
              
              {applicationStatus.applicationComplete && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Your application is complete and is being processed. You can now apply for the lucky draw!
                </Alert>
              )}
              
              {applicationStatus.applicationComplete && (
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/draw-application')}
                >
                  Apply for Lucky Draw
                </Button>
              )}
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
                    {applicationStatus.applicationComplete ? (
                      <Button 
                        variant="contained" 
                        sx={{ mt: 2 }}
                        onClick={() => navigate('/draw-application')}
                      >
                        Apply for Lucky Draw
                      </Button>
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Complete your visa application to be eligible for the lucky draw.
                      </Typography>
                    )}
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
                          Application Date
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {new Date(dashboardData.application.createdAt).toLocaleDateString()}
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
                      
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Application Status
                        </Typography>
                        <Chip 
                          label={applicationStatus.applicationComplete ? 'Complete' : 'Incomplete'} 
                          color={applicationStatus.applicationComplete ? 'success' : 'warning'}
                          size="small"
                        />
                      </Grid>
                    </Grid>
                    
                    {!applicationStatus.applicationComplete && (
                      <Box sx={{ mt: 2 }}>
                        <Alert severity="info">
                          Please complete all steps in your application process to proceed.
                        </Alert>
                      </Box>
                    )}
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