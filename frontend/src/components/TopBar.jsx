import { Box, Container, Typography, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const TopBar = () => {
  return (
    <Box sx={{ bgcolor: '#212121', color: 'white', py: 1 }}>
      <Container>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                info@visaservices.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                +92 300 1234567
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color="inherit" size="small">
              <FacebookIcon fontSize="small" />
            </IconButton>
            <IconButton color="inherit" size="small">
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton color="inherit" size="small">
              <InstagramIcon fontSize="small" />
            </IconButton>
            <IconButton color="inherit" size="small">
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TopBar;