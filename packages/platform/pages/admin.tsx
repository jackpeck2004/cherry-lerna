import jwt from "jsonwebtoken";
import ErrorPage from "next/error";
import React, { useEffect, useState } from "react";
import { IParticipant } from "src/Models/Participant";
import { AddChallengePanel, AddParticipantForm } from "src/partials";
import { PortalDiv } from "src/utils";

const AdminPage = () => {
  const [isAdmin, setAdmin] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string>("");

  useEffect(() => {
    //   effect
    fetch("/api/auth")
      .then((res) => res.json())
      .then(({ auth }) => {
        setAuthToken(auth);
        if (auth) {
          const content: IParticipant = jwt.verify(
            auth,
            process.env.PRIVATE_KEY
          );
          if (content) {
            setAdmin(content.isAdmin);
          }
        }
      });
    return () => {};
  }, []);

  if (!isAdmin) {
    return <ErrorPage statusCode={401} />;
  }

  return (
    <>
      <PortalDiv />
      <div className="w-screen h-screen bg-cgrey px-16 pt-16">
        <h1 className="text-3xl text-cblue">Admin</h1>
        <div className="mt-16 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <AddParticipantForm authToken={authToken} />
          </div>
          <div>
            <AddChallengePanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
