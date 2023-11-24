import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase"
import { useRouter } from 'next/router'
import AuthLayout from '../../components/auth_layout'
import { TextField, Button } from '@mui/material';
import Link from "next/link";
import { toast } from "sonner";

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    const handleSignUp = async () => {
        try {

            setLoading(true);

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
            setError(error);
            console.log(error.code)
            if (error.code === 'auth/email-already-in-use') {
                toast.error('email already in use');
            } else if ("auth/weak-password" == error.code) {
                toast.error('choose a stronger password');
            } else {
                toast.error('Unknown error');
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg rounded-lg sm:px-10 mx-3">
                <div className="mx-auto max-w-md">
                    <div className="divide-y divide-gray-300/50">
                        <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
                            <p>Login</p>
                            <form method="POST">

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

                                <TextField
                                    margin="normal"
                                    variant="outlined"
                                    label="Name"
                                    name="name"
                                    type="text"
                                    fullWidth
                                    onChange={(e) => setName(e.target.value)}
                                />


                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-1 mt-2 rounded-lg w-full"
                                    onClick={handleSignUp}
                                    disabled={loading}
                                    type='submit'
                                >
                                    {loading ? "registering in..." : "Register"}
                                </Button>

                            </form>


                        </div>
                        <div className="pt-8 text-base font-semibold leading-7 text-right">
                            already have an account?
                            <Link href="login" class="text-sky-500 hover:text-sky-600"> login &rarr;</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout >
    );
}
