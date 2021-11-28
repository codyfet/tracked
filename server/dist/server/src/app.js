"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const colors_1 = __importDefault(require("colors"));
const morgan_1 = __importDefault(require("morgan"));
const path = __importStar(require("path"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// app.use(express.json({extended: true, limit: "50mb"}));
app.use(express_1.default.json({ limit: "50mb" }));
app.use("/api/record", require("./routes/record.routes"));
app.use("/api/stat", require("./routes/stat.routes"));
app.use("/api/user", require("./routes/user.routes"));
if (process.env.NODE_ENV === "production") {
    const staticPath = path.resolve(__dirname, "..", "..", "client", "dist");
    app.use(express_1.default.static(staticPath));
    app.get("*", (req, res) => res.sendFile(staticPath + "/index.html"));
}
else {
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(colors_1.default.yellow.bold(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`)));
