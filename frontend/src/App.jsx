import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VisaApplication from './pages/VisaApplication';
import DrawApplicationForm from './pages/DrawApplicationForm';
import DrawPayment from './pages/DrawPayment';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import TopBar from './components/TopBar';


function App() {
  return (
    <Router>
      {/* Top bar first */}
      <TopBar />
      {/* Main navbar below */}
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apply" element={<VisaApplication />} />
        <Route path="/draw-application" element={<ProtectedRoute><DrawApplicationForm /></ProtectedRoute>} />
        <Route path="/draw-payment" element={<ProtectedRoute><DrawPayment /></ProtectedRoute>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;