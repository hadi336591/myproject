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
import UploadDocuments from './pages/UploadDocuments';
import PaymentPage from './pages/PaymentPage';

// Import service pages
import BusinessVisa from './pages/services/BusinessVisa';
import ImmigrationVisa from './pages/services/ImmigrationVisa';
import TouristsVisa from './pages/services/TouristsVisa';
import WorkingVisas from './pages/services/WorkingVisas';

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
        <Route path="/upload-documents" element={<ProtectedRoute><UploadDocuments /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="/draw-application" element={<ProtectedRoute><DrawApplicationForm /></ProtectedRoute>} />
        <Route path="/draw-payment" element={<ProtectedRoute><DrawPayment /></ProtectedRoute>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
        
        {/* Service Routes */}
        <Route path="/services/business-visa" element={<BusinessVisa />} />
        <Route path="/services/immigration-visa" element={<ImmigrationVisa />} />
        <Route path="/services/tourists-visa" element={<TouristsVisa />} />
        <Route path="/services/working-visas" element={<WorkingVisas />} />
      </Routes>
    </Router>
  );
}

export default App;