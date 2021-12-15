import { useRouter } from "next/router";
import { useEffect } from "react";
import { CTAButton } from "src/components";
import jwt from "jsonwebtoken";

export default function Home() {
  const router = useRouter();

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

  return (
    <div className="bg-cgrey w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl text-cblue text-center mb-8">
        Welcome to the <br />
        <b>Cherry Challenge</b>
      </h1>
      <CTAButton onClick={() => router.push("login")} text="login" />
    </div>
  );
}
