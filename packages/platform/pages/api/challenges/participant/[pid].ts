import { NextApiResponse } from "next";
import { withIronSession } from "next-iron-session";
import { Challenge } from "src/Models";
import { NextIronRequest, nextIronSessionOptions } from "src/utils";
import { authMiddleware } from "src/utils/auth";
import { connectToDatabase } from "src/utils/db";

async function handler(req: NextIronRequest, res: NextApiResponse) {
  try {
    const { pid } = req.query;

    const user = authMiddleware(req, res);

    if (!user) {
      return;
    }

    if (!user.isAdmin && user.participantID !== pid) {
      console.log(user.participantID === pid)
      res.status(401).send("error");
      return;
    }

    await connectToDatabase();
    //@ts-ignore
    let challenges = await Challenge.find({ participants: { $all: [pid] } });
    challenges = challenges.map((challenge) => {
      return {
        id: challenge.id,
        title: challenge.title,
      };
    });
    console.log(challenges);
    res.send({
      challenges,
    });
    // const challenge = await Challenge.findOne({ id: cid });
    // const { id, content, title } = challenge;
    // res.json({
    //   id,
    //   content,
    //   title,
    // });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}

export default withIronSession(handler, nextIronSessionOptions);
