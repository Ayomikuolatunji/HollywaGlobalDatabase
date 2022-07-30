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
const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toDateString() + '-' + file.originalname)
    }
})

const filefilter = (req: Request, file: { mimetype: string; }, cb: (arg0: null, arg1: boolean) => void) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")))


app.use(multer({ storage: fileStorage, fileFilter: filefilter }).single('image'))

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
    let data = {}
    if (error.name === "SequelizeUniqueConstraintError") {
        data = {
            message: error.errors[0].message,
        }
    }
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message, data });
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