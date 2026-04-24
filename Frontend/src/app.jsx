import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Home';
import LearningPage from './learning';
import LearnMore from './LearnMore';


function App() {
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const apiUrl = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
        const response = await fetch(`${apiUrl}/health`);
        const data = await response.json();
        console.log('Backend health status:', data);
      } catch (error) {
        console.error('Error hitting health endpoint:', error);
      }
    };

    checkHealth();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Learning" element={<LearningPage />} />
        <Route path="/LearnMore" element={<LearnMore />} />
      </Routes>
    </Router>
  );
}

export default App;
