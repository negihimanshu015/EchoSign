import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Home';
import LearningPage from './learning';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Learning" element={<LearningPage />} />
      </Routes>
    </Router>
  );
}

export default App;
