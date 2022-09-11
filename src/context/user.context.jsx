import PropTypes from 'prop-types';

import { createContext, useEffect, useState, useMemo } from 'react';
import { onAuthStateChangedListener, getOrCreateUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser, setCurrentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      const userData = await getOrCreateUserDocumentFromAuth(user);
      setCurrentUser(userData);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};
