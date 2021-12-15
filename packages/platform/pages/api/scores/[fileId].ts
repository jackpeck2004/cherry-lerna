import { NextApiRequest, NextApiResponse } from "next";
import { Score } from "src/Models";
import { connectToDatabase } from "src/utils/db";

export default async function getChallenge(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();
    const { fileId } = req.query;
    console.log(fileId);
    //@ts-ignore
    const { hash, score, packets } = await Score.findOne({ hash: fileId });
    res.json({
      hash,
      packets,
      score,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}
