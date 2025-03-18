import { useState, useEffect, useContext } from 'react';
import { 
  Container, Typography, Box, Paper, Grid, Divider, 
  Button, CircularProgress, Alert, Tabs, Tab, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Card, CardContent
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
  const [adminData, setAdminData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [heroContent, setHeroContent] = useState({
    title: '',
    subtitle: '',
    buttonText: ''
  });

  useEffect(() => {
    // Check if user is admin
    if (!auth || auth.user.role !== 'admin') {
      navigate('/login');
      return;
    }
    
    // Fetch admin dashboard data
    const fetchAdminData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        
        const data = await response.json();
        
        if (response.ok) {
          setAdminData(data);
          
          // Fetch hero content
          const heroResponse = await fetch('http://localhost:5000/api/admin/hero-content', {
            headers: {
              'Authorization': `Bearer ${auth.token}`
            }
          });
          
          if (heroResponse.ok) {
            const heroData = await heroResponse.json();
            setHeroContent(heroData);
          }
        } else {
          setError(data.message || 'Failed to fetch admin data');
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
    setActiveTab(newValue);
  };

  const handleHeroContentChange = (e) => {
    setHeroContent({
      ...heroContent,
      [e.target.name]: e.target.value
    });
  };

  const updateHeroContent = async () => {
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
        alert('Hero content updated successfully');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to update hero content');
      }
    } catch (err) {
      console.error('Error updating hero content:', err);
      alert('An error occurred while updating hero content');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Container sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress />
          <Typographyvariant="h6" sx={{ mt: 2 }}>
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
        
        {/* Dashboard Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="primary">
                Draw Applications
              </Typography>
              <Typography variant="h3">
                {adminData?.stats?.drawApplications || 0}
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="primary">
                Paid Applications
              </Typography>
              <Typography variant="h3">
                {adminData?.stats?.paidDrawApplications || 0}
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="primary">
                Users
              </Typography>
              <Typography variant="h3">
                {adminData?.stats?.users || 0}
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="primary">
                Blog Posts
              </Typography>
              <Typography variant="h3">
                {adminData?.stats?.blogs || 0}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Tabs for different sections */}
        <Paper elevation={3} sx={{ mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Draw Applications" />
            <Tab label="Hero Content" />
            <Tab label="Blog Posts" />
            <Tab label="News Feed" />
          </Tabs>
          
          {/* Draw Applications Tab */}
          {activeTab === 0 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Draw Applications
              </Typography>
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
                      <TableCell>Payment Method</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adminData?.applications?.map((app) => (
                      <TableRow key={app._id}>
                        <TableCell>
                          {new Date(app.drawEntryDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{app.fullName}</TableCell>
                        <TableCell>{app.passportNo}</TableCell>
                        <TableCell>{app.country}</TableCell>
                        <TableCell>{app.visaType}</TableCell>
                        <TableCell>
                          {app.paymentStatus ? 'Paid' : 'Pending'}
                        </TableCell>
                        <TableCell>
                          {app.paymentMethod || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="small" 
                            variant="outlined"
                            onClick={() => {
                              // View application details
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!adminData?.applications || adminData.applications.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          No applications found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          
          {/* Hero Content Tab */}
          {activeTab === 1 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Edit Hero Content
              </Typography>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        label="Title"
                        name="title"
                        value={heroContent.title}
                        onChange={handleHeroContentChange}
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Subtitle"
                        name="subtitle"
                        value={heroContent.subtitle}
                        onChange={handleHeroContentChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={2}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Button Text"
                        name="buttonText"
                        value={heroContent.buttonText}
                        onChange={handleHeroContentChange}
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        variant="contained" 
                        onClick={updateHeroContent}
                      >
                        Update Hero Content
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}
          
          {/* Blog Posts Tab */}
          {activeTab === 2 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Manage Blog Posts
              </Typography>
              <Button 
                variant="contained" 
                sx={{ mb: 3 }}
                onClick={() => {
                  // Open form to add new blog post
                }}
              >
                Add New Blog Post
              </Button>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell>Published</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adminData?.blogs?.map((blog) => (
                      <TableRow key={blog._id}>
                        <TableCell>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{blog.title}</TableCell>
                        <TableCell>{blog.author}</TableCell>
                        <TableCell>
                          {blog.isPublished ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="small" 
                            variant="outlined"
                            sx={{ mr: 1 }}
                            onClick={() => {
                              // Edit blog post
                            }}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            color="error"
                            onClick={() => {
                              // Delete blog post
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!adminData?.blogs || adminData.blogs.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No blog posts found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          
          {/* News Feed Tab */}
          {activeTab === 3 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Manage News Feed
              </Typography>
              <Button 
                variant="contained" 
                sx={{ mb: 3 }}
                onClick={() => {
                  // Open form to add new news feed
                }}
              >
                Add News Item
              </Button>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Published</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adminData?.newsFeeds?.map((news) => (
                      <TableRow key={news._id}>
                        <TableCell>
                          {new Date(news.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{news.title}</TableCell>
                        <TableCell>
                          {news.isPublished ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="small" 
                            variant="outlined"
                            sx={{ mr: 1 }}
                            onClick={() => {
                              // Edit news feed
                            }}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            color="error"
                            onClick={() => {
                              // Delete news feed
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!adminData?.newsFeeds || adminData.newsFeeds.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No news items found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default AdminPanel;