import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Typography } from '@mui/material';

const carouselItems = [
  {
    image: 'https://nileconsultant.com/wp-content/uploads/2022/06/spain_1024x724.jpg',
    title: 'Explore Spain',
    description: 'Experience the vibrant culture and stunning architecture of Spain.',
  },
  {
    image: 'https://nileconsultant.com/wp-content/uploads/2020/07/immigration-1.jpg',
    title: 'Discover the United States',
    description: 'Unlock opportunities in the land of dreams.',
  },
  {
    image: 'https://nileconsultant.com/wp-content/uploads/2020/08/immigration-2.jpg',
    title: 'Visit Canada',
    description: 'Enjoy the breathtaking landscapes and welcoming communities.',
  },
  {
    image: 'https://nileconsultant.com/wp-content/uploads/2020/07/germany.jpg',
    title: 'Travel to Germany',
    description: 'Dive into the rich history and modern innovation of Germany.',
  },
  {
    image: 'https://nileconsultant.com/wp-content/uploads/2020/07/france.jpg',
    title: 'Experience France',
    description: 'Indulge in the art, cuisine, and romance of France.',
  },
];

const HeroCarousel = () => {
  return (
    <Carousel
      indicators={true}
      animation="fade"
      navButtonsAlwaysVisible={true}
      sx={{
        height: '70vh',
        '& .MuiPaper-root': {
          backgroundColor: 'transparent',
        },
      }}
    >
      {carouselItems.map((item, index) => (
        <Box
          key={index}
          sx={{
            height: '70vh',
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            {item.title}
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', maxWidth: '600px' }}>
            {item.description}
          </Typography>
          {item.children && (
            <Box sx={{ mt: 2 }}>
              {item.children}
            </Box>
          )}
        </Box>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;