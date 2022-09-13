"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("./models");
const v1Api_1 = __importDefault(require("./services/v1Api"));
const uploadFile_1 = __importDefault(require("./uploads/uploadFile"));
const path_1 = __importDefault(require("path"));
const _404_1 = require("./middleware/404");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(uploadFile_1.default);
app.use("/images", express_1.default.static("images"));
app.use(express_1.default.static('public'));
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
app.use((error, req, res, next) => {
    // check if it is sequelize error
    if (error.name === "SequelizeValidationError") {
        console.log(error.errors[0].message);
        const status = error.statusCode || 500;
        const message = error.errors[0].message;
        res.status(status).json({ message });
    }
    else {
        console.log(error.message);
        const status = error.statusCode || 500;
        const message = error.message;
        res.status(status).json({ message });
    }
});
// version 1 api
app.use("/api/", v1Api_1.default);
app.use(_404_1.pageNotFound);
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '/public'));
});
// server start and listen
app.listen(process.env.PORT || 8080, () => {
    models_1.sequelize
        .authenticate()
        .then(() => {
        console.log("Connection has been established successfully.");
    })
        .catch((err) => {
        console.error("Unable to connect to the database:", err.message);
    });
    console.log("Server is running on port 8080");
});
