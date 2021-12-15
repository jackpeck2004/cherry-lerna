import mongoose, { Document, model, Model, Schema } from "mongoose";
import { DatasetSchema, IDataset } from "./Dataset";

export interface IChallenge extends Document {
  id: string;
  title: string;
  content: string;
  baseDataset: IDataset;
  participants: [string];
}

const ChallengeSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  content: {
    type: String,
    required: true,
    unique: false,
  },
  baseDataset: {
    type: DatasetSchema,
  },
  participants: {
    type: Array,
    required: true,
    default: [],
  },
});

export const Challenge: Model<IChallenge> =
  mongoose.models.Challenge || model("Challenge", ChallengeSchema);
