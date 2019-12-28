import React, { createContext, useState, useEffect, useContext } from 'react';
import { googleAuth, auth } from '../firebase/config';

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

const Provider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(undefined);
  const [initialized, setInitialized] = useState(false);

  const clearUser = () => {
    localStorage.removeItem('USER');
    setUserDetails(undefined);
  };

  useEffect(() => {
    const userCurrentlyLoggedIn = JSON.parse(localStorage.getItem('USER'));
    if (userCurrentlyLoggedIn) setUserDetails(userCurrentlyLoggedIn);
    auth.onAuthStateChanged(user => {
      if (user) {
        // If user is valid and already in localStorage, stop
        if (userCurrentlyLoggedIn) return;
        const { displayName, uid, email } = user;
        const details = { displayName, uid, email };
        setUserDetails(details);
        localStorage.setItem('USER', JSON.stringify(details));
      } else clearUser();
    });
    setInitialized(true);
  }, []);

  const handleSignIn = async () => {
    const {
      user: { displayName, uid, email },
    } = (await googleAuth()) || {};
    const details = { displayName, userId: uid, email };
    setUserDetails(details);
    localStorage.setItem('USER', JSON.stringify(details));
  };

  const handleSignOut = () => {
    auth.signOut();
    clearUser();
  };

  // memoize?
  const value = { user: userDetails, handleSignIn, handleSignOut };

  return <AuthContext.Provider value={value}>{initialized && children}</AuthContext.Provider>;
};

export default { Provider };
