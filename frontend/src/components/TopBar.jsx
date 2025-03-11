import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Select,
  MenuItem
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const TopBar = () => {
  const [language, setLanguage] = React.useState('English');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#f8f9fa',
        color: '#333',
        boxShadow: 'none',
        borderBottom: '1px solid #ddd'
      }}
    >
      <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
        {/* Left: Language Selector */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LanguageIcon sx={{ color: '#333' }} />
          <Select
            value={language}
            onChange={handleLanguageChange}
            variant="standard"
            sx={{ minWidth: 100, color: '#333' }}
            disableUnderline
            IconComponent={ArrowDropDownIcon}
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
            <MenuItem value="Urdu">Urdu</MenuItem>
          </Select>
        </Box>

        
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        Apply for a Visa through the draw process Online.{' '}
          <img
            src=""
            style={{ width: 20, verticalAlign: 'middle', marginLeft: 4 }}
          />
        </Typography>

        {/* Right: Social Icons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton color="inherit" size="small">
            <FacebookIcon fontSize="small" sx={{ color: '#333' }} />
          </IconButton>
          <IconButton color="inherit" size="small">
            <LinkedInIcon fontSize="small" sx={{ color: '#333' }} />
          </IconButton>
          <IconButton color="inherit" size="small">
            <TwitterIcon fontSize="small" sx={{ color: '#333' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
