import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Home';
import LearningPage from './learning';
import LearnMore from './LearnMore';


function App() {
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
