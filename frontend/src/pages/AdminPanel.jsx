import { useState, useEffect, useContext } from 'react';
import { 
  Container, Typography, Box, Paper, Grid, Alert, 
  Button, CircularProgress, Tabs, Tab, 
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
    if (!auth?.user?.role) return; // Avoid accessing undefined auth data
    
    if (auth.user.role !== 'admin') {
      navigate('/login');
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

        if (adminResponse.ok) setAdminData(adminData);
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

        {/* Dashboard Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { title: "Draw Applications", value: adminData?.stats?.drawApplications || 0 },
            { title: "Paid Applications", value: adminData?.stats?.paidDrawApplications || 0 },
            { title: "Users", value: adminData?.stats?.users || 0 },
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
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default AdminPanel;
