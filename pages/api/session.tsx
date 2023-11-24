import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(async function loginRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  const user = {
    id: body.uid,
    uid: "",
    email: body.email,
    isLoggedIn: true,
    login: "yes",
    avatarUrl: "",
  };

  req.session.user = user;
  await req.session.save();
  res.json(user);
},
sessionOptions);
