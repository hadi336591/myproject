import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

const slides = [
  {
    url: 'https://nileconsultant.com/wp-content/uploads/2020/07/immigration-1.jpg',
    title: 'United States'
  },
  {
    url: 'https://nileconsultant.com/wp-content/uploads/2020/08/immigration-2.jpg',
    title: 'Canada'
  },
  {
    url: 'https://nileconsultant.com/wp-content/uploads/2022/06/spain_1024x724.jpg',
    title: 'Spain'
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }
      }}
    >
      {slides.map((slide, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }
          }}
        >
          <img src={slide.url} alt={slide.title} />
        </Box>
      ))}
    </Box>
  );
};

export default HeroCarousel;