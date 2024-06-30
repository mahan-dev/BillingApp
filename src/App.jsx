import React from 'react';
import Admin_Dashboard from './components/Admin_Dashboard';
import HomePage from './components/HomePage';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './components/FormPage';
import Login_Admin_Guest from './components/Login_Admin_Guest';
import AboutUs from './components/redirects/AboutUs';
// import './tailwind.css';
const App = () => {
  return (

    <Router>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login_Admin_Guest />} />
        <Route path='/LogInAdmin' element={<Admin_Dashboard />} />
        <Route path='/LogInGuest' element={<FormPage />} />
        <Route path='/AboutUs' element={<AboutUs />} />

      </Routes>

    </Router>

  );
};

export default App;