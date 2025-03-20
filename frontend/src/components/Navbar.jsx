import { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Only show user-related content if the user is not an admin
  const isRegularUser = auth && auth.user && auth.user.role !== 'admin';

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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;