"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const industries_1 = require("./controllers/industries/industries");
const router = express_1.default.Router();
router.get("/", (req, res, next) => {
    res.json({ more: "hey" });
});
// industries routes
router.post("/industries", industries_1.createIndustries);
exports.default = router;
