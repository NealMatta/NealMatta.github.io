import React, { useContext, useState, useEffect } from 'react';
import auth from '../config/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [token, setToken] = useState();
    const [loading, setLoading] = useState(true);

    function register(email, password) {
        console.log('Registering');
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        console.log('Logging In');
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        console.log('Logging Out');
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = auth.onIdTokenChanged(user => {
            setCurrentUser(user);
            user.getIdToken().then(t => {
                setToken(t);
            });
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        token,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
