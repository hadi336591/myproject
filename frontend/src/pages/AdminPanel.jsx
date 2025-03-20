import { useState, useEffect, useContext } from 'react';
import { 
  Container, Typography, Box, Paper, Grid, Alert, 
  Button, CircularProgress, Tabs, Tab, 
  TextField, Card, CardContent, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow,
  Chip, Divider
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
    if (!auth?.user?.role) {
      navigate('/admin-login');
      return;
    }
    
    if (auth.user.role !== 'admin') {
      navigate('/admin-login');
      return;
    }

    const fetchAdminData = async () => {
      try {
        const [adminResponse, heroResponse] = await Promise.all([
          fetch('http://localhost:5000/api/admin', {
            headers: { 'Authorization': `Bearer ${auth.token}` }
          }),
          fetch('http://localhost:5000/api/admin/hero-content', {
            headers: { 'Authorization': `Bearer ${auth.token}` }
          })
        ]);

        const [adminData, heroData] = await Promise.all([
          adminResponse.json(),
          heroResponse.json()
        ]);

        if (adminResponse.ok) {
          setAdminData(adminData);
        }
        else setError(adminData.message || 'Failed to fetch admin data');

        if (heroResponse.ok) setHeroContent(heroData);

      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('An error occurred while fetching admin data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [auth, navigate]);

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

      if (response.ok) alert('Hero content updated successfully');
      else {
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
        
        {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

        {/* Monthly Stats */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Last 30 Days Statistics
          </Typography>
          <Grid container spacing={3}>
            {[
              { 
                title: "New Applications", 
                value: adminData?.monthlyStats?.applications || 0, 
                color: "#1976d2" 
              },
              { 
                title: "Paid Applications", 
                value: adminData?.monthlyStats?.paidApplications || 0, 
                color: "#2e7d32" 
              },
              { 
                title: "Revenue", 
                value: `${(adminData?.monthlyStats?.revenue || 0).toLocaleString()} PKR`, 
                color: "#f57c00" 
              },
              { 
                title: "New Users", 
                value: adminData?.monthlyStats?.newUsers || 0, 
                color: "#7b1fa2" 
              }
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', backgroundColor: stat.color, color: 'white' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6">{stat.title}</Typography>
                    <Typography variant="h4" sx={{ mt: 2 }}>{stat.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Dashboard Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { title: "Total Applications", value: adminData?.stats?.drawApplications || 0 },
            { title: "Total Paid", value: adminData?.stats?.paidDrawApplications || 0 },
            { title: "Total Users", value: adminData?.stats?.users || 0 },
            { title: "Blog Posts", value: adminData?.stats?.blogs || 0 }
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="primary">{stat.title}</Typography>
                <Typography variant="h3">{stat.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Tabs for Different Sections */}
        <Paper elevation={3} sx={{ mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={(_, newValue) => setActiveTab(newValue)}
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
              {adminData?.applications?.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Visa Type</TableCell>
                        <TableCell>Payment Status</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell>Documents</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {adminData.applications.map((app) => (
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
                            {app.paymentMethod || 'N/A'}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              {app.passportPhoto && (
                                <Button 
                                  size="small" 
                                  variant="outlined"
                                  href={`http://localhost:5000/${app.passportPhoto}`}
                                  target="_blank"
                                >
                                  Photo
                                </Button>
                              )}
                              {app.passportScan && (
                                <Button 
                                  size="small" 
                                  variant="outlined"
                                  href={`http://localhost:5000/${app.passportScan}`}
                                  target="_blank"
                                >
                                  Passport
                                </Button>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Alert severity="info">No applications found</Alert>
              )}
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
                  {["title", "subtitle", "buttonText"].map((field) => (
                    <TextField
                      key={field}
                      label={field.replace(/([A-Z])/g, " $1").trim()}
                      name={field}
                      value={heroContent[field]}
                      onChange={(e) => setHeroContent({ ...heroContent, [e.target.name]: e.target.value })}
                      fullWidth
                      margin="normal"
                      multiline={field === "subtitle"}
                      rows={field === "subtitle" ? 2 : 1}
                    />
                  ))}
                  <Button variant="contained" onClick={updateHeroContent}>
                    Update Hero Content
                  </Button>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Blog Posts Tab */}
          {activeTab === 2 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Blog Posts
              </Typography>
              {adminData?.blogs?.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Author</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {adminData.blogs.map((blog) => (
                        <TableRow key={blog._id}>
                          <TableCell>
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{blog.title}</TableCell>
                          <TableCell>{blog.author}</TableCell>
                          <TableCell>
                            <Button 
                              size="small" 
                              variant="outlined"
                              href={`/blog/${blog._id}`}
                              target="_blank"
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
                <Alert severity="info">No blog posts found</Alert>
              )}
            </Box>
          )}

          {/* News Feed Tab */}
          {activeTab === 3 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                News Feed
              </Typography>
              {adminData?.newsFeeds?.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {adminData.newsFeeds.map((feed) => (
                        <TableRow key={feed._id}>
                          <TableCell>
                            {new Date(feed.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{feed.title}</TableCell>
                          <TableCell>
                            <Button 
                              size="small" 
                              variant="outlined"
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
                <Alert severity="info">No news feeds found</Alert>
              )}
            </Box>
          )}
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default AdminPanel;