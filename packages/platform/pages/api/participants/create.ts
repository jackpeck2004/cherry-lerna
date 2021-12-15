import { authMiddleware } from "src/utils";
import { NextApiResponse } from "next";
import { withIronSession } from "next-iron-session";
import { Participant } from "src/Models";
import {connectToDatabase, NextIronRequest, nextIronSessionOptions} from "src/utils";

async function handler(req: NextIronRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const user = authMiddleware(req, res);

      if (!user) {
        return;
      }

      if (!user.isAdmin) {
        res.status(401).send("error");
        return;
      }

      await connectToDatabase();
      const newParticipant = new Participant(req.body);

      if (!/^\S+@\S+\.\S+$/.test(newParticipant.email)) {
        res.status(500).send("error");
        return;
      }

      const saved = await newParticipant.save();
      res.send(saved);
    } catch (err) {
      console.log(err);
      res.status(500).send("error");
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default withIronSession(handler, nextIronSessionOptions);
