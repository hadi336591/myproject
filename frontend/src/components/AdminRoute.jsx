import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const AdminRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!auth) {
    return <Navigate to="/login" state={{ from: '/admin' }} replace />;
  }

  if (!auth.user || auth.user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// PropTypes validation
AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
