import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const SafepayCheckout = ({ checkoutUrl }) => {
  if (!checkoutUrl) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <iframe
      src={checkoutUrl}
      width="100%"
      height="100%"
      frameBorder="0"
      allow="payment"
      title="Safepay Checkout"
    />
  );
};

export default SafepayCheckout;