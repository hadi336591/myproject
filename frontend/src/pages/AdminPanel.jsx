import { useEffect, useState, useContext } from 'react';
import { Container, Typography, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

const AdminPanel = () => {
  const { auth, logout } = useContext(AuthContext);
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin', {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setAdminData(data);
        } else {
          setError(data.message || 'Failed to fetch admin data');
        }
      } catch (err) {
        console.log(err);
        setError('Failed to fetch admin data');
      }
    };
    fetchAdminData();
  }, [auth.token]);

  return (
    <>
      <Navbar />
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: '#FFCC00' }}>Admin Panel</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {adminData ? (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Admin Data: {JSON.stringify(adminData)}
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>Loading admin data...</Typography>
        )}
        <Button variant="contained" sx={{ mt: 4, backgroundColor: '#FFCC00', color: 'black' }} onClick={logout}>
          Logout
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default AdminPanel;
