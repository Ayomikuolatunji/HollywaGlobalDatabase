import multer from 'multer';
import express from 'express';;

const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileTypes = ["image/png", "image/jpg", "image/jpeg"]

const fileFilter = (req: any, file: { mimetype: string; }, cb: (arg0: null, arg1: boolean) => void) => {
  if (
    fileTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter });


router.post("/images", upload.single("file"), (req, res) => {
  // serve file to controller and return image url
  res.status(200).json({ imageUrl: req.file?.path })
})


export default router;