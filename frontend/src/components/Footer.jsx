import { Box, Container, Grid, TextField, Button, IconButton, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, RssFeed, Email, AdminPanelSettings } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Footer = () => {
const { auth } = useContext(AuthContext);
const navigate = useNavigate();
const isAdmin = auth && auth.user && auth.user.role === 'admin';

const handleAdminLoginClick = () => {
navigate('/admin-login');
};

return (
<Box sx={{ 
backgroundColor: '#001f3f', 
color: 'white', 
py: 6,
position: 'relative',
overflow: 'hidden',
}}>
<Container maxWidth="lg">
{/* Logo and Description */}
<Grid container spacing={4} justifyContent="center" textAlign="center">
<Grid item xs={12} md={3}>
<Box component="img" src="/logo.png" alt="VisaEase Consultant" sx={{ width: 200, mb: 2 }} />
<Typography variant="body2" sx={{ mb: 3 }}>
Make your dreams come true. Join our team of experts for Visa advice and visit the most beautiful places around the world. We offer Visa consultancy, Tourism Visa & Immigration Services.
</Typography>
<Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
<IconButton color="inherit" size="small">
<Twitter />
</IconButton>
<IconButton color="inherit" size="small">
<Facebook />
</IconButton>
<IconButton color="inherit" size="small">
<Instagram />
</IconButton>
<IconButton color="inherit" size="small">
<LinkedIn />
</IconButton>
</Box>
</Grid>

{/* Quick Links */}
<Grid item xs={12} md={3}>
<Typography variant="h6" gutterBottom>
Quick Links
</Typography>
<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
<Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link>
<Link to="/faqs" style={{ color: 'white', textDecoration: 'none' }}>FAQs</Link>
<Link to="/team" style={{ color: 'white', textDecoration: 'none' }}>Our Team</Link>
<Link to="/services" style={{ color: 'white', textDecoration: 'none' }}>Services</Link>
<Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</Link>
{isAdmin && (
<Link to="/admin" style={{ color: '#ff9800', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1 }}>
<AdminPanelSettings fontSize="small" />
Admin Panel
</Link>
)}
</Box>
</Grid>

{/* Services */}
<Grid item xs={12} md={3}>
<Typography variant="h6" gutterBottom>
Services
</Typography>
<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
<Link to="/visas/business" style={{ color: 'white', textDecoration: 'none' }}>Business Visas</Link>
<Link to="/visas/working" style={{ color: 'white', textDecoration: 'none' }}>Working Visas</Link>
<Link to="/visas/immigration" style={{ color: 'white', textDecoration: 'none' }}>Immigration Visas</Link>
<Link to="/visas/tourist" style={{ color: 'white', textDecoration: 'none' }}>Tourists Visas</Link>
</Box>
</Grid>

{/* Newsletter */}
<Grid item xs={12} md={3}>
<Typography variant="h6" gutterBottom>
Newsletter Signup
</Typography>
<Typography variant="body2" sx={{ mb: 2 }}>
Enter your email address to get latest updates and offers from us.
</Typography>
<Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
<TextField
size="small"
placeholder="Email address"
sx={{
backgroundColor: 'rgba(255,255,255,0.1)',
input: { color: 'white' },
'& .MuiOutlinedInput-root': {
'& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
}
}}
/>
<Button 
variant="contained" 
sx={{ 
backgroundColor: '#ff9800',
'&:hover': { backgroundColor: '#f57c00' }
}}
>
→
</Button>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
<IconButton color="inherit" size="small">
<RssFeed />
</IconButton>
<IconButton color="inherit" size="small">
<Email />
</IconButton>
<IconButton color="inherit" size="small">
<Facebook />
</IconButton>
<IconButton color="inherit" size="small">
<Twitter />
</IconButton>
</Box>
</Grid>
</Grid>

{/* Bottom Links */}
<Box sx={{ 
mt: 4, 
pt: 3, 
borderTop: '1px solid rgba(255,255,255,0.1)',
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
flexWrap: 'wrap',
textAlign: 'center'
}}>
<Typography variant="body2" sx={{ width: { xs: '100%', md: 'auto' }, mb: { xs: 2, md: 0 } }}>
© 2023 VisaEase CONSULTANT Immigration Expert (Pvt) Ltd. All rights reserved.
</Typography>
<Box sx={{ 
display: 'flex', 
gap: 3,
width: { xs: '100%', md: 'auto' },
justifyContent: { xs: 'center', md: 'flex-end' },
alignItems: 'center'
}}>
<Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
<Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</Link>
<Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</Link>
<Button 
variant="outlined" 
size="small"
startIcon={<AdminPanelSettings />}
onClick={handleAdminLoginClick}
sx={{ 
color: 'white', 
borderColor: 'rgba(255,255,255,0.3)',
'&:hover': { 
backgroundColor: 'rgba(255,255,255,0.1)',
borderColor: 'white'
}
}}
>
Admin Login
</Button>
</Box>
</Box>
</Container>
</Box>
);
};

export default Footer;