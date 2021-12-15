import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { CTAButton, TextInput } from "src/components";

interface IProps {
  authToken: string;
}

export const AddParticipantForm = ({ authToken }) => {
  const [email, setEmail] = useState<string>("");
  const [pid, setPid] = useState<string>("");
  const [admin, setAdmin] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    //   effect
    return () => {
      setError("");
    };
  }, []);

  const handleSubmit = () => {
    if (!email || !pid) {
      setError("email or pid cannot be empty");
      return;
    }
    fetch("/api/participants/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({
        email,
        participantID: pid,
        files: [],
        isAdmin: admin,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setEmail("");
          setPid("");
          alert("created participant");
        } else {
          setError("could not create the participant");
        }

        return res.json();
      })
      .then((res) => console.log(res));
  };

  return (
    <form
      className="w-full bg-white px-6 py-6 flex flex-col h-96 justify-between items-center rounded-xl"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2 className="text-2xl text-cblue">Add Participant</h2>
      {error && <span>{error}</span>}
      <TextInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        className="w-full"
      />
      <TextInput
        value={pid}
        onChange={(e) => setPid(e.target.value)}
        placeholder="participant ID"
        className="w-full"
      />
      <button onClick={() => setPid(nanoid())} className="">
        generate ID
      </button>
      <p onClick={() => setAdmin(!admin)} className="cursor-pointer">
        <input
          type="checkbox"
          checked={admin}
          onChange={(e) => setAdmin(e.target.checked)}
          className="mr-2"
        />
        Administrator
      </p>
      <CTAButton text="create participant" onClick={() => handleSubmit()} />
      {/* <CTA */}
    </form>
  );
};
