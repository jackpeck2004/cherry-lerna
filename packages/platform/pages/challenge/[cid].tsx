import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ScoreFileEntry } from "src/components";
import { IChallenge } from "src/Models/Challenge";
import { IParticipant } from "src/Models/Participant";
import { ChallengePanel, ScoresPanel } from "src/partials";
import { isAuth } from "src/utils/auth";

const ChallengePage = () => {
  const router = useRouter();
  const { cid } = router.query;
  const [challenge, setChallenge] = useState<IChallenge | null>(null);
  const [scores, setScores] = useState([]);
  const [user, setUser] = useState<IParticipant>();
  const [authToken, setAuthToken] = useState<string>();

  useEffect(() => {
    async function fetchAuth() {
      const auth = await isAuth();
      setUser(auth);
      if (auth) {
        if (cid) {
          const asyncGetChallenge = async () => {
            const { origin } = window.location;
            const data = await fetch(origin + "/api/challenges/" + cid);
            const challenge = await data.json();
            return challenge;
          };
          if (window) {
            asyncGetChallenge()
              .then((challenge) => {
                setChallenge(challenge);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      }
    }

    fetch("/api/auth")
      .then((res) => res.json())
      .then(({ auth }) => {
        if (auth) {
          setAuthToken(auth);
          const content: IParticipant = jwt.verify(
            auth,
            process.env.PRIVATE_KEY
          );
        }
      });

    fetchAuth();
  }, [cid, router]);

  if (!challenge) {
    return (
      <div className="bg-cblue w-screen h-screen flex justify-center items-center text-white text-3xl">
        <h1>
          Challenge <b>{cid}</b> does not exist
        </h1>
      </div>
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-2 bg-cgrey w-screen h-screen lg:overflow-hidden">
      {challenge && (
        <ChallengePanel
          challenge={challenge}
          user={user}
          authToken={authToken}
        />
      )}
      <div className="p-8 sm:p-16 md:p-32 lg:p-16 xl:p-32">
        {/* <button onClick={() => refreshScores()}>refresh</button> */}
        <h2 className="text-cblue text-2xl">Your files</h2>
        {/* TODO: add score display */}
        <div className="grid grid-cols-6 items-center gap-2 mx-4 px-4 w-full text-gray-500 mt-8">
          <span className="col-span-3">File ID</span>
          <span className="text-center">Score</span>
          <span className="text-center">Packets</span>
          <span className="text-center">Rel.</span>
        </div>
        <ScoresPanel user={user} challengeID={cid.toString()} />
      </div>
    </div>
  );
};

export default ChallengePage;
