import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CTAButton, Header } from "src/components";

const Dashboard = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [participantID, setParticipantID] = useState<string>();
  const [challenges, setChallenges] = useState([]);
  const [isAdmin, setAdmin] = useState<boolean>(false);

  useEffect(
    () => {
      //   (effect)
      fetch("/api/auth")
        .then((res) => res.json())
        .then(({ auth }) => {
          if (auth) {
            const user = jwt.verify(auth, process.env.PRIVATE_KEY);
            if (user) {
              setEmail(user.email);
              setParticipantID(user.participantID);
              setAdmin(user.isAdmin);
              fetch("/api/challenges/participant/" + user.participantID, {
                headers: {
                  Authorization: auth,
                },
              })
                .then((res) => res.json())
                .then((res) => {
                  setChallenges(res.challenges);
                });
            }
          } else {
            router.push("login");
          }
        });

      return () => {
        //   cleanup
      };
    },
    [
      /*input*/
    ]
  );

  return (
    <div className="w-screen h-screen bg-cgrey">
      <Header participantID={participantID} email={email} isAdmin={isAdmin} />
      <div className="mx-16 mt-16">
        <h2 className="text-2xl text-cblue">Challenges</h2>
        <div className="mt-16 lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {challenges.map((challenge) => {
            return (
              <div className="flex flex-col justify-between items-center bg-white rounded-3xl shadow-2xl lg:w-96 h-64 p-8 mb-4">
                <div className="w-full">
                  <p className="text-cblue text-xl mb-4">{challenge.title}</p>
                  <p>ID: {challenge.id}</p>
                </div>
                <CTAButton
                  text="participate"
                  onClick={() => {
                    window.open("challenge/" + challenge.id, "_blank");
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
