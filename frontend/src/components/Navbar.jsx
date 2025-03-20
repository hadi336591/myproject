import { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AdminPanelSettings } from '@mui/icons-material';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Check if user is logged in and their role
  const isRegularUser = auth && auth.user && auth.user.role !== 'admin';
  const isAdmin = auth && auth.user && auth.user.role === 'admin';

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
            VisaApply
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          
          {/* Show different navigation options based on user role */}
          {isAdmin ? (
            // Admin navigation
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/admin"
                startIcon={<AdminPanelSettings />}
              >
                Admin Panel
              </Button>
              <Button color="inherit" component={Link} to="/blog">Blog</Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  '&:hover': { backgroundColor: "#b71c1c" },
                }}
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            // Regular user or not logged in navigation
            <>
              <Button color="inherit" component={Link} to="/apply">Services</Button>
              {isRegularUser && (
                <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
              )}
              <Button color="inherit" component={Link} to="/blog">Blog</Button>
              <Button color="inherit" component={Link} to="/contact">Contact</Button>
              {isRegularUser ? (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    '&:hover': { backgroundColor: "#b71c1c" },
                  }}
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  Logout
                </Button>
              ) : !auth ? (
                <>
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                </>
              ) : null}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;