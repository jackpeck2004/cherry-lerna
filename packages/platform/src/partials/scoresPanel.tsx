import { FC, useEffect, useState } from "react";
import { ScoreFileEntry } from "src/components";
import { IFile, IParticipant } from "src/Models/Participant";
import { IScore } from "src/Models/Score";
import jwt from "jsonwebtoken";

interface IProps {
  user: IParticipant;
  challengeID: string;
}

export const fetchScore = async (fileHash: string): Promise<IScore> => {
  const r = await fetch(`/api/scores/${fileHash}`);
  const data = await r.json();
  return data;
};

export const fetchParticipantsFilesForChallenge = async (
  participantID: string,
  challengeID: string,
  authToken: string
): Promise<IFile[]> => {
  const r = await fetch(`/api/participants/${participantID}`, {
    headers: {
      Authorization: authToken,
    },
  });
  const data: IParticipant = await r.json();

  // get the files from the user
  const { files } = data;

  const cleanedFiles = files.filter((file) => file.challengeID === challengeID);
  return cleanedFiles;
};

export const ScoresPanel: FC<IProps> = ({ user, challengeID }) => {
  const [scores, setScores] = useState<IScore[]>([]);
  const [authToken, setAuthToken] = useState<string>();

  const refreshScores = async (token?: string) => {
    const files = await fetchParticipantsFilesForChallenge(
      user.participantID,
      challengeID,
      authToken || token
    );

    const promises = files.map(async (file) => await fetchScore(file.hash));
    const fetchedScores = await Promise.all(promises);
    setScores(fetchedScores);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshScores(authToken);
    }, 1000);

    fetch("/api/auth")
      .then((res) => res.json())
      .then(({ auth }) => {
        setAuthToken(auth);
        if (auth) {
          const content: IParticipant = jwt.verify(
            auth,
            process.env.PRIVATE_KEY
          );
          refreshScores(auth);
        }
      });

    return () => {
      //   cleanup;
      setScores([]);
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <button
        className="text-cblue bg-transparent text-3xl absolute transform -translate-x-10 "
        title={"Refresh Scores"}
        onClick={() => refreshScores(authToken)}
      >
        &#x21bb;
      </button>
      {scores.reverse().map((score) => {
        if (score) {
          return (
            <ScoreFileEntry
              id={score.hash}
              packets={score.packets}
              score={score.score}
              key={score.hash}
            />
          );
        }
      })}
    </div>
  );
};
