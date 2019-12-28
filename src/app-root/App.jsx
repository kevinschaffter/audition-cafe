import React from 'react';
import './normalize.css';
import './reset.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from '../routes/Routes';
import { Nav } from '../components';
import classes from './App.module.scss';
import UserContext from '../context/AuthContext';

const App = () => (
  <Router>
    <UserContext.Provider>
      <Nav />
      <main className={classes.appWrapper}>
        <Routes />
      </main>
      {/* Footer */}
    </UserContext.Provider>
  </Router>
);

export default App;
