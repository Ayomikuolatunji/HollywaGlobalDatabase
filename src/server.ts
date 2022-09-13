import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { sequelize } from "./models";
import api from "./services/v1Api";
import uploadFile from "./uploads/uploadFile";
import { requestErrorTypings } from "./typings/requestErrorTypings";
import path from "path"
import { pageNotFound } from "./middleware/404";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(uploadFile);
app.use("/images", express.static("images"));
app.use(express.static('public'))

// set headers for all requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Methods", "GET, POST, PUT, DELETE , PATCH");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("content-type", "application/json");

  next();
});



// error handling
app.use(
  (
    error: requestErrorTypings,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // check if it is sequelize error
    if (error.name === "SequelizeValidationError") {
      console.log(error.errors[0].message);
      const status = error.statusCode || 500;
      const message = error.errors[0].message;
      res.status(status).json({ message });
    } else {
      console.log(error.message);
      const status = error.statusCode || 500;
      const message = error.message;
      res.status(status).json({ message });
    }
  }
);

// version 1 api
app.use("/api/", api);
app.use(pageNotFound)

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'/public'))
})


// server start and listen
app.listen(process.env.SERVER_PORT || 8080, () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err: { message: string }) => {
      console.error("Unable to connect to the database:", err.message);
    });
  console.log("Server is running on port 8080");
});
