import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import type { UserModel } from "@/models/user_model";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  // Destroy user session
  if (req.method === "POST") {
    req.session.destroy();
    try {
      const ress = await logOut();
      if (ress.success) {
        return res.status(200).json({ message: "destroyed!" });
      } else {
        return res.status(500).json({ error: "error" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  res.status(405).json({ error: "Method not allowed" });
}

export default withIronSessionApiRoute(logoutRoute, {
  cookieName: "logout",
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  //... other session options
});

const logOut = async () => {
  //  const auth = getAuth();
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return Promise.reject(error);
  }
};
