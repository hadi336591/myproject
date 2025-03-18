import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';

const Countdown = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration); // Reset countdown when duration prop changes
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => Math.max(0, prevTime - 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <Grid container spacing={2} justifyContent="center">
      {[{ value: days, label: 'Days' },
        { value: hours, label: 'Hours' },
        { value: minutes, label: 'Minutes' },
        { value: seconds, label: 'Seconds' }].map((unit, index) => (
          <Grid item key={index}>
            <Box
              sx={{
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                borderRadius: 1,
                p: 1,
                minWidth: 70,
                textAlign: 'center'
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {formatTime(unit.value)}
              </Typography>
              <Typography variant="caption">{unit.label}</Typography>
            </Box>
          </Grid>
        ))}
    </Grid>
  );
};

// Define PropTypes for the component
Countdown.propTypes = {
  duration: PropTypes.number.isRequired,
};

export default Countdown;
