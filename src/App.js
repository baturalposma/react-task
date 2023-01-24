import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LeadForm from './LeadForm';
import ThankYouPage from './ThankYouPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeadForm />} />
        <Route path="thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}

export default App;