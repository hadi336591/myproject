import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import FlightIcon from '@mui/icons-material/Flight';

const visaCategories = [
  {
    title: 'Working Visas',
    description: 'Work visa is only valid for a short period of time; depending on the nation, you must either renew it or go back to your home country when it expires.',
    icon: <WorkIcon sx={{ fontSize: 40, color: 'white' }} />,
    image: 'https://nileconsultant.com/wp-content/uploads/2020/08/support-1.jpg',
  },
  {
    title: 'Business Visa',
    description: 'We provide business visas for those people who want to grow their business internationally.',
    icon: <BusinessIcon sx={{ fontSize: 40, color: 'white' }} />,
    image: 'https://nileconsultant.com/wp-content/uploads/2022/06/business_visa_360x300.jpg',
  },
  {
    title: 'Tourists Visa',
    description: 'A tourist visa is a conditional permission provided by a region to a foreigner to enter, stay in, or leave that country.',
    icon: <FlightIcon sx={{ fontSize: 40, color: 'white' }} />,
    image: 'https://nileconsultant.com/wp-content/uploads/2024/03/service-11.png',
  },
];

const VisaCategories = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#F8F9FA' }}>
      <Container maxWidth="lg">
        <Typography variant="subtitle2" sx={{ letterSpacing: 1, color: 'gray', textAlign: 'center' }}>
          HOW WE HELP OUR CLIENTS
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mt: 1 }}>
          Level With Great Visa Serving Policies
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 2, color: 'gray' }}>
          We provide a team of professionals who maintain excellence in everything they do, are service-oriented when dealing with their customers, and set high standards for themselves.
        </Typography>
        <Box sx={{ width: 50, height: 4, backgroundColor: '#d32f2f', mx: 'auto', my: 3 }}></Box>

        <Grid container spacing={4} sx={{ mt: 3 }}>
          {visaCategories.map((visa, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 3, borderRadius: 3, overflow: 'hidden' }}>
                <CardMedia component="img" height="250" image={visa.image} alt={visa.title} />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#001E3C',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    position: 'relative',
                    top: '-30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    boxShadow: 2,
                  }}
                >
                  {visa.icon}
                </Box>
                <CardContent sx={{ textAlign: 'center', pt: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{visa.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>{visa.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default VisaCategories;
