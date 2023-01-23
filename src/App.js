import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import UTMPage from './UTMPage';
import LeadForm from './LeadForm';
import ThankYouPage from './ThankYouPage';

function App() {
  ReactDOM.render (
    <Router>
      <Routes>
        <Route path="/utm" element={<UTMPage/>} />
        <Route path="/lead-form" element={<LeadForm/>} />
        <Route path="/thank-you" element={<ThankYouPage/>} />
        <Navigate from="/" to="/utm" />
      </Routes>
    </Router>
  );
}

export default App;