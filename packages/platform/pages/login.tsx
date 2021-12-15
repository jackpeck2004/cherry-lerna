import jwt from "jsonwebtoken";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CTAButton, TextInput } from "src/components";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [participantID, setParticipantID] = useState<string>("");
  const [error, setError] = useState<string>(" ");

  useEffect(
    () => {
      // (effect)
      fetch("/api/auth")
        .then((res) => res.json())
        .then(({ auth }) => {
          if (auth) {
            const user = jwt.verify(auth, process.env.PRIVATE_KEY);
            if (user) {
              router.push("dashboard");
            }
          }
        });
      return () => {
        // cleanup
      };
    },
    [
      /*input*/
    ]
  );

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    (async () => {
      const rawResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, participantID }),
      });

      // const res = await rawResponse.text();

      if (rawResponse.status === 200) {
        router.push("dashboard");
      } else {
        setError("cannot log in, probably incorrect username or password?");
      }
    })();
  };

  return (
    <div className="bg-cgrey w-screen h-screen flex justify-center items-center">
      <div className="absolute top-1/4 transform -translate-y-3/4">
        <Image src="/logo.svg" height={200} width={200} />
      </div>

      <form className="bg-white w-3/6 h-96 flex flex-col rounded-3xl shadow-xl justify-evenly items-center">
        <h1 className="text-2xl">Login</h1>
        <div>
          <p className="text-red-500">{error}</p>
        </div>
        <TextInput
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-96"
        />
        <TextInput
          placeholder="participant ID"
          value={participantID}
          onChange={(e) => setParticipantID(e.target.value)}
          className="w-96"
        />
        <CTAButton text="login" onClick={(e) => handleSubmit(e)} />
      </form>
    </div>
  );
};

export default Login;
