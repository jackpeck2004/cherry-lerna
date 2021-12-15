import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IScore extends Document {
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

export const ScoreSchema = new Schema<IScore>({
  hash: { type: String, required: true, unique: true },
  score: { type: Number, required: true, default: 0 },
  packets: { type: Number, required: true, default: 0 },
});

// const ScoreModel = model<IScore>("Score", Score);

// export default ScoreModel;
export const Score: Model<IScore> =
  mongoose.models.Score || model("Score", ScoreSchema);
