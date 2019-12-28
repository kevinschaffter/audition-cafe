import React from 'react';
import { Route, Redirect } from 'react-router';
import { useAuthContext } from '../context/AuthContext';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuthContext();
  return <Route {...rest} render={props => (user ? <Component {...props} /> : <Redirect to="/" />)} />;
};
