import React from 'react';
import {
  Router,
  Route,
  Link
} from 'react-router-dom'
import UTMPage from './UTMPage';
import LeadForm from './LeadForm';
import ThankYou from './ThankYouPage';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the landing page of your application.</p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/utm">UTM</Link>
          <Link to="/leadform">Lead Form</Link>
          <Link to="/thank-you">Thank You</Link>
        </nav>
        <Route path="/" exact component={Home} />
        <Route path="/utm" component={UTMPage} />
        <Route path="/leadform" component={LeadForm} />
        <Route path="/thank-you" component={ThankYou} />
      </div>
    </Router>
  );
}

export default App;