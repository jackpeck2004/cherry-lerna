import { NextApiRequest, NextApiResponse } from "next";
import { Challenge } from "src/Models/index";
import { connectToDatabase } from "src/utils/db";
import { nanoid } from "nanoid";
import { IChallenge } from "src/Models/Challenge";

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectToDatabase();
      console.log("body", req.body);
      //   const body: IParticipant = JSON.parse(req.body);
      // destructure the body
      const { title, content, baseDataset, participants }: Partial<IChallenge> =
        req.body;

      const newChallenge = new Challenge({
        id: nanoid(),
        title,
        content,
        baseDataset,
        participants,
      });

      console.log(newChallenge);

      const saved = await newChallenge.save();

      res.send(saved);
    } catch (err) {
      console.log(err);
      res.status(500).send("error");
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
