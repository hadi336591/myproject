import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const testimonials = [
  {
    name: 'Muhammad Hussain',
    review:
      'Quick response on messenger and delight to talk Mr. Sameer on phone about my case. Positive and very much reasonable person. May Allah give you more success and bless you. Special Thanks to All for being very kind and Cooperative.',
    avatar: '/assets/avatar1.png', // Replace with actual avatar
  },
  {
    name: 'Areej Fatima',
    review:
      'It was a nice experience journey with Nile Travels For My Journey. Provided me with a very comfortable and excellent stay. Excellent service with a nice and helpful staff.',
    avatar: '/assets/avatar2.png', // Replace with actual avatar
  },
];

const Testimonials = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#F8F9FA' }}>
      <Container maxWidth="lg">
        <Typography variant="subtitle2" sx={{ textAlign: 'center', color: 'gray', letterSpacing: 1 }}>
          CLIENTS TESTIMONIALS
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mt: 1 }}>
          What Customers Are Saying About Us
        </Typography>
        <Box sx={{ width: 50, height: 4, backgroundColor: '#d32f2f', mx: 'auto', my: 3 }}></Box>

        <Grid container spacing={4} sx={{ mt: 3 }}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ boxShadow: 3, borderRadius: 3, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={testimonial.avatar} sx={{ width: 56, height: 56 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {testimonial.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} sx={{ color: '#ff9800', fontSize: 18 }} />
                  ))}
                </Box>
                <CardContent sx={{ p: 0, mt: 2 }}>
                  <Typography variant="body2" sx={{ color: 'gray' }}>
                    {testimonial.review}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
