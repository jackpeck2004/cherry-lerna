import { model, Schema } from "mongoose";

interface Score {
  hash: string;
  score: number;
  packets: number;
}

// const schema = new Schema<Score>({
//     hash: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     score: {
//         type: number,
//         required: true,
//         default: 0
//     })

const schema = new Schema<Score>({
  hash: { type: String, required: true, unique: true },
  score: { type: Number, required: true, default: 0 },
  packets: { type: Number, required: true, default: 0 },
});

const ScoreModel = model<Score>("Score", schema);

export default ScoreModel;
