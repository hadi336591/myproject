import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#424242', py: 2, mt: 4 }}>
      <Typography variant="body2" align="center" color="white">
        &copy; 2025 VisaEase. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
