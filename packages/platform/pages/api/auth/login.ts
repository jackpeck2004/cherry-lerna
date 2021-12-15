import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import { withIronSession } from "next-iron-session";
import { Participant } from "src/Models";
import { connectToDatabase } from "src/utils/db";
import {NextIronRequest, nextIronSessionOptions} from "src/utils/index";

async function handler(req: NextIronRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    //     const participants = await Participant.find();
    //     res.json(participants);
    if (req.method === "POST") {
      const { email, participantID } = req.body;
      const user = await Participant.findOne({ email, participantID }).exec();
      if (user) {
        const token = jwt.sign(
          { email, participantID, isAdmin: user.isAdmin },
          process.env.PRIVATE_KEY
        );
        req.session.set("auth", token);
        await req.session.save();
        res.send("logged in");
        return
      }

      res.status(401).send("non-user");
      return
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}

export default withIronSession(handler, nextIronSessionOptions);
