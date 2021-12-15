import { ChangeEvent, FC } from "react";

interface IProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
}
export const TextInput: FC<IProps> = (props) => {
  return (
    <input
      type="text"
      value={props.value}
      className={
        "bg-transparent transition text-center border-b-2 border-cgrey hover:border-cblue text-cblue focus:border-cblue focus:outline-none " +
        props.className
      }
      onChange={(e) => props.onChange(e)}
      placeholder={props.placeholder}
    />
  );
};
