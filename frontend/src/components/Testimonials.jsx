import { useState } from 'react';
import { Container, Typography, Box, Paper, Avatar, Rating, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const testimonials = [
  {
    id: 1,
    name: 'Ahmed Khan',
    avatar: 'https://nileconsultant.com/wp-content/uploads/2022/06/man_ph.jpg',
    rating: 5,
    text: 'The visa application process was smooth and hassle-free. The team guided me through every step and I got my visa approved in record time!',
    country: 'Canada Visa'
  },
  {
    id: 2,
    name: 'Fatima Ali',
    avatar: 'https://nileconsultant.com/wp-content/uploads/2022/06/women-place-holder.jpg',
    rating: 5,
    text: 'I won the lucky draw and got my visa processing for free! The team was professional and helped me with all the documentation.',
    country: 'UK Visa'
  },
  {
    id: 3,
    name: 'Muhammad Usman',
    avatar: 'https://nileconsultant.com/wp-content/uploads/2022/06/man_ph.jpg',
    rating: 4,
    text: 'Great service and support. They made the complex visa process simple and understandable. Highly recommended!',
    country: 'Australia Visa'
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Box sx={{ py: 8, bgcolor: '#f8f9fa' }}>
      <Container maxWidth="md">
        <Typography variant="subtitle2" sx={{ letterSpacing: 1, color: 'gray', mb: 1, textAlign: 'center' }}>
          TESTIMONIALS
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
          What Our Clients Say
        </Typography>
        <Box sx={{ width: 50, height: 4, backgroundColor: '#d32f2f', mx: 'auto', mb: 4 }}></Box>

        <Box sx={{ position: 'relative' }}>
          <IconButton 
            sx={{ 
              position: 'absolute', 
              left: -20, 
              top: '50%', 
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: 2,
              '&:hover': { bgcolor: '#f5f5f5' }
            }}
            onClick={handlePrev}
          >
            <ArrowBackIos />
          </IconButton>

          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              borderRadius: 2,
              mx: 5
            }}
          >
            <Avatar 
              src={currentTestimonial.avatar} 
              alt={currentTestimonial.name}
              sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>
              {currentTestimonial.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {currentTestimonial.country}
            </Typography>
            <Rating value={currentTestimonial.rating} readOnly sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              &quot;{currentTestimonial.text}&quot;
            </Typography>
          </Paper>

          <IconButton 
            sx={{ 
              position: 'absolute', 
              right: -20, 
              top: '50%', 
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: 2,
              '&:hover': { bgcolor: '#f5f5f5' }
            }}
            onClick={handleNext}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;