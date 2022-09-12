"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
;
const router = express_1.default.Router();
// multer config
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date() + "-" + file.originalname);
    },
});
const fileTypes = ["image/png", "image/jpg", "image/jpeg"];
const fileFilter = (req, file, cb) => {
    if (fileTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = (0, multer_1.default)({ storage: storage, fileFilter });
router.post("/images", upload.single("file"), (req, res, next) => {
    var _a;
    try {
        // serve file to controller and return image url
        res.status(200).json({ imageUrl: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
