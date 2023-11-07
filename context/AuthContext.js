import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const { uid, email } = user;
                setUser({ uid, email });
            } else {
                //if user not authenticated, redirect to login page
                setUser(null);
                router.push('/auth/login');
            }
        });

        return () => unsubscribe();
    }, []);


    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}
