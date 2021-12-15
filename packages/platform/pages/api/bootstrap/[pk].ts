import { NextIronRequest } from './../../../src/utils/index';
import { NextApiResponse, NextApiRequest } from "next";
import { Participant } from "src/Models";
import { connectToDatabase} from "src/utils/db";

export default async function bootstrap(
    req: NextApiRequest, res: NextApiResponse
) {
    try {

        const { pk } = req.query;

        if (pk !== process.env.PRIVATE_KEY) {
            res.status(401).send("error")
            return;
        }

        await connectToDatabase();

        const baseAdmin = new Participant({
            email: "testadmin@a.it",
            participantID: "0000",
            files: [],
            isAdmin: true
        });

        const saved = await baseAdmin.save();
        res.send(saved);


    } catch(err) {
        console.log(err);
        res.status(500).send("error");
    }
    
}