import { NextApiResponse } from "next";
import { withIronSession } from "next-iron-session";
import { Participant } from "src/Models";
import { authMiddleware, NextIronRequest, nextIronSessionOptions } from "src/utils";
import { connectToDatabase } from "src/utils/db";

async function handler(req: NextIronRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      await connectToDatabase();

      const { pid } = req.query;
      const user = authMiddleware(req, res);

      if (!user) {
        return;
      }

      if (!user.isAdmin && user.participantID !== pid) {
        res.status(401).send("error");
        return;
      }

      const file: {
        challengeID: string;
        hash: string;
      } = req.body.file;

      //@ts-ignore
      const participant = await Participant.findOne({ participantID: pid });
      await Participant.updateOne(
        //@ts-ignore
        { participantID: pid },
        { files: [...participant.files, file] }
      );
      res.send({ file });
    } catch (err) {
      console.log(err);
      res.status(500).send("error");
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default withIronSession(handler, nextIronSessionOptions);
