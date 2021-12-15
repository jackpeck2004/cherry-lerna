import { NextApiRequest, NextApiResponse } from "next";
import { Challenge } from "src/Models";
import { connectToDatabase } from "src/utils/db";

export default async function getChallenge(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();
    const { cid } = req.query;
    console.log(cid);
    //@ts-ignore
    const challenge = await Challenge.findOne({ id: cid });
    const { id, content, title } = challenge;
    res.json({
      id,
      content,
      title,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
