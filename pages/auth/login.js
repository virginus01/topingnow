import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase"
import { useRouter } from 'next/router'
//import { getMongoDBCollection } from "../api/client"

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log(auth.currentUser.uid)
            router.push('../dashboard');
        } catch (error) {
            console.log("error");
            console.error(error.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}> Login</button>
        </div>
    );
}
