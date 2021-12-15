import { FC } from "react";

interface IProps {
  text: string;
  onClick?: (e?) => void;
}

export const CTAButton: FC<IProps> = (props) => {
  return (
    <>
      {props.onClick ? (
        <button
          className="bg-cred text-white font-bold w-48 h-16 rounded-full transition hover:bg-red-600"
          onClick={(e) => props.onClick(e)}
        >
          {props.text}
        </button>
      ) : (
        <div className="bg-cred text-white font-bold w-48 h-16 rounded-full transition hover:bg-red-600 flex justify-center items-center">
          {props.text}
        </div>
      )}
    </>
  );
};
