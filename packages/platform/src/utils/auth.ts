import { Participant } from "src/Models";
import { NextApiResponse } from "next";
import { deepEqual, NextIronRequest } from "src/utils";
import jwt from "jsonwebtoken";
import { IParticipant } from "src/Models/Participant";

type ret = IParticipant | null;

export async function isAuth() {
  console.log("auth");
  const r = await fetch("/api/auth");
  const { auth } = await r.json();
  console.log("auth", auth);
  if (auth) {
    const user: IParticipant = jwt.verify(auth, process.env.PRIVATE_KEY);
    return user;
  }
  return null;
}

export const authMiddleware = (
  req: NextIronRequest,
  res: NextApiResponse
): IParticipant => {
  const { authorization } = req.headers;
  console.log("authorization", authorization);

  if (!authorization) {
    res.status(400).send("missing headers");
    return;
  }

  const user = jwt.verify(authorization, process.env.PRIVATE_KEY);

  if (!user) {
    res.status(400).send("user from token non-existent");
    return;
  }

  const sessionToken = req.session.get("auth");
  const sessionUser = jwt.verify(sessionToken, process.env.PRIVATE_KEY);

  if (!deepEqual(user, sessionUser)) {
    res.status(403).send("error");
    return;
  }

  return user;
};
