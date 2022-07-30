"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controllers/admin/admin");
const router = express_1.default.Router();
// admin routes
router.post("/create_admin", admin_1.createAdmin);
router.post("/admin_signin", admin_1.signInAdmin);
router.get("/admin/:id", admin_1.oneAdmin);
exports.default = router;
