import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './App.css'
import UserDetail from './components/UserDetail';
import CreateUser from './components/CreateUser';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/create" element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
