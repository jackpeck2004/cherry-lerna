import { FC, useState } from "react";
import { IChallenge } from "src/Models/Challenge";
import { IParticipant } from "src/Models/Participant";
import { uploadFiles } from "src/utils";
import { CTAButton } from "src/components";

interface IProps {
  challenge: IChallenge;
  user: IParticipant;
  authToken: string;
}

export const ChallengePanel: FC<IProps> = ({ challenge, user, authToken }) => {
  const [file, setFile] = useState(null);

  return (
    <div className="lg:h-full bg-white shadow-2xl lg:overflow-y-auto p-8 sm:p-16 md:p-32 lg:p-16 xl:p-32">
      <h2 className="text-cblue text-2xl">{challenge.title}</h2>
      <p
        className="mt-8"
        dangerouslySetInnerHTML={{ __html: challenge.content }}
      />
      <p className="my-8">Good luck,</p>
      <p className="my-8 text-gray-400">
        Once obtained your desired outcome, close the window, the file with the
        highest score will be selected automatically to end up as your final
        score
      </p>
      <div className="w-full flex flex-col items-center justify-center mt-8">
        {file ? (
          <>
            <span className="mb-4 text-gray-600">
              You selected: {file.name}
            </span>
            <CTAButton
              text="upload file"
              onClick={() => {
                console.log("hello");
                uploadFiles(file, setFile, user, challenge.id, authToken);
              }}
            />
          </>
        ) : (
          <label>
            <CTAButton text="add new file" />
            <input
              type="file"
              id="input"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              className="hidden"
              // multiple
            />
          </label>
        )}
      </div>
    </div>
  );
};
