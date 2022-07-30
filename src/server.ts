import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import { sequelize, db } from './models';
import api from './services/v1Api';
import { requestErrorTypings } from './typings/requestErrorTypings';
import multer from 'multer';

dotenv.config()

const app = express()

app.use(cors());

// multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/images", upload.single("file"), (req, res) => {
    res.status(200).json(req.file);
})
app.use("/images", express.static(path.join(__dirname, "images")))



// set headers for all requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set("Methods", "GET, POST, PUT, DELETE");
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("content-type", "application/json");

    next();
});


// version 1 api
app.use('/api/', api)



// error handling
app.use((error: requestErrorTypings, req: Request, res: Response, next: NextFunction) => {
    // let data = {}
    // if (error.name === "SequelizeUniqueConstraintError") {
    //     data = {
    //         message: error.errors[0].message,
    //     }
    // }
    console.log(error.message);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message });
});



// server start and listen
app.listen(process.env.SERVER_PORT, () => {
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err: { message: string; }) => {
            console.error('Unable to connect to the database:', err.message);
        })
    console.log("Server is running on port 8080");
})