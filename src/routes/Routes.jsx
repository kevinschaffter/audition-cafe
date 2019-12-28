import React from 'react';
import { Route as OpenRoute, Switch } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import * as page from '../pages';
import { routePaths } from './routePaths';

export const Routes = () => (
  <Switch>
    {routePaths.map(({ path, component, exact = true, restriction }) => {
      const Route = restriction ? PrivateRoute : OpenRoute;
      return <Route key={path} path={path} component={page[component]} exact={exact} />;
    })}
  </Switch>
);
