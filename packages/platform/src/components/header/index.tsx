import { FC } from "react";
import Image from "next/image";
import { SecondaryButton } from "src/components";
import { useRouter } from "next/router";

interface IProps {
  participantID: string;
  email: string;
  isAdmin: boolean;
}

export const Header: FC<IProps> = ({ participantID, email, isAdmin }) => {
  const router = useRouter();

  const handleLogout = () => {
    fetch("/api/auth/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        router.push("login");
      }
    });
  };

  return (
    <div className="bg-white py-4 px-16 flex">
      <div className="w-1/2 flex">
        <Image
          className="hidden lg:block"
          src="/logo.svg"
          height={60}
          width={60}
        />
        <ul className="flex flex-col justify-center">
          <li className="hidden lg:block">
            <span className="text-gray-500">email: </span>
            {email}
          </li>
          <li>
            <span className="text-gray-500">participant ID: </span>
            {participantID}
          </li>
        </ul>
      </div>
      <div className="w-1/2 lg:flex justify-end hidden">
        {isAdmin && (
          <SecondaryButton
            text="admin"
            onClick={() => {
              window.open("admin", "_blank");
            }}
          />
        )}
        <SecondaryButton text="logout" onClick={() => handleLogout()} />
      </div>
      <div className="w-1/2 flex justify-end lg:hidden">
        {isAdmin && (
          <SecondaryButton
            text="admin"
            onClick={() => {
              window.open("admin", "_blank");
            }}
          />
        )}
        <SecondaryButton text=">" onClick={() => handleLogout()} />
      </div>
    </div>
  );
};
