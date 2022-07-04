"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/users/user");
const userAddress_1 = require("../controllers/users/userAddress");
const userPayment_1 = require("../controllers/users/userPayment");
const router = express_1.default.Router();
;
// users routes
router.get("/all_users", user_1.getUsers);
router.post("/create_account", user_1.createUser);
router.get("/single_user/:userId", user_1.getUser);
router.patch("/update_user_name/:userId", user_1.updateUserName);
router.patch("/update_user_email/:userId", user_1.updateUserEmail);
// user address routes
router.post("/create_user_address", userAddress_1.createAdress);
router.get("/get_user_address/:userId", userAddress_1.getUserAdress);
router.patch("/update_user_address/:userId", userAddress_1.updateUserAddress);
// user payement routes
router.post("/create_user_payment", userPayment_1.createUserPayment);
router.patch("/update_user_payment/:userId", userPayment_1.updateUserPayment);
exports.default = router;
