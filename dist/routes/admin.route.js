"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authToken_1 = __importDefault(require("../middleware/authToken"));
const admin_controller_1 = require("../ModelsControllers/admin/admin.controller");
const router = express_1.default.Router();
// admin routes
router.post("/create_admin", admin_controller_1.createAdmin);
router.post("/admin_signin", admin_controller_1.signInAdmin);
router.get("/admin/:adminId", authToken_1.default, admin_controller_1.getAdmin);
exports.default = router;
