import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

const Countdown = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = seconds => {
    const days = Math.floor(seconds / (60 * 60 * 24)).toString().padStart(2, '0');
    const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60)).toString().padStart(2, '0');
    const mins = Math.floor((seconds % (60 * 60)) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${days}d ${hours}h ${mins}m ${secs}s`;
  };

  return (
    <Typography variant="h6" color="warning.main">
      {formatTime(timeLeft)}
    </Typography>
  );
};

Countdown.propTypes = {
  duration: PropTypes.number.isRequired,
};

export default Countdown;