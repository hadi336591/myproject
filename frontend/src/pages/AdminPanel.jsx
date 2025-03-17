import { useState, useEffect, useContext } from 'react';
import { 
  Container, Typography, Box, Paper, Tabs, Tab, Divider,
  Button, CircularProgress, Alert, TextField, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Card, CardContent, Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [stats, setStats] = useState(null);
  const [drawApplications, setDrawApplications] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [heroSection, setHeroSection] = useState({
    title: '',
    subtitle: '',
    buttonText: ''
  });
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    author: ''
  });

  useEffect(() => {
    // Check if user is admin
    if (!auth || auth.user.role !== 'admin') {
      navigate('/login');
      return;
    }
    
    // Fetch admin data
    const fetchAdminData = async () => {
      try {
        // Fetch stats
        const statsResponse = await fetch('http://localhost:5000/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }
        
        // Fetch draw applications
        const applicationsResponse = await fetch('http://localhost:5000/api/admin/draw-applications', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        
        if (applicationsResponse.ok) {
          const applicationsData = await applicationsResponse.json();
          setDrawApplications(applicationsData);
        }
        
        // Fetch blogs
        const blogsResponse = await fetch('http://localhost:5000/api/admin/blogs', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        
        if (blogsResponse.ok) {
          const blogsData = await blogsResponse.json();
          setBlogs(blogsData);
        }
        
        // Fetch hero section
        const heroResponse = await fetch('http://localhost:5000/api/admin/hero-section', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        
        if (heroResponse.ok) {
          const heroData = await heroResponse.json();
          if (heroData._id) {
            setHeroSection(heroData);
          }
        }
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('An error occurred while fetching admin data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdminData();
  }, [auth, navigate]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleHeroChange = (e) => {
    setHeroSection({
      ...heroSection,
      [e.target.name]: e.target.value
    });
  };

  const handleBlogChange = (e) => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value
    });
  };

  const updateHeroSection = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const response = await fetch('http://localhost:5000/api/admin/hero-section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify(heroSection)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Hero section updated successfully');
      } else {
        setError(data.message || 'Failed to update hero section');
      }
    } catch (err) {
      console.error('Error updating hero section:', err);
      setError('An error occurred while updating hero section');
    } finally {
      setLoading(false);
    }
  };

  const addNewBlog = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const response = await fetch('http://localhost:5000/api/admin/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`
        },
        body: JSON.stringify(newBlog)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Blog added successfully');
        setNewBlog({
          title: '',
          content: '',
          author: ''
        });
        
        // Refresh blogs list
        const blogsResponse = await fetch('http://localhost:5000/api/admin/blogs', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        
        if (blogsResponse.ok) {
          const blogsData = await blogsResponse.json();
          setBlogs(blogsData);
        }
      } else {
        setError(data.message || 'Failed to add blog');
      }
    } catch (err) {
      console.error('Error adding blog:', err);
      setError('An error occurred while adding blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !stats) {
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
        <Typography variant="h4" sx={{ mb: 4 }}>
          Admin Panel
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 4 }}>
            {success}
          </Alert>
        )}
        
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="primary">
                {stats?.drawApplications?.total || 0}
              </Typography>
              <Typography variant="body2">
                Total Draw Applications
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="success.main">
                {stats?.drawApplications?.paid || 0}
              </Typography>
              <Typography variant="body2">
                Paid Draw Applications
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="info.main">
                {stats?.users || 0}
              </Typography>
              <Typography variant="body2">
                Registered Users
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="warning.main">
                {stats?.blogs || 0}
              </Typography>
              <Typography variant="body2">
                Published Blogs
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Tabs */}
        <Paper elevation={3} sx={{ mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            variant="fullWidth"
          >
            <Tab label="Draw Applications" />
            <Tab label="Hero Section" />
            <Tab label="Blog Management" />
          </Tabs>
          
          <Divider />
          
          {/* Tab Content */}
          <Box sx={{ p: 3 }}>
            {/* Draw Applications Tab */}
            {tabValue === 0 && (
              <>
                <Typography variant="h6" gutterBottom>
                  Lucky Draw Applications
                </Typography>
                
                {drawApplications.length > 0 ? (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Passport No</TableCell>
                          <TableCell>Country</TableCell>
                          <TableCell>Visa Type</TableCell>
                          <TableCell>Payment Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {drawApplications.map((app) => (
                          <TableRow key={app._id}>
                            <TableCell>
                              {new Date(app.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{app.fullName}</TableCell>
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
                  <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                    No draw applications found.
                  </Typography>
                )}
              </>
            )}
            
            {/* Hero Section Tab */}
            {tabValue === 1 && (
              <>
                <Typography variant="h6" gutterBottom>
                  Edit Hero Section
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Hero Title"
                      name="title"
                      value={heroSection.title}
                      onChange={handleHeroChange}
                      variant="outlined"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Hero Subtitle"
                      name="subtitle"
                      value={heroSection.subtitle}
                      onChange={handleHeroChange}
                      variant="outlined"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Button Text"
                      name="buttonText"
                      value={heroSection.buttonText}
                      onChange={handleHeroChange}
                      variant="outlined"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button 
                      variant="contained" 
                      onClick={updateHeroSection}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Update Hero Section'}
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
            
            {/* Blog Management Tab */}
            {tabValue === 2 && (
              <>
                <Typography variant="h6" gutterBottom>
                  Add New Blog
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Blog Title"
                      name="title"
                      value={newBlog.title}
                      onChange={handleBlogChange}
                      variant="outlined"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Author"
                      name="author"
                      value={newBlog.author}
                      onChange={handleBlogChange}
                      variant="outlined"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Blog Content"
                      name="content"
                      value={newBlog.content}
                      onChange={handleBlogChange}
                      variant="outlined"
                      multiline
                      rows={6}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button 
                      variant="contained" 
                      onClick={addNewBlog}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Add Blog'}
                    </Button>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 4 }} />
                
                <Typography variant="h6" gutterBottom>
                  Existing Blogs
                </Typography>
                
                {blogs.length > 0 ? (
                  <Grid container spacing={3}>
                    {blogs.map((blog) => (
                      <Grid item xs={12} key={blog._id}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              {blog.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 2 }}>
                              {blog.content.substring(0, 200)}...
                </Typography>
                            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                              <Button size="small" variant="outlined">
                                Edit
                              </Button>
                              <Button size="small" variant="outlined" color="error">
                                Delete
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                    No blogs found.
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default AdminPanel;