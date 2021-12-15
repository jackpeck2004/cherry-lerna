import { useEffect, useState } from "react";
import { CTAButton, TextInput } from "src/components";
import { IChallenge } from "src/Models/Challenge";

// import "ace-builds/src-noconflict/mode-html";
// import "ace-builds/src-noconflict/theme-github";

export const AddChallengeModal = () => {
  const [challengeTitle, setChallengeTitle] = useState<string>();
  const [challengeContent, setChallengeContent] = useState<string>();
  const [challengeBaseDataset, setChallengeBaseDataset] = useState({
    url: "",
    data: [{}],
  });
  const [challengeParticipants, setChallengeParticipants] = useState([]);
  const [datasetFile, setDatasetFile] = useState(null);
  const [currentParticipant, setCurrentParticipant] = useState("");

  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    setChallengeBaseDataset(content);
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
    setDatasetFile(file);
  };

  const handleSubmit = async () => {
    //@ts-ignore
    console.table(typeof JSON.parse(challengeBaseDataset));
    // fetch post api
    const res = await fetch("/api/challenges/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: challengeTitle,
        content: challengeContent,
        //@ts-ignore
        baseDataset: JSON.parse(challengeBaseDataset),
        participants: challengeParticipants,
      }),
    });

    if (res.status === 200) {
      alert("challenge created");

      // clean inputs
      setChallengeTitle("");
      setChallengeContent("");
      setChallengeBaseDataset({
        url: "",
        data: [],
      });
      setChallengeParticipants([]);
      setDatasetFile(null);
      setCurrentParticipant("");
    } else {
      alert("there was an error");
    }
  };

  return (
    <div className="bg-white w-4/6 py-6 px-6 z-10 rounded-xl">
      <div className=" grid md:grid-cols-2 grid-cols-1">
        <div>
          <h2 className="text-2xl text-cblue">Add Challenge</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="grid grid-cols-1 gap-y-8 mt-8"
          >
            <TextInput
              value={challengeTitle}
              onChange={(e) => setChallengeTitle(e.target.value)}
              placeholder="title"
              className="xl:w-96 w-5/6"
            />
            <textarea
              value={challengeContent}
              onChange={(e) => setChallengeContent(e.target.value)}
              placeholder="content"
              className="w-5/6 xl:w-96 border border-cgrey hover:border-cblue focus:outline-none focus:border-cblue p-6 transition"
            />
            <input
              type="file"
              onChange={(e) => {
                handleFileChosen(e.target.files[0]);
              }}
            />
          </form>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="grid grid-cols-1 gap-y-8 mt-8"
          >
            <h2 className="text-xl">Participants</h2>
            <ul className="list-disc grid grid-cols-2">
              {challengeParticipants.map((participant) => (
                <li
                  className="cursor-pointer hover:text-cred transition"
                  onClick={() => {
                    setChallengeParticipants(
                      challengeParticipants.filter((p) => p !== participant)
                    );
                  }}
                >
                  {participant}
                </li>
              ))}
            </ul>
            <div>
              <TextInput
                value={currentParticipant}
                onChange={(e) => setCurrentParticipant(e.target.value)}
                placeholder="participant id"
              />
              <button
                onClick={() => {
                  if (currentParticipant.length) {
                    setChallengeParticipants([
                      ...challengeParticipants,
                      currentParticipant,
                    ]);
                    setCurrentParticipant("");
                  }
                }}
              >
                add
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-8 text-center w-full">
        <CTAButton
          onClick={() => {
            const bool =
              challengeTitle &&
              challengeContent &&
              challengeParticipants.length &&
              datasetFile &&
              challengeBaseDataset;

            if (!bool) {
              alert("did not fill in all fields");
              return;
            }

            handleSubmit();
          }}
          text={"add challenge"}
        />
      </div>
    </div>
  );
};
