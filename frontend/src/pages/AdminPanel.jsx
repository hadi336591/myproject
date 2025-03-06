import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
} from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';
import PropTypes from 'prop-types';

// Helper TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Define prop types
TabPanel.propTypes = {
  children: PropTypes.node,  // 'node' allows any renderable content
  value: PropTypes.number.isRequired, // 'value' is required and must be a number
  index: PropTypes.number.isRequired, // 'index' is required and must be a number
};
const AdminPanel = () => {
  const [tabIndex, setTabIndex] = useState(0);
  
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Dummy submit handlers (replace with real API calls)
  const handleVerifyDocuments = (e) => {
    e.preventDefault();
    // Handle document verification submission here
    alert('Document verified (dummy)!');
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    // Handle blog submission here
    alert('Blog post added (dummy)!');
  };

  const handleAddFeed = (e) => {
    e.preventDefault();
    // Handle new feed submission here
    alert('New feed added (dummy)!');
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 2 }}>
        <BackButton />
      </Container>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" align="center" sx={{ mb: 4, color: 'secondary.main' }}>
          Admin Panel
        </Typography>
        <Tabs value={tabIndex} onChange={handleChange} variant="fullWidth">
          <Tab label="Verify Documents" />
          <Tab label="Add Blog" />
          <Tab label="Add New Feed" />
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Verify Documents
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Upload a document to verify its authenticity.
          </Typography>
          <Box component="form" onSubmit={handleVerifyDocuments} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField fullWidth type="file" InputLabelProps={{ shrink: true }} />
            <Button type="submit" variant="contained" color="primary">
              Verify
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Blog Post
          </Typography>
          <Box component="form" onSubmit={handleAddBlog} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField fullWidth label="Title" variant="outlined" required />
            <TextField
              fullWidth
              label="Content"
              variant="outlined"
              multiline
              rows={4}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Add Blog
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={tabIndex} index={2}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add New Feed
          </Typography>
          <Box component="form" onSubmit={handleAddFeed} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField fullWidth label="Feed Title" variant="outlined" required />
            <TextField
              fullWidth
              label="Feed Content"
              variant="outlined"
              multiline
              rows={4}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Add Feed
            </Button>
          </Box>
        </TabPanel>
      </Container>
      <Footer />
    </>
  );
};

export default AdminPanel;
