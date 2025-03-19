import { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, Container, 
  Menu, MenuItem, Drawer, List, ListItem, ListItemText, 
  IconButton, Divider
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);

  const handleServicesMouseEnter = (event) => {
    setServicesAnchorEl(event.currentTarget);
  };

  const handleServicesMouseLeave = () => {
    setServicesAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { 
      label: 'Services', 
      path: '#',
      dropdown: true,
      dropdownItems: [
        { label: 'Business Visa', path: '/visas/business' },
        { label: 'Immigration Visa', path: '/visas/immigration' },
        { label: 'Tourist Visa', path: '/visas/tourist' },
        { label: 'Working Visa', path: '/visas/working' },
      ]
    },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          NILE CONSULTANT
        </Typography>
        <IconButton edge="end" color="inherit" onClick={handleDrawerToggle} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Box key={item.label}>
            <ListItem 
              button 
              component={Link} 
              to={item.dropdown ? '#' : item.path}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
            
            {item.dropdown && item.dropdownItems.map((dropdownItem) => (
              <ListItem 
                button 
                key={dropdownItem.label}
                component={Link} 
                to={dropdownItem.path}
                sx={{ pl: 4, textAlign: 'center' }}
              >
                <ListItemText primary={dropdownItem.label} />
              </ListItem>
            ))}
          </Box>
        ))}
        
        {auth ? (
          <>
            <ListItem button component={Link} to="/dashboard" sx={{ textAlign: 'center' }}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={handleLogout} sx={{ textAlign: 'center' }}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/login" sx={{ textAlign: 'center' }}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register" sx={{ textAlign: 'center' }}>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="default" sx={{ boxShadow: 1, bgcolor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NILE CONSULTANT
          </Typography>

          {/* Mobile menu icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Mobile logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NILE CONSULTANT
          </Typography>

          {/* Desktop navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Box 
                key={item.label}
                onMouseEnter={item.dropdown ? handleServicesMouseEnter : null}
                onMouseLeave={item.dropdown ? handleServicesMouseLeave : null}
                sx={{ position: 'relative' }}
              >
                <Button
                  component={Link}
                  to={item.dropdown ? '#' : item.path}
                  sx={{ 
                    color: 'text.primary',
                    mx: 1,
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {item.label}
                </Button>
                
                {item.dropdown && (
                  <Menu
                    anchorEl={servicesAnchorEl}
                    open={Boolean(servicesAnchorEl)}
                    onClose={handleServicesMouseLeave}
                    MenuListProps={{ 
                      onMouseLeave: handleServicesMouseLeave,
                      sx: { py: 0 }
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    sx={{ mt: 0.5 }}
                  >
                    {item.dropdownItems.map((dropdownItem) => (
                      <MenuItem 
                        key={dropdownItem.label} 
                        component={Link} 
                        to={dropdownItem.path}
                        onClick={handleServicesMouseLeave}
                      >
                        {dropdownItem.label}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Box>
            ))}
          </Box>

          {/* Auth buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {auth ? (
              <>
                <Button 
                  component={Link} 
                  to="/dashboard"
                  sx={{ color: 'text.primary', mx: 1 }}
                >
                  Dashboard
                </Button>
                <Button 
                  onClick={handleLogout}
                  sx={{ color: 'text.primary', mx: 1 }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  component={Link} 
                  to="/login"
                  sx={{ color: 'text.primary', mx: 1 }}
                >
                  Login
                </Button>
                <Button 
                  component={Link} 
                  to="/register"
                  variant="contained"
                  sx={{ mx: 1 }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;