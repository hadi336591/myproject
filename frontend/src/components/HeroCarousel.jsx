import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

const images = [
'https://nileconsultant.com/wp-content/uploads/2020/07/slider-1.jpg',
'https://nileconsultant.com/wp-content/uploads/2020/07/slider-2.jpg',
'https://nileconsultant.com/wp-content/uploads/2020/07/slider-3.jpg'
];

const HeroCarousel = () => {
const [currentImage, setCurrentImage] = useState(0);

useEffect(() => {
const interval = setInterval(() => {
setCurrentImage((prev) => (prev + 1) % images.length);
}, 5000);

return () => clearInterval(interval);
}, []);

return (
<Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
{images.map((image, index) => (
<Box
key={index}
sx={{
position: 'absolute',
top: 0,
left: 0,
width: '100%',
height: '100%',
backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${image})`,
backgroundSize: 'cover',
backgroundPosition: 'center',
opacity: currentImage === index ? 1 : 0,
transition: 'opacity 1s ease-in-out',
zIndex: 1
}}
/>
))}
</Box>
);
};

export default HeroCarousel;