import styles from './layout.module.css';
import { auth } from '../utils/firebase';
import { AuthContext } from '../context/AuthContext'
import React, { useContext } from 'react'


export const user = auth;

export default function UserLayout({ children }) {

    return (
        <AuthContext.Provider value={{ user }}>
            <header>
                <title>ok {user?.email}</title>
            </header>
            <main>
                {children}
            </main>
        </AuthContext.Provider>
    );
}