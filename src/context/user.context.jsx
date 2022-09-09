import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener, signOutUser, getOrCreateUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            const userData = await getOrCreateUserDocumentFromAuth(user)
            setCurrentUser(userData);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}