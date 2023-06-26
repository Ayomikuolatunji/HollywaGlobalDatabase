"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authToken_1 = __importDefault(require("../middleware/authToken"));
const user_controller_1 = require("../ModelsControllers/users/user.controller");
const userAddress_controller_1 = require("../ModelsControllers/users/userAddress.controller");
const router = express_1.default.Router();
// users routes
router.get("/all_users", authToken_1.default, user_controller_1.getUsers);
router.post("/create_account", user_controller_1.createUser);
router.post("/login", user_controller_1.loginUser);
router.get("/single_user/", authToken_1.default, user_controller_1.getUser);
router.patch("/update_user_name/:userId", user_controller_1.updateUserName);
router.patch("/update_user_email/:userId", user_controller_1.updateUserEmail);
// user address routes
router.post("/create_user_address", userAddress_controller_1.createAddress);
router.get("/get_user_address/:userId", userAddress_controller_1.getuserAddress);
router.patch("/update_user_address/:userId", userAddress_controller_1.updateUserAddress);
exports.default = router;
