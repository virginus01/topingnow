import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import type { UserModel } from "@/models/user_model";
import { getAuth, signOut } from "firebase/auth";

async function logoutRoute(
  req: NextApiRequest,
  res: NextApiResponse<UserModel>
) {
  const auth = getAuth();
  try {
    await signOut(auth);
    req.session.destroy();
  } catch (e) {
    console.log(e.message);
  }

  res.json({ isLoggedIn: false, login: "", avatarUrl: "" });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
