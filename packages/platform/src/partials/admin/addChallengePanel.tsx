import { FC, useState } from "react";
import { Portal } from "src/utils";
import { AddChallengeModal } from "./addChallengeModal";

export const AddChallengePanel: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="bg-white w-full h-96 rounded-xl text-center py-6">
      <h2 className="text-2xl text-cblue">Add Challenge</h2>
      <button onClick={() => setShowModal(!showModal)}>Create</button>
      {showModal && (
        <Portal>
          <div className="absolute h-screen w-screen flex items-center justify-center ">
            <AddChallengeModal />
            <div
              className="bg-black opacity-20 w-screen h-screen absolute z-0"
              onClick={() => setShowModal(false)}
            />
          </div>
        </Portal>
      )}
    </div>
  );
};
