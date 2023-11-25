import styles from './layout.module.css';
import { auth } from '../utils/firebase';
import { AuthContext } from '../context/AuthContext'
import React, { useContext } from 'react'
import { UserNavbar } from './user_navbar';
import { Toaster } from 'sonner';


export const user = auth;

export default function UserLayout({ children }) {

    return (
        <AuthContext.Provider value={{ user }}>
            <header className='z-40'>
                <UserNavbar />
            </header>
            <main>
                <div className="flex flex-col">
                    <div className='md:w-2/4 mt-8 md:mx-auto mx-2'>
                        {children}
                    </div>
                </div>
                <Toaster position="bottom-right" visibleToasts={6} richColors />
            </main>
        </AuthContext.Provider>
    );
}