import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize, db } from './models';
import api from './services/v1Api';
import { ControllerErrors } from './middleware/ControllerErrors';





const app = express()

app.use(cors());


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));



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



app.use('/api/', api)




app.use((error: ControllerErrors, req: Request, res: Response, next: NextFunction) => {
    let data = {}
    if (error.name === "SequelizeUniqueConstraintError") {
        data = {
            message: error.errors[0].message,
        }
    }
    console.log(error.message);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message, data });
});

// datbase table associations



app.listen(8080, () => {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    })
        .catch((err: { message: string; }) => {
            console.error('Unable to connect to the database:', err.message);
        })
    console.log("Server is running on port 8080");
})