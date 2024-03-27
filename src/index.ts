  import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import router from "./router";
import mongoose from "mongoose";

import dotenv from 'dotenv';
import users from "router/users";
dotenv.config();

const app = express();

app.use(  
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

const server = http.createServer(app);

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const MONGO_URI = process.env.MONGO_URI!;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection.on("error", (error) => {
  console.log("MongoDB connection error: " + error);
  process.exit(-1);
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

app.use("/", router());