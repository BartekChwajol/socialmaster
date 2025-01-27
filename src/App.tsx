import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Roadmap from './pages/Roadmap';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Checkout from './pages/Checkout';
import Integrations from './pages/Integrations';
import API from './pages/API';
import Status from './pages/Status';
import Docs from './pages/Docs';
import Guides from './pages/Guides';
import Webinars from './pages/Webinars';
import Training from './pages/Training';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import GDPR from './pages/GDPR';
import Cookies from './pages/Cookies';
import Careers from './pages/Careers';
import DeleteData from './pages/DeleteData';
import TestImage from './pages/TestImage';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import { initializeFacebookSDK } from './lib/socialMedia';

function App() {
  useEffect(() => {
    const initFB = async () => {
      try {
        await initializeFacebookSDK();
      } catch (error) {
        console.error('Failed to initialize Facebook SDK:', error);
      }
    };
    initFB();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Navbar />
        <Toaster position="top-center" />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/register" element={<Register />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/checkout/:planId" element={<Checkout />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/api" element={<API />} />
            <Route path="/status" element={<Status />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/training" element={<Training />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/gdpr" element={<GDPR />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/delete-data" element={<DeleteData />} />
            <Route path="/test-image" element={<TestImage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  );
}

export default App;