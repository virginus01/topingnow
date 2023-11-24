import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../../models/user_model";

async function userRoute(req: NextApiRequest, res: NextApiResponse<UserModel>) {
  if (req.session.user) {
    console.log("kkkh");
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      id: "",
      uid: "",
      email: "",
      isLoggedIn: false,
      login: "",
      avatarUrl: "",
    });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
