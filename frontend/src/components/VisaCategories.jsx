import { Container, Typography, Grid, Box, Paper } from '@mui/material';
import { Work, School, FlightTakeoff, Business, FamilyRestroom, Apartment } from '@mui/icons-material';

const categories = [
  { icon: Work, title: 'Work Visa', description: 'For those seeking employment opportunities abroad' },
  { icon: School, title: 'Student Visa', description: 'For students pursuing education in foreign countries' },
  { icon: FlightTakeoff, title: 'Tourist Visa', description: 'For travelers visiting countries for leisure and tourism' },
  { icon: Business, title: 'Business Visa', description: 'For business professionals attending meetings or conferences' },
  { icon: FamilyRestroom, title: 'Family Visa', description: 'For joining family members residing abroad' },
  { icon: Apartment, title: 'Immigration', description: 'For permanent residency and citizenship applications' }
];

const VisaCategories = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="subtitle2" sx={{ letterSpacing: 1, color: 'gray', mb: 1, textAlign: 'center' }}>
          OUR SERVICES
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
          Visa Categories We Handle
        </Typography>
        <Box sx={{ width: 50, height: 4, backgroundColor: '#d32f2f', mx: 'auto', mb: 4 }}></Box>

        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box 
                  sx={{ 
                    bgcolor: '#f5f5f5', 
                    borderRadius: '50%', 
                    p: 2, 
                    mb: 2,
                    color: '#d32f2f'
                  }}
                >
                  <category.icon fontSize="large" />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {category.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default VisaCategories;