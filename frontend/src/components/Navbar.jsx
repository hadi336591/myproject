import { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);
  
  const handleServicesMenuOpen = (event) => {
    setServicesAnchorEl(event.currentTarget);
  };
  
  const handleServicesMenuClose = () => {
    setServicesAnchorEl(null);
  };

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
          
          {/* Services Dropdown */}
          <Button 
            color="inherit" 
            onClick={handleServicesMenuOpen}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Services
          </Button>
          <Menu
            anchorEl={servicesAnchorEl}
            open={Boolean(servicesAnchorEl)}
            onClose={handleServicesMenuClose}
            sx={{ 
              '& .MuiPaper-root': { 
                backgroundColor: '#333',
                color: 'white',
                minWidth: '200px'
              }
            }}
          >
            <MenuItem 
              onClick={() => {
                navigate('/services/business-visa');
                handleServicesMenuClose();
              }}
              sx={{ '&:hover': { backgroundColor: '#444' } }}
            >
              Business Visa
            </MenuItem>
            <MenuItem 
              onClick={() => {
                navigate('/services/immigration-visa');
                handleServicesMenuClose();
              }}
              sx={{ '&:hover': { backgroundColor: '#444' } }}
            >
              Immigration Visa
            </MenuItem>
            <MenuItem 
              onClick={() => {
                navigate('/services/tourists-visa');
                handleServicesMenuClose();
              }}
              sx={{ '&:hover': { backgroundColor: '#444' } }}
            >
              Tourists Visa
            </MenuItem>
            <MenuItem 
              onClick={() => {
                navigate('/services/working-visas');
                handleServicesMenuClose();
              }}
              sx={{ '&:hover': { backgroundColor: '#444' } }}
            >
              Working Visas
            </MenuItem>
          </Menu>
          
          {/* Only show Dashboard button when user is logged in */}
          {auth && (
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          )}
          
          <Button color="inherit" component={Link} to="/blog">Blog</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
          
          {auth ? (
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
          ) : (
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
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;