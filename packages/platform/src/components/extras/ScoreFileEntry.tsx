import { FC, useState, useEffect } from "react";

interface IProps {
  score: number;
  packets: number;
  id: string;
}

export const ScoreFileEntry: FC<IProps> = (props) => {
  const [score, setScore] = useState<number>(props.score);
  const [packets, setPackets] = useState<number>(props.packets);

  // useEffect(() => {
  //   setInterval(() => {
  //     //   ids.forEach((id) => {
  //     fetch(`/api/scores/${props.id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setScore(data.score);
  //         setPackets(data.packets);
  //       });
  //     //   });
  //   }, 5000);
  // });

  return (
    <div className="grid grid-cols-6 items-center gap-2 bg-white my-2 w-full mx-4 h-12 rounded-xl px-4 shadow-md hover:shadow-lg transition">
      <span className="col-span-3">{props.id}</span>
      <span className="text-center">{Math.floor(score)}</span>
      <span className="text-center">{packets}</span>
      <span className="text-center">{Math.floor(score / packets)}</span>
    </div>
  );
};
