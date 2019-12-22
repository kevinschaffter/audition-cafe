import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as page from '../pages';
import { routePaths } from './routePaths';

export const Routes = () => (
  <Router>
    {routePaths.map(({ path, component }) => (
      <Route key={path} path={path} component={page[component]} />
    ))}
  </Router>
);
