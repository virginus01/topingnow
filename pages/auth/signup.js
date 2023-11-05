import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase"
import { useRouter } from 'next/router'

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");


    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const uid = auth.currentUser.uid;
            await fetch('../../api/user/route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, uid, name })
            })
            router.push('/auth/login');
        } catch (error) {
            console.log("error");
            console.error(error.message);
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
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
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
}
