"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        // cb(null, uploadsPath);
        // const uploadPath = "dist/server/uploads/";
        // fs.mkdirSync(uploadPath, {recursive: true});
        // cb(null, uploadPath);
        if (process.env.NODE_ENV === "development") {
            const devUploadPath = path_1.default.resolve(__dirname, "..", "..", "..", "client/dist/uploads");
            fs_1.default.mkdirSync(devUploadPath, { recursive: true });
            cb(null, devUploadPath);
        }
        else {
            const prodUploadPath = "dist/server/uploads/";
            fs_1.default.mkdirSync(prodUploadPath, { recursive: true });
            cb(null, prodUploadPath);
        }
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLocaleLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        cb({
            name: "FileFilterError",
            message: "Only files!",
        });
    }
}
const upload = (0, multer_1.default)({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});
router.post("/", upload.single("image"), (req, res) => {
    res.send(`${req.file.filename}`);
});
// export default router;
module.exports = router;
