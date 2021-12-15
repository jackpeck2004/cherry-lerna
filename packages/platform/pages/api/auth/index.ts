import { NextApiResponse } from "next";
import { withIronSession } from "next-iron-session";
import { NextIronRequest, nextIronSessionOptions } from "src/utils";

async function handler(req: NextIronRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const auth = req.session.get("auth");
      res.send({ auth });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
}

export default withIronSession(handler, nextIronSessionOptions);
