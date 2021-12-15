import mongoose, { Document, model, Model, Schema } from "mongoose";
import { nanoid } from "nanoid";

export type IFile = {
  challengeID: string;
  hash: string;
};

export interface IParticipant extends Document {
  email: string;
  participantID: string;
  name?: string;
  files: IFile[];
  isAdmin: boolean;
}

const ParticipantSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  participantID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: false,
  },
  files: {
    type: Array,
    required: true,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export const Participant: Model<IParticipant> =
  mongoose.models.Participant || model("Participant", ParticipantSchema);
