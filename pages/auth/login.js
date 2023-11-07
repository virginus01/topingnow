import AuthLayout from '../../components/auth_layout';
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase"
import { useRouter } from 'next/router'
import { TextField, Button } from '@mui/material';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);

            router.push('../dashboard');
        } catch (error) {
            console.log("error");
            console.error(error.message);
        }
    };

    return (
        <AuthLayout> <div className="bg-gray-100 h-screen flex items-center">

            <div className="max-w-md mx-auto p-5 rounded-md bg-white">

                <h1 className="text-3xl font-medium mb-6 font-color:red text-center">Login</h1>

                <form>

                    <TextField
                        margin="normal"
                        variant="outlined"
                        label="Email"
                        name="email"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        variant="outlined"
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-1 mt-2 rounded-lg w-full"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>

                </form>

            </div>

        </div></AuthLayout>
    );

}
