import { useState, useEffect, useContext } from 'react';
import { 
  Container, Typography, Box, Paper, Grid, Button, 
  Card, CardContent, Divider, Chip, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Alert, TextField, Tab, Tabs, MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tabValue, setTabValue] = useState(0);
  
  // Hero content form
  const [heroContent, setHeroContent] = useState({
    title: '',
    subtitle: '',
    buttonText: 'Join Draw'
  });
  
  // Blog form
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [blogImage, setBlogImage] = useState(null);
  
  // Draw applications
  const [drawApplications, setDrawApplications] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch admin data');
        }

        const data = await response.json();
        setAdminData(data);
        
        // Fetch hero content
        const heroResponse = await fetch('http://localhost:5000/api/admin/hero-content', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        
        if (heroResponse.ok) {
          const heroData = await heroResponse.json();
          if (heroData) {
            setHeroContent({
              title: heroData.title || 'Join Our Lucky Draw!',
              subtitle: heroData.subtitle || 'Get a chance to win free visa processing by paying only 3000 PKR.',
              buttonText: heroData.buttonText || 'Join Draw'
            });
          }
        }
        
        // Fetch draw applications
        const drawResponse = await fetch('http://localhost:5000/api/admin/draw-applications', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        
        if (drawResponse.ok) {
          const drawData = await drawResponse.json();
          setDrawApplications(drawData);
        }
        
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to load admin data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (auth && auth.token && auth.user.role === 'admin') {
      fetchAdminData();
    }
  }, [auth]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleHeroChange = (e) => {
    setHeroContent({
      ...heroContent,
      [e.target.name]: e.target.value
    });
  };

  const handleBlogChange = (e) => {
    setBlogForm({
      ...blogForm,
      [e.target.name]: e.target.value
    });
  };

  const handleBlogImageChange = (e) => {
    setBlogImage(e.target.files[0]);
  };

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/admin/hero-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify(heroContent)
      });

      if (response.ok) {
        setSuccess('Hero content updated successfully!');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update hero content');
      }
    } catch (err) {
      console.error('Error updating hero content:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('title', blogForm.title);
    formData.append('content', blogForm.content);
    formData.append('author', blogForm.author || auth.user.name);
    if (blogImage) {
      formData.append('image', blogImage);
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/add-blog', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`
        },
        body: formData
      });

      if (response.ok) {
        setSuccess('Blog post added successfully!');
        setBlogForm({ title: '', content: '', author: '' });
        setBlogImage(null);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add blog post');
      }
    } catch (err) {
      console.error('Error adding blog post:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!auth || auth.user.role !== 'admin') {
    return (
      <>
        <Navbar />
        <Container maxWidth="sm" sx={{ py: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Access Denied
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            You need administrator privileges to access this page.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
          >
            Go to Home
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  if (loading && !adminData) {
    return (
      <>
        <Navbar />
        <Container sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading admin panel...
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
          Admin Panel
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

        {/* Dashboard Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="primary">
                {adminData?.stats?.drawApplications || 0}
              </Typography>
              <Typography variant="body2">
                Total Draw Applications
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="success.main">
                {adminData?.stats?.paidDrawApplications || 0}
              </Typography>
              <Typography variant="body2">
                Paid Applications
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="info.main">
                {adminData?.stats?.users || 0}
              </Typography>
              <Typography variant="body2">
                Registered Users
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="warning.main">
                {adminData?.stats?.blogs || 0}
              </Typography>
              <Typography variant="body2">
                Blog Posts
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Tabs for different admin functions */}
        <Paper elevation={3} sx={{ mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="fullWidth"
          >
            <Tab label="Draw Applications" />
            <Tab label="Edit Hero Section" />
            <Tab label="Add Blog Post" />
          </Tabs>
          
          {/* Draw Applications Tab */}
          {tabValue === 0 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Lucky Draw Applications
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {drawApplications.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Father's Name</TableCell>
                        <TableCell>Passport No.</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Visa Type</TableCell>
                        <TableCell>Payment</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {drawApplications.map((app) => (
                        <TableRow key={app._id}>
                          <TableCell>
                            {new Date(app.drawEntryDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{app.fullName}</TableCell>
                          <TableCell>{app.fatherName}</TableCell>
                          <TableCell>{app.passportNo}</TableCell>
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
                <Typography variant="body1" sx={{ textAlign: 'center', py: 3 }}>
                  No draw applications found.
                </Typography>
              )}
            </Box>
          )}
          
          {/* Edit Hero Section Tab */}
          {tabValue === 1 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Edit Hero Section
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box component="form" onSubmit={handleHeroSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Hero Title"
                      name="title"
                      value={heroContent.title}
                      onChange={handleHeroChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Hero Subtitle"
                      name="subtitle"
                      value={heroContent.subtitle}
                      onChange={handleHeroChange}
                      multiline
                      rows={2}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Button Text"
                      name="buttonText"
                      value={heroContent.buttonText}
                      onChange={handleHeroChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Update Hero Content'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
          
          {/* Add Blog Post Tab */}
          {tabValue === 2 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Add New Blog Post
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box component="form" onSubmit={handleBlogSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Blog Title"
                      name="title"
                      value={blogForm.title}
                      onChange={handleBlogChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Blog Content"
                      name="content"
                      value={blogForm.content}
                      onChange={handleBlogChange}required
                      multiline
                      rows={6}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Author (optional)"
                      name="author"
                      value={blogForm.author}
                      onChange={handleBlogChange}
                      variant="outlined"
                      placeholder={auth.user.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Blog Image (optional)
                    </Typography>
                    <input
                      accept="image/*"
                      type="file"
                      id="blog-image"
                      onChange={handleBlogImageChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="blog-image">
                      <Button
                        variant="outlined"
                        component="span"
                      >
                        Upload Image
                      </Button>
                    </label>
                    {blogImage && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Selected: {blogImage.name}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Publish Blog Post'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default AdminPanel;