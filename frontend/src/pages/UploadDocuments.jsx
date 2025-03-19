import { useState, useContext, useEffect } from 'react';
import { 
  Container, Typography, Button, Box, Paper, Grid, 
  CircularProgress, Alert, Divider, List, ListItem,
  ListItemIcon, ListItemText, Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';
import { AuthContext } from '../context/AuthContext';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const UploadDocuments = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [application, setApplication] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [files, setFiles] = useState({
    passport: null,
    photo: null,
    financialProof: null,
    travelItinerary: null,
    accommodationProof: null,
    additionalDocument: null
  });
  const [fileErrors, setFileErrors] = useState({
    passport: '',
    photo: '',
    financialProof: '',
    travelItinerary: '',
    accommodationProof: '',
    additionalDocument: ''
  });

  useEffect(() => {
    // Check if user is logged in
    if (!auth) {
      navigate('/login', { state: { from: '/upload-documents' } });
      return;
    }
    
    // Fetch user's application
    const fetchApplication = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        
        const data = await response.json();
        
        if (response.ok && data.application) {
          setApplication(data.application);
          
          // If documents are already uploaded, set them
          if (data.application.documents && data.application.documents.length > 0) {
            setUploadedDocuments(data.application.documents);
          }
        } else if (!data.application) {
          setError('No application found. Please submit an application form first.');
        } else {
          setError(data.message || 'Failed to fetch application data');
        }
      } catch (err) {
        console.error('Error fetching application:', err);
        setError('An error occurred while fetching your application data');
      }
    };
    
    fetchApplication();
  }, [auth, navigate]);

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setFileErrors({
          ...fileErrors,
          [name]: 'Only JPG, PNG, and PDF files are allowed'
        });
        return;
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setFileErrors({
          ...fileErrors,
          [name]: 'File size must be less than 5MB'
        });
        return;
      }
      
      // Clear any previous errors
      setFileErrors({
        ...fileErrors,
        [name]: ''
      });
      
      // Set the file
      setFiles({
        ...files,
        [name]: file
      });
    }
  };

  const handleUpload = async () => {
    // Check if at least passport and photo are uploaded
    if (!files.passport || !files.photo) {
      setError('Passport copy and photo are required documents');
      return;
    }
    
    // Check for file errors
    const hasErrors = Object.values(fileErrors).some(error => error !== '');
    if (hasErrors) {
      setError('Please fix the file errors before uploading');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Create form data for file upload
    const formData = new FormData();
    formData.append('applicationId', application._id);
    
    // Append all files that are not null
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });
    
    try {
      const response = await fetch('http://localhost:5000/api/visa-application/upload-documents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess('Documents uploaded successfully!');
        setUploadedDocuments(data.documents || []);
        
        // Redirect to payment page after a short delay
        setTimeout(() => {
          navigate('/payment');
        }, 2000);
      } else {
        setError(data.message || 'Failed to upload documents');
      }
    } catch (err) {
      console.error('Error uploading documents:', err);
      setError('An error occurred while uploading your documents');
    } finally {
      setLoading(false);
    }
  };

  if (!auth) {
    return null; // Don't render anything if not authenticated (will redirect in useEffect)
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <BackButton />
      </Container>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            Upload Documents
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}
          
          {!application ? (
            <Alert severity="info">
              No application found. Please submit an application form first.
              <Button 
                variant="contained" 
                size="small" 
                sx={{ ml: 2 }}
                onClick={() => navigate('/apply')}
              >
                Apply Now
              </Button>
            </Alert>
          ) : (
            <>
              <Typography variant="body1" paragraph>
                Please upload the following documents to proceed with your visa application. All documents should be clear and in JPG, PNG, or PDF format (max 5MB each).
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Passport Copy (First & Last Page) *
                    </Typography>
                    <input
                      accept="image/jpeg,image/png,image/jpg,application/pdf"
                      type="file"
                      name="passport"
                      onChange={handleFileChange}
                      style={{ marginBottom: '8px' }}
                    />
                    {fileErrors.passport && (
                      <Typography color="error" variant="caption" display="block">
                        {fileErrors.passport}
                      </Typography>
                    )}
                    {uploadedDocuments.find(doc => doc.type === 'passport') && (
                      <Chip 
                        icon={<CheckCircleIcon />} 
                        label="Uploaded" 
                        color="success" 
                        size="small" 
                        sx={{ mt: 1 }} 
                      />
                    )}
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Recent Passport Size Photo *
                    </Typography>
                    <input
                      accept="image/jpeg,image/png,image/jpg"
                      type="file"
                      name="photo"
                      onChange={handleFileChange}
                      style={{ marginBottom: '8px' }}
                    />
                    {fileErrors.photo && (
                      <Typography color="error" variant="caption" display="block">
                        {fileErrors.photo}
                      </Typography>
                    )}
                    {uploadedDocuments.find(doc => doc.type === 'photo') && (
                      <Chip 
                        icon={<CheckCircleIcon />} 
                        label="Uploaded" 
                        color="success" 
                        size="small" 
                        sx={{ mt: 1 }} 
                      />
                    )}
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Financial Proof (Bank Statement)
                    </Typography>
                    <input
                      accept="image/jpeg,image/png,image/jpg,application/pdf"
                      type="file"
                      name="financialProof"
                      onChange={handleFileChange}
                      style={{ marginBottom: '8px' }}
                    />
                    {fileErrors.financialProof && (
                      <Typography color="error" variant="caption" display="block">
                        {fileErrors.financialProof}
                      </Typography>
                    )}
                    {uploadedDocuments.find(doc => doc.type === 'financialProof') && (
                      <Chip 
                        icon={<CheckCircleIcon />} 
                        label="Uploaded" 
                        color="success" 
                        size="small" 
                        sx={{ mt: 1 }} 
                      />
                    )}
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Travel Itinerary / Flight Booking
                    </Typography>
                    <input
                      accept="image/jpeg,image/png,image/jpg,application/pdf"
                      type="file"
                      name="travelItinerary"
                      onChange={handleFileChange}
                      style={{ marginBottom: '8px' }}
                    />
                    {fileErrors.travelItinerary && (
                      <Typography color="error" variant="caption" display="block">
                        {fileErrors.travelItinerary}
                      </Typography>
                    )}
                    {uploadedDocuments.find(doc => doc.type === 'travelItinerary') && (
                      <Chip 
                        icon={<CheckCircleIcon />} 
                        label="Uploaded" 
                        color="success" 
                        size="small" 
                        sx={{ mt: 1 }} 
                      />
                    )}
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Accommodation Proof / Hotel Booking
                    </Typography>
                    <input
                      accept="image/jpeg,image/png,image/jpg,application/pdf"
                      type="file"
                      name="accommodationProof"
                      onChange={handleFileChange}
                      style={{ marginBottom: '8px' }}
                    />
                    {fileErrors.accommodationProof && (
                      <Typography color="error" variant="caption" display="block">
                        {fileErrors.accommodationProof}
                      </Typography>
                    )}
                    {uploadedDocuments.find(doc => doc.type === 'accommodationProof') && (
                      <Chip 
                        icon={<CheckCircleIcon />} 
                        label="Uploaded" 
                        color="success" 
                        size="small" 
                        sx={{ mt: 1 }} 
                      />
                    )}
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Additional Document (if any)
                    </Typography>
                    <input
                      accept="image/jpeg,image/png,image/jpg,application/pdf"
                      type="file"
                      name="additionalDocument"
                      onChange={handleFileChange}
                      style={{ marginBottom: '8px' }}
                    />
                    {fileErrors.additionalDocument && (
                      <Typography color="error" variant="caption" display="block">
                        {fileErrors.additionalDocument}
                      </Typography>
                    )}
                    {uploadedDocuments.find(doc => doc.type === 'additionalDocument') && (
                      <Chip 
                        icon={<CheckCircleIcon />} 
                        label="Uploaded" 
                        color="success" 
                        size="small" 
                        sx={{ mt: 1 }} 
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="caption" color="text.secondary">
                  * Required documents
                </Typography>
              </Box>
              
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  disabled={loading || uploadedDocuments.length >= 2}
                  fullWidth
                  size="large"
                  sx={{ py: 1.5 }}
                >
                  {loading ? <CircularProgress size={24} /> : 
                   uploadedDocuments.length >= 2 ? 'Documents Already Uploaded' : 'Upload Documents'}
                </Button>
                
                {uploadedDocuments.length >= 2 && (
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/payment')}
                    fullWidth
                    size="large"
                    sx={{ mt: 2, py: 1.5 }}
                  >
                    Proceed to Payment
                  </Button>
                )}
              </Box>
            </>
          )}
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default UploadDocuments;