import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Nav.module.scss';
import { useAuthContext } from '../../../context/AuthContext';

const Nav = () => {
  const { user, handleSignIn, handleSignOut } = useAuthContext();
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/post-vacancy">post auditions</NavLink>
        </li>
        <li>
          <NavLink to="/manage-vacancies">Manage</NavLink>
        </li>
        <li onClick={user ? handleSignOut : handleSignIn}>{user ? 'Sign Out' : 'Sign In'}</li>
      </ul>
    </nav>
  );
};

export default Nav;
