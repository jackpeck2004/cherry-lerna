import mongoose, { Document, model, Model, Schema } from "mongoose";

export interface IDataset extends Document {
    url: string;
    data: object[]
}

export const DatasetSchema = new Schema({
    url: {
        type: String,
    },
    data: {
        type: Array
    }
});

