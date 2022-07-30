"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
const v1Api_1 = __importDefault(require("./services/v1Api"));
const multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// multer config
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.post("/images", upload.single("file"), (req, res) => {
    res.status(200).json(req.file);
});
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "images")));
// set headers for all requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.set("Methods", "GET, POST, PUT, DELETE");
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("content-type", "application/json");
    next();
});
// version 1 api
app.use('/api/', v1Api_1.default);
// error handling
app.use((error, req, res, next) => {
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
    models_1.sequelize.authenticate()
        .then(() => {
        console.log('Connection has been established successfully.');
    })
        .catch((err) => {
        console.error('Unable to connect to the database:', err.message);
    });
    console.log("Server is running on port 8080");
});
