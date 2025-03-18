import { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';

const Countdown = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const timeUnits = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' }
  ];

  return (
    <Grid container spacing={2} justifyContent="center">
      {timeUnits.map((unit, index) => (
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
              {unit.value < 10 ? `0${unit.value}` : unit.value}
            </Typography>
            <Typography variant="caption">{unit.label}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Countdown;