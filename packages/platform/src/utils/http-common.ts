import axios from "axios";

export const {
  // Attempts to connect to MongoDB and then tries to connect locally
  PUBLISHER_URI = "http://localhost:4001",
} = process.env;

export const http = axios.create({
  baseURL: PUBLISHER_URI,
  headers: {
    "Content-type": "application/json",
  },
});
