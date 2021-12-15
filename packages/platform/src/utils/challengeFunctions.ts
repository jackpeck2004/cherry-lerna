import axios from "axios";
import { Dispatch } from "react";
import { PUBLISHER_URI } from ".";

export const uploadFiles = (file, setFile, user, challengeID, authToken) => {
  console.log("authToken", authToken);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("participantID", user.participantID);
  submitForm("multipart/form-data", formData, challengeID, (fileId) => {
    fetch(`/api/participants/addFileToParticipant/${user.participantID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({
        file: {
          challengeID: challengeID,
          hash: fileId,
        },
      }),
    })
      .then((r) => r.json())
      .then((res) => console.log(res));
  });
  setFile(null);
};

export const submitForm = (
  contentType: string,
  data: any,
  challengeId: string,
  setResponse: Dispatch<any>
) => {
  console.log(challengeId);
  axios({
    url: `${PUBLISHER_URI}/publish`,
    method: "POST",
    data: data,
    headers: {
      "Content-Type": contentType,
      "X-Challenge-Id": challengeId,
    },
  })
    .then((response) => {
      setResponse(response.data.fileId);
    })
    .catch((error) => {
      setResponse("error");
    });
};
