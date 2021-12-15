import { NextIronRequest } from './../../../src/utils/index';
import { NextApiRequest, NextApiResponse } from "next";
import { Participant } from "src/Models";
import { authMiddleware, connectToDatabase } from "src/utils";

export default async function getAllParticipants(
  req: NextIronRequest,
  res: NextApiResponse
) {
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
    const participants = await Participant.find();
    res.json(participants);
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
