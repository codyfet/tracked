import express, {Router} from "express";
import multer, {FileFilterCallback} from "multer";
import path from "path";
import fs from "fs";

const router: Router = express.Router();

const storage = multer.diskStorage({
    destination(
        req: Express.Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ) {
        if (process.env.NODE_ENV === "development") {
            const devUploadPath = path.resolve(__dirname, "..", "..", "..", "client/dist/uploads");
            fs.mkdirSync(devUploadPath, {recursive: true});
            cb(null, devUploadPath);
        } else {
            const prodUploadPath = "dist/server/uploads/";
            fs.mkdirSync(prodUploadPath, {recursive: true});
            cb(null, prodUploadPath);
        }
    },
    filename(req, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb({
            name: "FileFilterError",
            message: "Only files!",
        });
    }
}

const upload = multer({
    storage,
    fileFilter: function (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) {
        checkFileType(file, cb);
    },
});

router.post("/", upload.single("image"), (req, res) => {
    res.send(`${req.file.filename}`);
});

// export default router;

module.exports = router;
