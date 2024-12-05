import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/layout/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import CampaignDetailPage from './pages/CampaignDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePost from './pages/CreatePost';
import Search from './pages/Search';
import Donate from './pages/Donate';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div style={{ position: 'relative', minHeight: '100vh' }}>
          <GlobalStyles />
          <Navbar />
          <main style={{ paddingTop: '120px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/campaigns" element={<div>Campaigns Page</div>} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route 
                path="/campaign/:id" 
                element={
                  <ProtectedRoute>
                    <CampaignDetailPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/create-campaign" element={<CreatePost />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;