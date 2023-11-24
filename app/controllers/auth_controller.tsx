import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "sonner";
import Link from "next/link";
import React, { useState } from "react";
import { auth } from "../../utils/firebase";

export const handleLogin = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
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
  }
};
