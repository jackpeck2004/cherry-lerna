import { FC } from "react";

interface IProps {
  text: string;
  onClick?: (e?) => void;
}

export const SecondaryButton: FC<IProps> = (props) => {
  return (
    <button
      className="border-2 border-cred text-cred bg-transparent font-bold w-48 h-16 rounded-full transition hover:border-red-600 hover:text-red-600 hover:bg-gray-100"
      onClick={(e) => props.onClick(e)}
    >
      {props.text}
    </button>
  );
};
