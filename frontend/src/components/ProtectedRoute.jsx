import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!auth) {
    // Pass the current location to the login page so it can redirect back after login
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;