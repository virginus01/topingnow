import AuthLayout from "../../components/auth_layout";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { TextField, Button } from "@mui/material";
import { toast } from "sonner";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { UserModel } from "@/models/user_model";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState<UserModel | null>(null);

  function setupFirebaseAuthListener() {
    const unsubscribe = onAuthStateChanged(auth, async (authUser: any) => {
      if (authUser) {
        const { uid, email } = authUser;
        setUser({ uid, email });
      }
    });

    return () => unsubscribe();
  }

  useEffect(setupFirebaseAuthListener, []);

  const handleLogin = async () => {
    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      if (user) {
        fetch("/api/session", {
          method: "POST",
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
          }),
        });
      }

      router.push("../dashboard");
    } catch (error) {
      setError(error);

      if (error.code === "auth/invalid-email") {
        toast.error("Invalid email");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Wrong password");
      } else if (error.code == "auth/invalid-login-credentials") {
        toast.error("Wrong password or Email");
      } else {
        toast.error("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
        <div className="mx-auto max-w-md">
          <div className="divide-y divide-gray-300/50">
            <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
              <p>Login</p>
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
                  disabled={loading}
                  type="submit"
                >
                  {loading ? "logging in..." : "Login"}
                </Button>
              </form>
            </div>
            <div className="pt-8 text-base font-semibold leading-7 text-right">
              dont't have account?
              <Link href="signup" className="text-sky-500 hover:text-sky-600">
                {" "}
                register &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
