import {authMiddleware, NextIronRequest, nextIronSessionOptions} from "src/utils";
import {  NextApiResponse } from "next";
import { Participant } from "src/Models";
import { connectToDatabase } from "src/utils/db";
import { withIronSession } from "next-iron-session";

async function handler(req: NextIronRequest, res: NextApiResponse) {
  try {
    const { pid } = req.query;

    const user = authMiddleware(req, res);

    if (!user) {
      return;
    }

    if (!user.isAdmin && user.participantID !== pid) {
      res.status(401).send("error");
      return;
    }

    await connectToDatabase();

    //@ts-ignore
    const participants = await Participant.findOne({ participantID: pid });
    res.json(participants);
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}

export default withIronSession(handler, nextIronSessionOptions);
