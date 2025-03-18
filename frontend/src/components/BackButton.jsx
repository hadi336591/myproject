import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button 
      startIcon={<ArrowBackIcon />} 
      onClick={() => navigate(-1)}
      sx={{ mb: 2 }}
    >
      Back
    </Button>
  );
};

export default BackButton;