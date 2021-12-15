import { connect, ConnectionOptions } from "mongoose";

// const { mongoURI } = getConfig();
// const mongoURI = process.env.MONGO_URI;

const options: ConnectionOptions = {
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
};

export const connectToDatabase = () => {
  connect(process.env.MONGO_URI, options);
};
